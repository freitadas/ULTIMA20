/* ÚLTIMA TRANSMISSÃO 4.0 — API Cloudflare Workers + D1 + Durable Objects */
import { DurableObject } from 'cloudflare:workers';
const json=(data,status=200,headers={})=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
const headers={'Content-Type':'application/json'};
const encode=x=>new TextEncoder().encode(x);
const hex=bytes=>Array.from(new Uint8Array(bytes)).map(b=>b.toString(16).padStart(2,'0')).join('');
const salt=()=>hex(crypto.getRandomValues(new Uint8Array(16)));
const token=()=>hex(crypto.getRandomValues(new Uint8Array(32)));
const sha=async str=>hex(await crypto.subtle.digest('SHA-256',encode(str)));
async function hashPassword(p,s){let key=await crypto.subtle.importKey('raw',encode(p),'PBKDF2',false,['deriveBits']);return hex(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:encode(s),iterations:210000},key,256))}
function safeEqual(a,b){if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;let z=0;for(let i=0;i<a.length;i++)z|=a.charCodeAt(i)^b.charCodeAt(i);return z===0}
function getCookie(req,name){const str=req.headers.get('cookie')||'';let m=str.match(new RegExp('(?:^|;\\s*)'+name+'=([^;]*)'));return m?decodeURIComponent(m[1]):null}
function cookie(t,maxAge=2592000,secure=true){return `ut_session=${t}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure?'; Secure':''}`}
const validName=x=>typeof x==='string'&&/^[a-zA-Z0-9_]{3,20}$/.test(x);
const uid=()=>crypto.randomUUID();
async function auth(req,env){if(!env.DB)return null;const raw=getCookie(req,'ut_session');if(!raw||!/^[a-f0-9]{64}$/.test(raw))return null;const digest=await sha(raw);return env.DB.prepare('SELECT users.id, users.username FROM sessions JOIN users ON users.id=sessions.user_id WHERE sessions.token_hash=? AND sessions.expires_at>?').bind(digest,Date.now()).first()}
async function readBody(req,limit=65536){if(Number(req.headers.get('content-length')||0)>limit)throw Error('Payload grande demais');const body=await req.text();if(body.length>limit)throw Error('Payload grande demais');try{return JSON.parse(body)}catch{throw Error('JSON inválido')}}
async function rateLimit(env,req){const ip=(req.headers.get('cf-connecting-ip')||'unknown').slice(0,60);const key=await sha('auth:'+ip);const now=Date.now(),prev=await env.DB.prepare('SELECT started,count FROM auth_attempts WHERE id=?').bind(key).first();if(prev&&now-prev.started<3600000&&prev.count>=15) return false;if(!prev||now-prev.started>=3600000)await env.DB.prepare('INSERT INTO auth_attempts(id,started,count) VALUES (?,?,1) ON CONFLICT(id) DO UPDATE SET started=excluded.started,count=1').bind(key,now).run();else await env.DB.prepare('UPDATE auth_attempts SET count=count+1 WHERE id=?').bind(key).run();return true}
async function handleApi(req,env,url){const path=url.pathname.slice(5),method=req.method;if(path==='health')return json({ok:true,database:!!env.DB,rooms:!!env.ROOMS});if(!env.DB)return json({error:'Banco D1 não configurado. A campanha solo continua disponível.'},503);
 if(path==='me'&&method==='GET')return json({user:await auth(req,env)});
 if(path==='register'&&method==='POST'||path==='login'&&method==='POST'){
  if(!await rateLimit(env,req))return json({error:'Muitas tentativas. Volte mais tarde.'},429);const {username,password}=await readBody(req,2048);if(!validName(username)||typeof password!=='string'||password.length<10||password.length>128)return json({error:'Use usuário de 3 a 20 letras/números/underscore e senha de 10 a 128 caracteres.'},400);
  let person;
  if(path==='register'){const ss=salt(),hashed=await hashPassword(password,ss),id=uid();try{await env.DB.prepare('INSERT INTO users(id,username,password_hash,password_salt,created_at) VALUES(?,?,?,?,?)').bind(id,username,hashed,ss,Date.now()).run()}catch{return json({error:'Nome indisponível ou falha ao cadastrar.'},409)}person={id,username};}
  else{const found=await env.DB.prepare('SELECT id, username, password_hash, password_salt FROM users WHERE username=? COLLATE NOCASE').bind(username).first();if(!found)return json({error:'Usuário ou senha inválidos.'},401);const computed=await hashPassword(password,found.password_salt);if(!safeEqual(computed,found.password_hash))return json({error:'Usuário ou senha inválidos.'},401);person={id:found.id,username:found.username}}
  const secret=token();await env.DB.prepare('INSERT INTO sessions(token_hash,user_id,expires_at,created_at) VALUES(?,?,?,?)').bind(await sha(secret),person.id,Date.now()+2592000000,Date.now()).run();return json({user:person},200,{'Set-Cookie':cookie(secret,2592000,url.protocol==='https:')});
 }
 if(path==='logout'&&method==='POST'){const t=getCookie(req,'ut_session');if(t)await env.DB.prepare('DELETE FROM sessions WHERE token_hash=?').bind(await sha(t)).run();return json({ok:true},200,{'Set-Cookie':cookie('',0,url.protocol==='https:')});}
 const user=await auth(req,env);if(!user)return json({error:'Faça login para acessar o salvamento.'},401);
 if(path==='save'&&method==='GET'){const result=await env.DB.prepare('SELECT data,updated_at FROM saves WHERE user_id=?').bind(user.id).first();let save=null;try{if(result)save=JSON.parse(result.data)}catch{}return json({save,updatedAt:result?.updated_at||null})}
 if(path==='save'&&method==='POST'){
  const body=await readBody(req,55000),s=body.data;
  if(!s||![4,5].includes(s.version)||!Number.isInteger(s.quest)||s.quest<0||s.quest>30||!Array.isArray(s.decisions)||s.decisions.length>30||!Number.isFinite(s.x)||!Number.isFinite(s.y)||s.x<0||s.x>3480||s.y<0||s.y>2450)return json({error:'Salvamento inválido.'},400);
  const saved=JSON.stringify(s);if(saved.length>49000)return json({error:'Salvamento ultrapassa o limite.'},413);
  await env.DB.prepare('INSERT INTO saves(user_id,data,updated_at) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET data=excluded.data,updated_at=excluded.updated_at').bind(user.id,saved,Date.now()).run();return json({ok:true});
 }
 return json({error:'Rota inexistente.'},404);
}
const ROOM_CODE=/^[A-HJ-NP-Z2-9]{6}$/;
const allowed=[
 ['hospital_help','hospital_supply','hospital_route'],
 ['nina_rescue','nina_sneak','nina_leave'],
 ['raul_trade','raul_force','raul_help'],
 ['shelter_share','shelter_guard','shelter_ignore'],
 ['signal_stable','signal_loud','signal_skip'],
 ['checkpoint_search','checkpoint_help','checkpoint_raid'],
 ['school_save','school_map','school_burn'],
 ['tower_people','tower_truth','tower_self'],
 ['lab_cure','lab_evidence','lab_destroy'],
 ['end_together','end_truth','end_alone'],
 ["bridge_open", "bridge_order", "bridge_detour"],
 ["press_protect", "press_publish", "press_keep"],
 ["water_community", "water_quick", "water_evidence"],
 ["station_decode", "station_rescue", "station_scavenge"],
 ["bento_read", "bento_hide", "bento_trade"],
 ["beds_care", "beds_investigate", "beds_lock"],
 ["raul_defend", "raul_exile", "raul_neutral"],
 ["windows_search", "windows_evac", "windows_ignore"],
 ["archive_release", "archive_protect", "archive_delete"],
 ["cure_consent", "cure_force", "cure_store"],
 ["vitor_arrest", "vitor_deal", "vitor_evidence"],
 ["brother_publish", "brother_locate", "brother_guard"],
 ["power_both", "power_shelter", "power_radio"],
 ["siege_evac", "siege_stand", "siege_escape"],
 ["council_open", "council_lead", "council_ignore"],
 ["door_rescue", "door_wait", "door_leave"],
 ["city_solidarity", "city_screen", "city_flee"],
 ["signal_full", "signal_safe", "signal_burn"],
 ["path_tunnel", "path_bridge", "path_stay"],
 ["final_evac", "final_truth", "final_rebuild"]
];
export class GameRoom extends DurableObject {
 constructor(ctx,env){super(ctx,env);this.ctx=ctx;this.env=env;this.positions=new Map()}
 clients(){return this.ctx.getWebSockets()}
 people(){return this.clients().map(w=>w.deserializeAttachment()).filter(Boolean)}
 emit(obj){const data=JSON.stringify(obj);for(const sock of this.clients())try{sock.send(data)}catch{}}
 positionsSnapshot(){const out={};for(const u of this.people()){const p=this.positions.get(u.id);if(p)out[u.id]={x:p.x,y:p.y,name:u.name}}return out}
 presence(){this.emit({type:'presence',members:this.people().map(x=>x.name),positions:this.positionsSnapshot()})}
 async fetch(request){if(request.headers.get('Upgrade')?.toLowerCase()!=='websocket')return new Response('WebSocket obrigatório',{status:426});if(this.clients().length>=4)return new Response('Sala cheia: máximo quatro jogadores.',{status:429});const name=(request.headers.get('x-player-name')||'Sobrevivente').slice(0,20);const wsPair=new WebSocketPair();const [client,server]=Object.values(wsPair);this.ctx.acceptWebSocket(server);const id=crypto.randomUUID();server.serializeAttachment({id,name});const history=await this.ctx.storage.get('history')||[];server.send(JSON.stringify({type:'snapshot',you:id,members:this.people().map(x=>x.name),positions:this.positionsSnapshot(),history}));this.presence();return new Response(null,{status:101,webSocket:client})}
 async webSocketMessage(sock,raw){if(typeof raw!=='string'||raw.length>900)return;let data;try{data=JSON.parse(raw)}catch{return}const me=sock.deserializeAttachment();if(!me)return;
 if(data.type==='position'){const x=Number(data.x),y=Number(data.y);if(!Number.isFinite(x)||!Number.isFinite(y)||x<0||x>3480||y<0||y>2450)return;this.positions.set(me.id,{x:Math.round(x),y:Math.round(y)});this.emit({type:'positions',positions:this.positionsSnapshot()});return}
 if(data.type==='vote'){
  const history=await this.ctx.storage.get('history')||[],q=history.length;
  if(q>=allowed.length||data.q!==q||!allowed[q].includes(data.option)){sock.send(JSON.stringify({type:'error',error:'Escolha não corresponde à missão compartilhada.'}));return}
  const currentVotes=await this.ctx.storage.get('votes')||{};currentVotes[me.id]=data.option;await this.ctx.storage.put('votes',currentVotes);const people=this.people();const total=people.length,votes=people.filter(p=>Object.hasOwn(currentVotes,p.id));this.emit({type:'votes',count:votes.length,players:total});if(votes.length===total&&total>0){const tally=new Map();for(const p of people){const choice=currentVotes[p.id];tally.set(choice,(tally.get(choice)||0)+1)}const choice=[...tally].sort((a,b)=>b[1]-a[1]||allowed[q].indexOf(a[0])-allowed[q].indexOf(b[0]))[0][0];history.push({q,option:choice});await this.ctx.storage.put('history',history);await this.ctx.storage.put('votes',{});this.emit({type:'resolved',q,option:choice,history});}
 }
 }
 async webSocketClose(sock){const me=sock.deserializeAttachment();if(me){const votes=await this.ctx.storage.get('votes')||{};delete votes[me.id];await this.ctx.storage.put('votes',votes);this.positions.delete(me.id)}this.presence()}
 async webSocketError(sock){const me=sock.deserializeAttachment();if(me){const votes=await this.ctx.storage.get('votes')||{};delete votes[me.id];await this.ctx.storage.put('votes',votes);this.positions.delete(me.id)}this.presence()}
}
export default {
 async fetch(request,env){const url=new URL(request.url);try{
   if(url.pathname.startsWith('/api/')){
     if(!['GET','POST'].includes(request.method))return json({error:'Método não permitido'},405);
     if(request.method==='POST'){const origin=request.headers.get('origin');if(origin!==url.origin)return json({error:'Origem não permitida'},403)}
     return await handleApi(request,env,url);
   }
   if(url.pathname.startsWith('/ws/')){
     if(!env.ROOMS)return new Response('Durable Objects não configurados.',{status:503});
     const code=url.pathname.slice(4);if(!ROOM_CODE.test(code))return new Response('Código inválido.',{status:400});
     if(request.headers.get('Upgrade')?.toLowerCase()!=='websocket')return new Response('WebSocket obrigatório.',{status:426});
     const origin=request.headers.get('origin');if(origin!==url.origin)return new Response('Origem recusada.',{status:403});
     const raw=(url.searchParams.get('name')||'Sobrevivente').trim();const clean=raw.replace(/[^a-zA-ZÀ-ÿ0-9 _-]/g,'').slice(0,20);if(clean.length<2)return new Response('Apelido inválido.',{status:400});
     const id=env.ROOMS.idFromName(code),stub=env.ROOMS.get(id);const req=new Request(request);req.headers.set('x-player-name',clean);return stub.fetch(req);
   }
   return env.ASSETS.fetch(request);
  }catch(err){console.error('Worker exception',err);return json({error:'Falha interna do servidor.'},500)}
 }
};
