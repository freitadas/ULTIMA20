# ÚLTIMA TRANSMISSÃO V11.0 — MUNDO VIVO

Jogo brasileiro de apocalipse zumbi 2D, com exploração de mundo aberto, campanha narrativa, decisões permanentes e sistemas de sobrevivência, executável no navegador. Esta entrega consolida as melhorias previstas para V6.1 a V10.0 **numa única V11.0** sobre a base da V6.0.

## Iniciar imediatamente (offline, sem instalar nada)

1. Extraia os arquivos do ZIP **sem criar uma pasta externa no repositório**.
2. Abra `index.html` com Chrome, Edge ou Firefox. Clique em **INICIAR HISTÓRIA**.
3. Conclua as atividades da missão antes de tomar uma decisão; as atividades aparecem em **azul** e o local de decisão em **amarelo**.
4. O jogo salva automaticamente no armazenamento local deste navegador. **Não use janela anônima para campanhas longas.**

## Recursos disponíveis nesta versão

| Módulo | Implementação da V11.0 |
|---|---|
| Campanha narrativa | **15 capítulos**, **78 missões** e **33 personagens**, preservando a história e a estrutura de decisões da V6.0 |
| Missões práticas | Oito arquétipos: recuperar pistas, resgatar/escoltar, defender posição, reparar, furtividade, retransmissão, eliminar infectados, abrir rota |
| Conteúdo opcional | **8 eventos paralelos com escolhas** e recompensas/consequências distintas |
| Interiores | **12 locais exploráveis**, com três interações e espólios persistentes por local |
| Flashbacks | **16 lembranças exploráveis**, cada uma com três objetos e uma interpretação narrativa selecionada pelo jogador |
| Aliados | Sofia, Nina, Raul e Helena podem acompanhar Clara quando os requisitos de confiança são atendidos; auxiliam em combates e podem ficar feridos |
| Sobrevivência | Água, comida, kits, munição, infecção, saque, peças, tecido, curativos, iscas, barricadas e inventário |
| Zumbis | Tipos básico, corredor e bruto; ruído de disparos, iscas e furtividade influenciam a perseguição |
| Exploração | Cidade 5200 × 3500, minimapa, entradas, eventos, ciclo dia/noite, chuva estilizada e alterações visuais conforme decisões |
| Cutscenes | Cenas estilizadas com diálogos, câmera, silhuetas, retratos simbólicos e efeitos sintetizados, além da opção de pular |
| Finais | 24 definições narrativas herdadas da V6.0, duas condições especiais adicionais na V11.0 e possibilidade de morte. Nem todas foram exercitadas nos testes |
| Salvamentos | Novo formato V11.0 com migração automática dos dados locais V4/V5/V6, sem apagar o salvamento antigo |
| Contas | Código existente de autenticação e armazenamento remoto com Workers + D1, condicionado à implantação da infraestrutura |
| Cooperativo | Código da V6.0 para salas até quatro jogadores, visualização das posições e votação coletiva. **Combate, zumbis e inventários não são sincronizados de modo autoritativo** |

## Comandos

| Tecla | Função |
|---|---|
| WASD / setas | Mover Clara |
| E | Interagir, examinar objeto, entrar ou sair de edifício, iniciar atividade de missão |
| Espaço | Golpe corpo a corpo |
| F | Disparar arma |
| Shift | Caminhar furtivamente (manter pressionado) |
| Q | Esquiva de emergência, consome fôlego |
| C | Fabricar equipamentos |
| G | Escolher companheiros |
| H | Aplicar curativo |
| R | Arremessar isca sonora |
| V | Instalar barricada previamente fabricada |
| M / J | Mapa / Diário |
| Esc | Pausar |

Em celulares, utilize o direcional e os botões **USAR, GOLPE, TIRO, PASSOS, CRIAR, EQUIPE e MOCHILA**. O botão PASSOS alterna furtividade no celular.

## Publicar via GitHub + Cloudflare Pages (modo solo)

1. Crie/atualize o repositório GitHub, por exemplo `freitadas/ULTIMA20`.
2. Faça upload dos **15 arquivos da raiz do ZIP extraído**, não do ZIP fechado. O `index.html`, `package.json` e `build.mjs` devem estar na raiz do repositório.
3. No painel da Cloudflare, acesse **Workers & Pages → Pages → Importar repositório Git**. Se aparecer **Missing git connection**, é necessário autorizar novamente a integração GitHub/Cloudflare.
4. Escolha a branch principal (geralmente `main`). Configure **Framework preset** `None`, **Build command** `npm run build` e **Build output directory** `dist`.
5. Publique. O site da Cloudflare Pages permite jogar a campanha solo, com salvamento local. Ele **não habilita automaticamente** login nem cooperativo.

`npm run build` usa apenas APIs nativas do Node e copia o frontend para `dist/`. O diretório é gerado durante a publicação e **não está incluído no ZIP**.

## Habilitar contas e cooperativo (Cloudflare Workers)

A estrutura original do projeto foi preservada: `worker.js`, `schema.sql` e `wrangler.jsonc`. Para usar esses serviços, é preciso criar e configurar o banco D1 na conta Cloudflare, preencher o identificador real em `wrangler.jsonc`, executar a migração SQL e implantar o Worker. Não existe ID real do banco dentro do pacote.

```bash
npm install
npx wrangler login
npx wrangler d1 create ultima-transmissao-db
# Preencher em wrangler.jsonc o database_id devolvido pelo comando anterior.
npm run db:remote
npm run deploy
```

Uma publicação apenas no Pages não substitui a implantação do Worker. O código do cooperativo sincroniza as **posições** e as **votações das decisões**; os ataques, dano, inventário e infectados continuam simulados individualmente. **O multiplayer completo e as funções online ainda não foram validados em ambiente real de produção.**

## Continuidade do progresso

O salvamento V11 usa `ut-v11-campaign`. Quando não há salvamento V11, o jogo busca, nessa ordem, `ut-v6-campaign`, `ut-v5-campaign` e `ut-v4-campaign`. Os dados antigos não são apagados. A nova campanha preserva missões concluídas, escolhas, inventário, reputação, cutscenes vistas e flags existentes sempre que os dados são válidos. As funções inéditas recebem valores iniciais seguros.

## Arquivos do ZIP

`index.html`, `styles.css`, `game.js`, `story.js`, `expansion.js`, `worker.js`, `schema.sql`, `wrangler.jsonc`, `package.json`, `build.mjs`, `.gitignore`, `.assetsignore`, `README.md`, `PROJETO.md`, `VALIDACAO.md`.

**Arquivos soltos diretamente na raiz do ZIP.** Não é necessário instalar um framework JavaScript. O frontend foi desenvolvido sem bibliotecas externas para reduzir dependências.


## Atualização V11.1
- Cutscenes agora exibem personagens em cena com retratos estilizados, nome, função e cenário temático por localização/tom da cena.


## V11.2 — Artes completas nas cutscenes

Quatro cutscenes ilustradas e incorporadas ao jogo (hospital com Clara/Sofia, telhado com Clara/Nina, laboratório Helix com Clara/Íris, flashback com Clara/Daniel). As artes são imagens WebP incluídas **na raiz** do ZIP. O sistema apresenta automaticamente a arte quando os personagens participam de uma cena compatível; demais cenas usam o visual estilizado anterior. As falas, o título, o nome de quem fala e os botões são elementos HTML funcionais, não textos fixos dentro das imagens. O build copia as quatro artes para `dist/`.

Publicação Pages (frontend solo): `npm run build`, saída `dist`. Para contas/multiplayer, deploy Worker e configuração D1/Durable Objects são adicionais.
