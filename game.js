'use strict';

/* ÚLTIMA TRANSMISSÃO V1.0 — motor narrativo sem dependências externas. */
(() => {
  const SAVE_KEY = 'ultima-transmissao-v1-campanha';
  const ENDINGS_KEY = 'ultima-transmissao-v1-finais';
  const VERSION = 1;
  const missions = [
    ['01 · A RUPTURA', 'Deixe o apartamento, entenda o que aconteceu e encontre uma rota para fora do bairro.'],
    ['02 · AVENIDA DOS ECOS', 'Atravesse a avenida e decida o que vale a pena carregar — ou quem vale a pena salvar.'],
    ['03 · REMÉDIOS PARA O AMANHÃ', 'Explore a farmácia isolada e busque suprimentos para os sobreviventes.'],
    ['04 · O ABRIGO', 'Encontre a médica Sofia e decida quanto da sua reserva deve ser compartilhado.'],
    ['05 · A ÚLTIMA CENTELHA', 'Tente recuperar a energia da subestação para melhorar as chances da transmissão.'],
    ['06 · FREQUÊNCIA MORTA', 'Alcance a torre de comunicação e faça contato com alguém fora da cidade.'],
    ['07 · A ESCOLHA FINAL', 'Decida o destino das pessoas que ainda dependem de você.']
  ];
  const zones = ['moradia', 'avenida', 'farmacia', 'abrigo', 'subestacao', 'torre'];
  const names = {health:'saúde', infection:'infecção', noise:'ameaça', food:'alimentos', meds:'kit médico', parts:'ferramentas', ammo:'munição', trust:'confiança'};
  const scenes = {
    inicio: {
      act:0, zone:'moradia', location:'APARTAMENTO 208 / PORTO CINZA', region:'SETOR 01 · ZONA RESIDENCIAL', title:'A cidade parou de respirar',
      text:['03h40. O alarme de emergência toca há onze minutos. Da sua janela, você vê carros abandonados e fumaça subindo atrás do hospital. Pessoas correm. Algumas já não parecem pessoas.', 'Você é Clara, socorrista do serviço de urgência. Seu rádio portátil chia na mesa; uma mochila está aberta perto da porta. Há pouco tempo antes que os corredores sejam tomados.'],
      dialogue:['VOZ NO RÁDIO','“...quem conseguir ouvir... o abrigo municipal... precisamos da torre...”'],
      choices:[
        {label:'Vasculhar o armário médico', desc:'Leve o que pode salvar uma vida.', info:'+1 kit · +12 min', to:'armario', delta:{meds:1,noise:3}, minutes:12, log:'Recolheu material de primeiros socorros.'},
        {label:'Procurar a frequência da Defesa Civil', desc:'O ruído pode esconder uma pista.', info:'Frequência encontrada · +8 min', to:'radio', set:['frequency'], minutes:8, log:'Registrou a frequência de emergência 101.7 MHz.'},
        {label:'Sair imediatamente', desc:'Menos tempo perdido. Menos equipamentos.', info:'+4 min', to:'avenida', minutes:4, log:'Saiu do apartamento sem explorar os arredores.'}
      ]
    },
    armario:{act:0,zone:'moradia',location:'APARTAMENTO 208 / PORTO CINZA',region:'SETOR 01 · ZONA RESIDENCIAL',title:'O peso de um kit',text:['Dentro do armário há gaze, antisséptico e um frasco lacrado. Você empurra tudo para dentro da mochila.', 'Uma pancada faz a porta do apartamento tremer. Não há mais tempo para organizar nada.'],choices:[{label:'Sair pela escada de emergência',desc:'A rua é sua única saída.',info:'+8 min',to:'avenida',minutes:8,log:'Deixou o prédio pela escada de emergência.'}]},
    radio:{act:0,zone:'moradia',location:'APARTAMENTO 208 / PORTO CINZA',region:'SETOR 01 · ZONA RESIDENCIAL',title:'A voz entre os ruídos',text:['Depois de girar o seletor, você encontra uma sequência repetida em 101.7 MHz: “CORREDOR NORTE, ZERO-SETE”. O sinal se apaga.', 'Você anota a frequência no braço. Se chegar à torre, essa informação pode fazer a diferença.'],choices:[{label:'Sair com o rádio ligado',desc:'Guarde a frequência e avance.',info:'+7 min',to:'avenida',minutes:7,log:'Seguiu com o código de comunicação anotado.'}]},
    avenida:{act:1,zone:'avenida',location:'AVENIDA CENTRAL / QUARTEIRÃO 7',region:'SETOR 02 · AVENIDA DOS ECOS',title:'O choro atrás do ônibus',text:['Um ônibus bloqueia a pista. Na calçada, uma adolescente chama por sua mãe, enquanto dois infectados se aproximam. Do outro lado da avenida, a porta de um pequeno mercado ainda está aberta.', 'Seu destino é a farmácia municipal, mas cada desvio pode alterar o que acontecerá depois.'],dialogue:['ADOLESCENTE','“Por favor! Não me deixa aqui!”'],choices:[
      {label:'Salvar a adolescente',desc:'Arrisque sua segurança por Nina.',info:'+2 confiança · −10 saúde',to:'nina',delta:{trust:2,health:-10,noise:8},set:['nina'],minutes:14,log:'Resgatou Nina do ônibus.'},
      {label:'Entrar no mercado abandonado',desc:'Comida e ferramentas podem estar lá.',info:'+18 min',to:'mercado',minutes:18,log:'Entrou no mercado em busca de mantimentos.'},
      {label:'Usar a passagem entre os prédios',desc:'Um caminho rápido, porém perigoso.',info:'−7 saúde · +10 min',to:'atalho',delta:{health:-7,noise:6},minutes:10,log:'Ignorou o chamado e seguiu pela passagem estreita.'}
    ]},
    nina:{act:1,zone:'avenida',location:'AVENIDA CENTRAL / ÔNIBUS 302',region:'SETOR 02 · AVENIDA DOS ECOS',title:'Uma promessa difícil',text:['Você puxa a garota para trás de um carro no instante em que uma mão apodrecida atravessa a janela do ônibus. Nina está assustada, mas consegue caminhar.', 'Ela diz que a mãe foi levada ao abrigo municipal. Você não sabe se é verdade. Mesmo assim, ela passa a seguir seus passos.'],dialogue:['NINA','“Se você encontrar minha mãe... promete que vai dizer que eu tentei?”'],choices:[
      {label:'Fazer um curativo em Nina',desc:'Use seu kit de emergência para ajudá-la.',need:{meds:1},info:'−1 kit · +1 confiança',to:'farmacia',delta:{meds:-1,trust:1},minutes:12,log:'Cuidou dos ferimentos de Nina.'},
      {label:'Seguir com Nina até a farmácia',desc:'É melhor não permanecer na avenida.',info:'+9 min',to:'farmacia',minutes:9,log:'Seguiu com Nina para buscar remédios.'}
    ]},
    mercado:{act:1,zone:'avenida',location:'MERCADO BOM DIA / QUARTEIRÃO 7',region:'SETOR 02 · AVENIDA DOS ECOS',title:'Corredores vazios',text:['Prateleiras foram derrubadas no chão. Um rádio toca uma propaganda antiga. Você escuta passos vindos do estoque e percebe duas oportunidades de coleta.', 'Ficar ali por muito tempo será perigoso.'],choices:[
      {label:'Recolher alimentos',desc:'Priorize uma reserva para atravessar a cidade.',info:'+2 alimentos · +12 ameaça',to:'farmacia',delta:{food:2,noise:12},minutes:15,log:'Recolheu duas porções de alimento no mercado.'},
      {label:'Procurar caixa de ferramentas',desc:'Essencial para reparos mecânicos.',info:'+1 ferramentas · −5 saúde',to:'farmacia',delta:{parts:1,health:-5,noise:6},minutes:17,log:'Encontrou ferramentas, mas foi arranhada durante a fuga.'}
    ]},
    atalho:{act:1,zone:'avenida',location:'TRAVESSA DO VIADUTO / ACESSO LESTE',region:'SETOR 02 · AVENIDA DOS ECOS',title:'Por baixo da cidade',text:['O cheiro de combustível invade a passagem estreita. Um portão impede a saída, mas está enferrujado. Você força a estrutura e abre uma brecha suficiente para passar.', 'Uma caixa de manutenção caiu no chão. Há um conjunto de ferramentas ao lado dela.'],choices:[{label:'Recolher as ferramentas e avançar',desc:'Você poderá tentar reparar a energia.',info:'+1 ferramentas · +8 min',to:'farmacia',delta:{parts:1},minutes:8,log:'Encontrou ferramentas na travessa.'}]},
    farmacia:{act:2,zone:'farmacia',location:'FARMÁCIA MUNICIPAL / SETOR LESTE',region:'SETOR 03 · POSTO MÉDICO',title:'O estoque lacrado',text:['A porta de vidro da farmácia está rachada. Um grupo de saqueadores discute dentro da loja. Pelos fundos, um corredor escuro leva ao depósito de medicamentos.', 'O abrigo municipal fica a alguns quarteirões. Ali, pessoas feridas podem precisar mais desses remédios do que você.'],choices:[
      {label:'Entrar pela janela lateral',desc:'Rápido, mas os estilhaços podem ferir você.',info:'+2 kits · −9 saúde · +14 ameaça',to:'saida_farmacia',delta:{meds:2,health:-9,noise:14},minutes:16,log:'Entrou pela janela e encontrou dois kits médicos.'},
      {label:'Trocar comida com os saqueadores',desc:'Evite o confronto com uma negociação.',need:{food:1},info:'−1 alimento · +2 kits',to:'saida_farmacia',delta:{food:-1,meds:2,trust:1},minutes:24,log:'Trocou alimentos por kits médicos sem confronto.'},
      {label:'Procurar o depósito dos fundos',desc:'Mais lento e arriscado, mas discreto.',info:'+1 kit · +1 ferramenta · +10 infecção',to:'saida_farmacia',delta:{meds:1,parts:1,infection:10,noise:3},minutes:28,log:'Saiu do depósito com remédios e ferramentas, após contato com material contaminado.'},
      {label:'Não entrar e ir direto ao abrigo',desc:'Ganhe tempo, mas chegue com poucos recursos.',info:'+8 min',to:'abrigo',minutes:8,log:'Ignorou o estoque da farmácia.'}
    ]},
    saida_farmacia:{act:2,zone:'farmacia',location:'FARMÁCIA MUNICIPAL / SAÍDA',region:'SETOR 03 · POSTO MÉDICO',title:'O som dos passos',text:['Você fecha a mochila, verifica o corredor e encontra uma saída nos fundos. O rádio repete uma instrução curta: “Se alguém ainda estiver vivo, sigam para o ginásio”.', 'Agora a decisão não é mais sobre encontrar recursos. É sobre o que fazer com eles.'],choices:[{label:'Seguir para o ginásio municipal',desc:'Procure os outros sobreviventes.',info:'+16 min',to:'abrigo',minutes:16,log:'Chegou ao ginásio que serve de abrigo.'}]},
    abrigo:{act:3,zone:'abrigo',location:'GINÁSIO MUNICIPAL / ABRIGO 04',region:'SETOR 04 · ÁREA SEGURA',title:'O que significa sobreviver?',text:['Há dezoito sobreviventes dentro do ginásio, entre eles crianças e pessoas com ferimentos graves. Sofia, médica responsável pelo local, tenta manter a situação sob controle.', 'O abrigo está quase sem água e a energia falha. Uma unidade de rádio na torre norte é a última chance de pedir uma evacuação. Sofia observa sua mochila.'],dialogue:['DRA. SOFIA','“Se tiver remédios, precisamos deles. Mas não posso obrigar você a entregar nada.”'],choices:[
      {label:'Entregar um kit de medicamentos',desc:'Ajude os feridos e ganhe apoio.',need:{meds:1},info:'−1 kit · +2 confiança',to:'plano_abrigo',delta:{meds:-1,trust:2},set:['helped'],minutes:18,log:'Doou medicamentos aos sobreviventes.'},
      {label:'Compartilhar parte da comida',desc:'Divida seus mantimentos.',need:{food:1},info:'−1 alimento · +1 confiança',to:'plano_abrigo',delta:{food:-1,trust:1},set:['helped'],minutes:16,log:'Compartilhou comida com o abrigo.'},
      {label:'Guardar tudo para sua sobrevivência',desc:'Você não sabe quanto tempo vai durar.',info:'−1 confiança',to:'plano_abrigo',delta:{trust:-1},minutes:5,log:'Decidiu não compartilhar os recursos.'}
    ]},
    plano_abrigo:{act:3,zone:'abrigo',location:'GINÁSIO MUNICIPAL / SALA DE CONTROLE',region:'SETOR 04 · ÁREA SEGURA',title:'Sofia tem um plano',text:['Sofia mostra um mapa. A torre norte ainda pode transmitir para equipes fora de Porto Cinza, mas o sinal depende de uma subestação que está instável.', 'Antes de partir, você pode ajudar a organizar a saída do abrigo. Cada minuto é precioso.'],dialogue:['DRA. SOFIA','“Só preciso saber uma coisa: quando o rádio funcionar, você vai lembrar que estamos aqui?”'],choices:[
      {label:'Reforçar as barricadas do ginásio',desc:'Use ferramentas para dar mais tempo ao grupo.',need:{parts:1},info:'−1 ferramenta · +2 confiança',to:'subestacao',delta:{parts:-1,trust:2},set:['fortified'],minutes:23,log:'Reforçou a entrada do ginásio.'},
      {label:'Atender os feridos antes de partir',desc:'Use recursos e trabalhe junto a Sofia.',need:{meds:1},info:'−1 kit · +2 confiança',to:'subestacao',delta:{meds:-1,trust:2},set:['treated'],minutes:18,log:'Ajudou Sofia a atender os feridos.'},
      {label:'Prometer que buscará ajuda e partir',desc:'Não há tempo para outras tarefas.',info:'+9 min',to:'subestacao',minutes:9,log:'Partiu rumo à subestação sem reforçar o abrigo.'}
    ]},
    subestacao:{act:4,zone:'subestacao',location:'SUBESTAÇÃO NORTE / ACESSO TÉCNICO',region:'SETOR 05 · REDE ELÉTRICA',title:'Uma faísca para a cidade',text:['A subestação é iluminada apenas por luzes vermelhas de emergência. Um painel de manutenção está aberto e o disjuntor principal caiu.', 'Há uma maneira segura de restaurar a energia com ferramentas. Também existe um jeito improvisado, bem mais perigoso. Você pode seguir até a torre sem consertá-la, mas a transmissão ficará instável.'],choices:[
      {label:'Consertar o painel com ferramentas',desc:'Restaure o sinal elétrico com segurança.',need:{parts:1},info:'−1 ferramenta · energia restaurada',to:'energia',delta:{parts:-1,noise:7},set:['power'],minutes:25,log:'Restaurou a alimentação elétrica da torre.'},
      {label:'Forçar o disjuntor manualmente',desc:'Há risco de choque e ferimentos.',info:'−18 saúde · energia restaurada',to:'energia',delta:{health:-18,noise:15},set:['power'],minutes:18,log:'Forçou o disjuntor, sofreu um choque e restaurou a energia.'},
      {label:'Deixar a subestação desligada',desc:'Siga à torre com o sistema em modo de emergência.',info:'+10 min',to:'torre',minutes:10,log:'Deixou a subestação sem energia.'}
    ]},
    energia:{act:4,zone:'subestacao',location:'SUBESTAÇÃO NORTE / SALA DE PAINÉIS',region:'SETOR 05 · REDE ELÉTRICA',title:'As luzes voltam',text:['Por alguns segundos, o bairro inteiro parece respirar de novo. Na encosta, uma antena acende em verde. A torre norte voltou a ter energia.', 'O barulho do gerador atrai movimento além da cerca. Você precisa sair antes que a passagem seja bloqueada.'],choices:[{label:'Correr em direção à torre',desc:'O rádio está a poucos quarteirões.',info:'+14 min',to:'torre',minutes:14,log:'Partiu para a torre com energia restabelecida.'}]},
    torre:{act:5,zone:'torre',location:'TORRE NORTE / COMPLEXO DE TRANSMISSÃO',region:'SETOR 06 · ANTENA 101.7',title:'O último sinal da cidade',text:['Uma horda atravessa o estacionamento da torre. O prédio de transmissão está logo à frente, mas a porta principal foi arrombada.', 'Você tem três maneiras de alcançar a sala de rádio. Seu equipamento, o tempo e o barulho vão determinar o custo.'],choices:[
      {label:'Cruzar os corredores escuros',desc:'Mantenha o silêncio e aceite o risco.',info:'−11 saúde · +9 ameaça',to:'central',delta:{health:-11,noise:9},minutes:21,log:'Atravessou os corredores da torre em silêncio.'},
      {label:'Disparar para abrir passagem',desc:'Munição pode salvar tempo, mas também atrai a horda.',need:{ammo:1},info:'−1 munição · +32 ameaça',to:'central',delta:{ammo:-1,noise:32,health:-3},minutes:10,log:'Abriu caminho com um disparo, atraindo infectados.'},
      {label:'Subir pela escada externa',desc:'Mais lento, mas longe do acesso principal.',info:'−7 saúde · +6 infecção',to:'central',delta:{health:-7,infection:6,noise:2},minutes:26,log:'Escalou a escada externa e entrou na sala técnica.'},
      {label:'Avançar pelo pátio tomado pela horda',desc:'O caminho mais curto. O risco pode ser fatal.',info:'−30 saúde · +22 ameaça · +10 infecção',to:'central',delta:{health:-30,noise:22,infection:10},minutes:7,log:'Tentou atravessar o pátio tomado por infectados.'}
    ]},
    central:{act:5,zone:'torre',location:'TORRE NORTE / SALA DE RÁDIO',region:'SETOR 06 · ANTENA 101.7',title:'Alguém está ouvindo?',text:['A sala técnica ainda tem energia de emergência. A frequência está cheia de vozes interrompidas. Um operador do lado de fora da cidade talvez esteja monitorando os canais de resgate.', 'Você encontra o microfone, segura o fone em uma das orelhas e prepara o último pedido de ajuda. Existe a alternativa de sair sem se revelar.'],dialogue:['VOZ DISTANTE','“...aqui é posto Horizonte... identifiquem sua posição...”'],choices:[
      {label:'Usar o código de emergência anotado',desc:'Uma frequência estável e identificada.',needFlags:['frequency'],info:'sinal estabelecido · +14 min',to:'chamado',set:['signal','strongSignal'],minutes:14,log:'Transmitiu com o código oficial da Defesa Civil.'},
      {label:'Transmitir com a energia restaurada',desc:'Envie coordenadas pela rede auxiliar.',needFlags:['power'],info:'sinal estabelecido · +15 min',to:'chamado',set:['signal'],minutes:15,log:'Estabeleceu contato por meio da antena alimentada.'},
      {label:'Improvisar uma transmissão de socorro',desc:'Funciona mesmo sem reparos prévios, mas há interferências.',info:'−10 saúde · +17 ameaça',to:'chamado',delta:{health:-10,noise:17},set:['signal','weakSignal'],minutes:30,log:'Transmitiu um SOS por um canal instável.'},
      {label:'Desligar o rádio e desaparecer',desc:'Você evita denunciar sua posição, mas ninguém virá.',info:'sem pedido de socorro',to:'silencio',minutes:4,log:'Desligou o transmissor sem pedir resgate.'}
    ]},
    chamado:{act:6,zone:'torre',location:'TORRE NORTE / FREQUÊNCIA DE RESGATE',region:'SETOR 06 · CENTRO DE TRANSMISSÃO',title:'Uma resposta na escuridão',text:['Uma voz finalmente atravessa a interferência. Um helicóptero de reconhecimento está a caminho da praça central, mas só poderá permanecer por poucos minutos.', 'Sofia chama pelo comunicador: o abrigo ainda está ocupado. Nina segura a sua manga e pergunta se haverá lugar para todos.'],dialogue:['POSTO HORIZONTE','“Podemos recolher um pequeno grupo primeiro. Decida agora quem deve ser priorizado.”'],choices:[
      {label:'Guiar o grupo do abrigo até a evacuação',desc:'Retorne e organize a saída dos sobreviventes.',info:'desfecho coletivo',finish:'group',minutes:25,log:'Optou por voltar para organizar a evacuação coletiva.'},
      {label:'Proteger Nina durante a fuga',desc:'Garanta que a adolescente chegue ao ponto de resgate.',needFlags:['nina'],info:'desfecho de Nina',finish:'nina',minutes:23,log:'Escolheu acompanhar Nina até a evacuação.'},
      {label:'Fugir sozinha pela rota mais rápida',desc:'Não dependa de ninguém.',info:'desfecho individual',finish:'solo',minutes:10,log:'Optou por deixar a cidade sozinha.'}
    ]},
    silencio:{act:6,zone:'torre',location:'TORRE NORTE / SISTEMA DESLIGADO',region:'SETOR 06 · CENTRO DE TRANSMISSÃO',title:'O peso do silêncio',text:['Você desliga o transmissor. Lá fora, a cidade continua mergulhada na fumaça. Nenhum veículo sabe que vocês estão aqui.', 'A decisão agora é permanecer próximo às pessoas que conheceu ou tentar encontrar outra saída pelos próprios meios.'],choices:[
      {label:'Voltar ao abrigo e enfrentar a noite juntos',desc:'Talvez o grupo ainda consiga sobreviver.',info:'desfecho coletivo sem resgate',finish:'group',minutes:35,log:'Voltou ao abrigo sem sinal de evacuação.'},
      {label:'Guiar Nina por uma saída secundária',desc:'Uma travessia sem ajuda externa.',needFlags:['nina'],info:'desfecho de Nina sem resgate',finish:'nina',minutes:30,log:'Tentou sair da cidade com Nina sem resgate.'},
      {label:'Deixar Porto Cinza sozinha',desc:'Siga por um túnel de manutenção.',info:'desfecho individual',finish:'solo',minutes:21,log:'Deixou a torre e fugiu sozinha.'}
    ]}
  };

  const ENDINGS = {
    dawn:{title:'Ainda existe amanhã',sub:'FINAL DE ESPERANÇA',text:'O grupo segue as lanternas acesas na praça. As barricadas aguentaram, a confiança manteve as pessoas unidas e o helicóptero consegue recolher os sobreviventes prioritários. Ao amanhecer, Clara vê Porto Cinza desaparecer atrás das nuvens — mas as vozes que ajudou continuam ao seu lado.'},
    convoy:{title:'O preço de não desistir',sub:'FINAL AGRIDOCE',text:'A transmissão traz ajuda, mas a evacuação é turbulenta. A equipe de resgate consegue retirar parte dos sobreviventes; outros precisam esperar por uma segunda rota. Clara percebe que nenhuma escolha salvaria todo mundo. Mesmo assim, sua decisão deu ao abrigo uma chance real.'},
    promise:{title:'A promessa cumprida',sub:'FINAL DE NINA',text:'Clara e Nina chegam à zona de resgate antes que a passagem seja fechada. A garota segura o bilhete da mãe, agora enrugado pelas mãos trêmulas. Não sabem quem ainda está vivo, mas o socorro finalmente responde. Pela primeira vez desde o início do surto, Nina consegue dormir.'},
    alone:{title:'Uma voz só',sub:'FINAL SOLITÁRIO',text:'Clara sai da cidade pelo corredor autorizado e deixa o abrigo para trás. Sobreviveu. O rádio continua emitindo chamadas por muitas horas. Na segurança do perímetro externo, a pergunta é mais difícil que qualquer ferimento: teria sido possível voltar?'},
    shelter:{title:'A noite não terminou',sub:'FINAL DA RESISTÊNCIA',text:'Sem um sinal de resgate, Clara retorna ao ginásio. Sofia organiza turnos de vigia, e os sobreviventes se sentam juntos no escuro. Ninguém promete salvação. A cidade lá fora parece morta, mas ainda existe uma comunidade disposta a resistir.'},
    shadow:{title:'Fora do mapa',sub:'FINAL DE SOBREVIVÊNCIA',text:'Sem contato com o exterior, Clara encontra uma saída por túneis de serviço. Atravessa horas de escuridão e alcança a rodovia ao amanhecer. Não há certeza de onde ficará segura. Há apenas o som dos próprios passos.'},
    fallen:{title:'O último chamado',sub:'FINAL DE DERROTA',text:'A jornada termina antes de alcançar a segurança. Seu rádio continua repetindo estática entre os escombros. Em Porto Cinza, cada recurso e cada decisão importavam.'}
  };

  let state = null;
  let activeTab = 'map';
  let toastTimeout = null;
  const $ = (id) => document.getElementById(id);
  const clamp = (value, lo, hi) => Math.max(lo, Math.min(hi, value));
  const two = (value) => String(value).padStart(2, '0');
  const nowClock = () => {
    const mins = Number(state.minutes) || 220;
    return `DIA ${two(Math.floor(mins / 1440) + 1)} · ${two(Math.floor(mins % 1440 / 60))}:${two(mins % 60)}`;
  };
  function fresh() {
    return {v:VERSION, scene:'inicio', minutes:220, health:86, infection:6, noise:15, food:2, meds:1, parts:0, ammo:2, trust:0, flags:[], history:[{time:'DIA 01 · 03:40',message:'Porto Cinza entrou em colapso.'}], ending:null, choices:0};
  }
  function read(key) {try {return localStorage.getItem(key)} catch {return null}}
  function store(key, value) {try {localStorage.setItem(key,value);return true} catch {return false}}
  function validSave(obj) {
    return obj && obj.v===VERSION && (Object.prototype.hasOwnProperty.call(scenes,obj.scene) || obj.scene==='fim') &&
      typeof obj.health==='number' && Number.isFinite(obj.health) && Array.isArray(obj.flags) && Array.isArray(obj.history) &&
      typeof obj.minutes==='number' && Number.isFinite(obj.minutes) && (obj.scene!=='fim'||Object.prototype.hasOwnProperty.call(ENDINGS,obj.ending));
  }
  function saved() {try {const obj=JSON.parse(read(SAVE_KEY));return validSave(obj)?obj:null} catch {return null}}
  function save() {const ok=store(SAVE_KEY,JSON.stringify(state));$('save-status').textContent=ok?'PROGRESSO SALVO':'SEM SALVAMENTO';}
  function note(message) {state.history.push({time:nowClock(),message});state.history=state.history.slice(-40)}
  function setWelcome() {$('welcome').hidden=false;$('app').hidden=true;$('continue-btn').hidden=!saved();}
  function newGame() {state=fresh();activeTab='map';save();showGame();toast('Campanha iniciada. Boa sorte, Clara.');}
  function resume() {state=saved();if(!state){newGame();return;}showGame();toast('Progresso restaurado.');}
  function showGame() {$('welcome').hidden=true;$('app').hidden=false;switchTab(activeTab);render();window.scrollTo({top:0,behavior:'instant'});}
  function showHelp() {$('modal').hidden=false;$('close-modal').focus();}
  function closeHelp() {$('modal').hidden=true;}
  function toast(message) {const el=$('toast');el.textContent=message;el.hidden=false;if(toastTimeout)clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>{el.hidden=true;},2600);}
  function requirements(c) {
    const missing=[];
    for(const [key,value] of Object.entries(c.need||{}))if((state[key]||0)<value)missing.push(`${value} ${names[key]||key}`);
    for(const flag of c.needFlags||[])if(!state.flags.includes(flag))missing.push(flag==='nina'?'resgatar Nina':flag==='frequency'?'código da Defesa Civil':flag==='power'?'restaurar energia':flag);
    return missing;
  }
  function recordEnding(key) {
    let all=[];try {const parsed=JSON.parse(read(ENDINGS_KEY));if(Array.isArray(parsed))all=parsed.filter(k=>Object.prototype.hasOwnProperty.call(ENDINGS,k));} catch {}
    if(!all.includes(key))all.push(key);
    store(ENDINGS_KEY,JSON.stringify(all));
  }
  function conclude(mode) {
    if(mode==='solo')return state.flags.includes('signal')?'alone':'shadow';
    if(mode==='nina')return state.flags.includes('signal')?'promise':'shadow';
    if(!state.flags.includes('signal'))return 'shelter';
    if(state.trust>=3 && (state.flags.includes('fortified')||state.flags.includes('treated')||state.flags.includes('helped')) && !state.flags.includes('weakSignal'))return 'dawn';
    return 'convoy';
  }
  function choose(c,index) {
    if(!state||state.scene==='fim'||requirements(c).length)return;
    const scene=scenes[state.scene];if(!scene||!scene.choices.includes(c))return;
    for(const [key,value] of Object.entries(c.delta||{})) {
      if(!Object.prototype.hasOwnProperty.call(names,key))continue;
      const updated=(Number(state[key])||0)+value;
      state[key]=['health','infection','noise'].includes(key)?clamp(updated,0,100):key==='trust'?clamp(updated,-5,8):clamp(updated,0,99);
    }
    for(const flag of c.set||[])if(!state.flags.includes(flag))state.flags.push(flag);
    state.minutes+=c.minutes||0;state.choices+=1;
    note(c.log||`Decisão ${index+1}: ${c.label}`);
    // Uma ameaça acima de 75 atrai infectados a cada nova ação com ruído.
    if(state.noise>=75 && (c.delta?.noise||0)>0){
      state.health=clamp(state.health-9,0,100);
      state.infection=clamp(state.infection+4,0,100);
      note('O ruído atraiu infectados: −9 saúde e +4 infecção.');
    }
    if(state.health<=0||state.infection>=100){state.scene='fim';state.ending='fallen';note('A campanha terminou antes da evacuação.');recordEnding('fallen');}
    else if(c.finish){state.scene='fim';state.ending=conclude(c.finish);recordEnding(state.ending);note('Fim do capítulo 01.');}
    else {state.scene=c.to;}
    save();render();window.scrollTo({top:0,behavior:'smooth'});
  }
  function useKit() {
    if(!state||state.scene==='fim'||state.meds<1||(state.health>=100&&state.infection===0))return;
    state.meds-=1;
    state.health=clamp(state.health+25,0,100);
    state.infection=clamp(state.infection-12,0,100);
    state.minutes+=10;
    state.noise=clamp(state.noise+4,0,100);
    note('Usou um kit médico: recuperou saúde e reduziu a infecção.');
    save();render();toast('Kit médico utilizado: +25 saúde / −12 infecção.');
  }
  function render() {
    if(!state)return;
    const isEnd=state.scene==='fim';
    const scene=isEnd?{act:7,zone:'torre',region:'FIM DO CAPÍTULO',location:'PORTO CINZA / EPÍLOGO',title:ENDINGS[state.ending].title,text:[ENDINGS[state.ending].text],choices:[]}:scenes[state.scene];
    const act=Math.min(scene.act,missions.length-1);
    $('act-badge').textContent=isEnd?'CAPÍTULO CONCLUÍDO':`MISSÃO ${two(scene.act+1)} / 07`;
    $('location-title').textContent=scene.location;
    $('scene-zone-label').textContent=scene.region;
    $('scene-visual-status').textContent=isEnd?'TRANSMISSÃO ENCERRADA':state.flags.includes('signal')?'SINAL ESTABELECIDO':'SINAL INTERMITENTE';
    $('scene-visual').dataset.zone=scene.zone;
    $('scene-visual').classList.toggle('ended',isEnd);
    $('clock').textContent=nowClock();
    const percent=isEnd?100:Math.round(scene.act / 7*100);
    $('progress-fill').style.width=`${percent}%`;
    $('progress-label').textContent=`${percent}% DA CAMPANHA`;
    $('scene-index-label').textContent=isEnd?'EPÍLOGO / CAPÍTULO 01':`REGISTRO ${String(state.choices+1).padStart(3,'0')}`;
    $('scene-title').textContent=scene.title;
    const textContainer=$('scene-text');textContainer.replaceChildren();
    scene.text.forEach(s=>{const p=document.createElement('p');p.textContent=s;textContainer.append(p)});
    const dialogue=$('dialogue');dialogue.hidden=!scene.dialogue||isEnd;
    if(scene.dialogue){$('dialogue-speaker').textContent=scene.dialogue[0];$('dialogue-text').textContent=scene.dialogue[1]}
    $('story-card').classList.toggle('ended',isEnd);
    const choices=$('choices');choices.replaceChildren();
    if(isEnd){
      const end=ENDINGS[state.ending];const box=document.createElement('div');box.className='ending';
      const b=document.createElement('b');b.textContent=end.sub;box.append(b);
      const p=document.createElement('p');let endings=[];try {endings=JSON.parse(read(ENDINGS_KEY))||[]}catch{}p.textContent=`Finais encontrados: ${endings.length} de ${Object.keys(ENDINGS).length}. Suas decisões foram registradas neste navegador.`;box.append(p);choices.append(box);
      const restart=document.createElement('button');restart.className='primary big';restart.textContent='REJOGAR E FAZER OUTRAS ESCOLHAS ↗';restart.addEventListener('click',()=>{if(window.confirm('Reiniciar esta campanha? Seu final descoberto continuará registrado.'))newGame()});choices.append(restart);
      const home=document.createElement('button');home.className='ghost';home.textContent='VOLTAR AO MENU';home.addEventListener('click',setWelcome);choices.append(home);
    } else {
      scene.choices.forEach((choice,i)=>{
        const missing=requirements(choice);
        const button=document.createElement('button');button.type='button';button.className='choice';button.disabled=missing.length>0;
        button.setAttribute('aria-label',`${i+1}. ${choice.label}. ${missing.length?'Requer '+missing.join(', '):choice.info||''}`);
        const num=document.createElement('span');num.className='choice-num';num.textContent=i+1;
        const label=document.createElement('span');const main=document.createElement('span');main.className='choice-label';main.textContent=choice.label;const desc=document.createElement('span');desc.className='choice-short';desc.textContent=missing.length?`BLOQUEADO: requer ${missing.join(', ')}`:choice.desc;label.append(main,desc);
        const info=document.createElement('span');info.className='choice-effect';info.textContent=missing.length?'INDISPONÍVEL':choice.info||'CONTINUAR →';
        button.append(num,label,info);button.addEventListener('click',()=>choose(choice,i));choices.append(button);
      });
    }
    $('health-value').textContent=`${state.health} / 100`;
    $('infection-value').textContent=`${state.infection} / 100`;
    $('noise-value').textContent=`${state.noise} / 100`;
    $('health-bar').style.width=`${state.health}%`;
    $('infection-bar').style.width=`${state.infection}%`;
    $('noise-bar').style.width=`${state.noise}%`;
    ['food','meds','parts','ammo'].forEach(k=>{$(`${k}-value`).textContent=two(state[k]||0)});
    $('use-med-btn').disabled=isEnd||state.meds<1||(state.health>=100&&state.infection===0);
    $('trust-value').textContent=state.trust>=4?'MUITO ALTA':state.trust>=2?'ALTA':state.trust>=1?'POSITIVA':state.trust===0?'NEUTRA':'BAIXA';
    $('risk-label').textContent=state.health<30||state.infection>60||state.noise>70?'RISCO CRÍTICO':state.health<55||state.infection>35||state.noise>45?'RISCO ELEVADO':'RISCO MODERADO';
    $('mission-title').textContent=isEnd?'CAMPANHA CONCLUÍDA':missions[act][0];
    $('mission-description').textContent=isEnd?'Você chegou a um dos desfechos do primeiro capítulo. Rejogue para encontrar outros.':missions[act][1];
    document.querySelector('.mission-status').textContent=isEnd?'● FINAL ALCANÇADO':'● EM ANDAMENTO';
    for(const [i,zone] of zones.entries()){
      const node=document.querySelector(`.map-node[data-zone="${zone}"]`);
      if(node){node.classList.toggle('active',zone===scene.zone);node.classList.toggle('visited',i<zones.indexOf(scene.zone));}
    }
    renderPack();renderJournal();
  }
  function renderPack() {
    const box=$('pack-list');box.replaceChildren();
    const list=[['Alimentos',state.food],['Kits médicos',state.meds],['Ferramentas',state.parts],['Munição',state.ammo],['Código de emergência',state.flags.includes('frequency')?'ENCONTRADO':'—'],['Rede de energia',state.flags.includes('power')?'ATIVA':'DESATIVADA'],['Nina',state.flags.includes('nina')?'RESGATADA':'NÃO RESGATADA']];
    for(const [label,value] of list){const li=document.createElement('li');const span=document.createElement('span');span.textContent=label;const b=document.createElement('b');b.textContent=typeof value==='number'?two(value):value;li.append(span,b);box.append(li);}
  }
  function renderJournal() {
    const box=$('journal-list');box.replaceChildren();
    [...state.history].reverse().slice(0,12).forEach(rec=>{const li=document.createElement('li');const time=document.createElement('time');time.textContent=String(rec.time).slice(0,35);const message=document.createElement('span');message.textContent=String(rec.message).slice(0,250);li.append(time,message);box.append(li)});
  }
  function switchTab(tab) {
    if(!['map','pack','journal'].includes(tab))tab='map';activeTab=tab;
    for(const name of ['map','pack','journal']){const active=name===tab;$(`tab-${name}`).hidden=!active;$(`tabbtn-${name}`).classList.toggle('active',active);$(`tabbtn-${name}`).setAttribute('aria-selected',String(active));}
  }
  function bind() {
    $('start-btn').addEventListener('click',()=>{if(saved() && !window.confirm('Uma nova campanha substituirá o progresso atual. Continuar?'))return;newGame();});
    $('continue-btn').addEventListener('click',resume);
    $('intro-help').addEventListener('click',showHelp);
    $('help-btn').addEventListener('click',showHelp);
    $('close-modal').addEventListener('click',closeHelp);
    $('got-it').addEventListener('click',closeHelp);
    $('exit-btn').addEventListener('click',setWelcome);
    $('use-med-btn').addEventListener('click',useKit);
    $('modal').addEventListener('click',e=>{if(e.target===$('modal'))closeHelp();});
    document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&!$('modal').hidden){closeHelp();return;}
      if(!$('modal').hidden||$('app').hidden||!state||state.scene==='fim'||event.ctrlKey||event.altKey||event.metaKey)return;
      const index=Number(event.key)-1;
      if(Number.isInteger(index)&&index>=0&&index<=3){const scene=scenes[state.scene];const choice=scene?.choices[index];if(choice&&!requirements(choice).length)choose(choice,index);}
    });
  }
  bind();setWelcome();
  // Exposto apenas para testes locais da V1 (sem dependências de servidor).
  if(typeof window!=='undefined')window.__UT_TEST__={scenes,missions,ENDINGS,requirements,conclude,getState:()=>state,newGame,choose,saved};
})();
