# PROJETO CONSOLIDADO — ÚLTIMA TRANSMISSÃO V4.0

## Premissa

A protagonista Clara Mendes é uma socorrista durante o surto na cidade fictícia de Porto Cinza. Sua missão é reagrupar sobreviventes, investigar o surto e alcançar a última rota de resgate. O jogador pode escolher ajudar pessoas ou preservar os recursos para si. O conjunto de decisões condiciona o final.

## Mecânica principal

Ciclo: explorar mundo aberto → desviar ou enfrentar zumbis → coletar suprimentos → chegar ao objetivo → escolher uma rota narrativa → obter consequências e XP → desbloquear nova missão ou área.

A interface combina Canvas top-down, HUD vital, painel de inventário e relações, mapa operacional, diário e menus narrativos. Não usa imagens, fonts ou serviços externos para a campanha solo.

## Sobrevivência e sistemas

- Movimento WASD/setas ou controle touch, com obstáculos em estruturas.
- 2 áreas conectadas de aproximadamente 2.800 × 1.880 unidades de mundo, com bairros, avenidas, casas, árvores e carros abandonados.
- 10 pontos de missão com interações espaciais e 30 alternativas narrativas ao todo; algumas escolhas dependem de suprimentos ou flags anteriores.
- Infecção, vida, fome, sede, comida, água, kits médicos, munição.
- Zumbis em perseguição por proximidade, corpo a corpo, disparos automáticos ao alvo mais próximo e recompensas por eliminação.
- Baús coletáveis em todo o mapa e efeitos sonoros sem download de ativos externos.
- Sistema de nível/XP, oito conquistas, registro de decisões, salvamento automático local e cloud save autenticado opcional.
- Dia/noite baseado no tempo de jogo e progressão dos objetivos.
- Mundo pausado nos menus, como convenção de campanha solo. Nas salas multiplayer, o combate do cliente fica pausado ao abrir as escolhas.

## Missões

| # | Capítulo | Missão | Local | Decisão central |
|---|---|---|---|---|
| 1 | 1 | Sinais no hospital | Hospital Municipal | Atender feridos / obter suprimentos / procurar rota |
| 2 | 1 | Uma voz na farmácia | Bairro Velho | Salvar ou abandonar Nina |
| 3 | 1 | O acordo da oficina | Zona Industrial | Negociar, colaborar ou enfrentar Raul |
| 4 | 1 | A última noite no abrigo | Abrigo Esperança | Alimentar, defender ou abandonar a comunidade |
| 5 | 1 | A frequência perdida | Subestação Norte | Restaurar, sobrecarregar ou abandonar o sinal |
| 6 | 2 | O bloqueio da fronteira | Posto de Controle | Investigar, socorrer ou saquear |
| 7 | 2 | Ecos dentro da escola | Escola República | Salvar crianças, copiar mapa ou bloquear entrada |
| 8 | 2 | A torre de transmissão | Colina do Rádio | Proteger grupo, contar a verdade ou salvar-se |
| 9 | 2 | A verdade no laboratório | Instituto Helix | Pesquisar tratamento, salvar evidências ou destruir dados |
| 10 | 2 | A última transmissão | Píer do Horizonte | Evacuar juntos, transmitir a verdade ou fugir sozinho |

Desfechos planejados e implementados: Amanhecer coletivo; Promessa cumprida; A verdade sobrevive; A última testemunha; Sobrevivente solitária; A noite não acabou; morte por vida/infecção.

## Relações e escolhas herdadas

Três personagens com reputação 0–100: Nina, Sofia e Raul. As flags da campanha impactam alternativas disponíveis (por exemplo, restabelecer o sinal com aliado; obter tratamento mediante código ou passagem descoberta) e desfechos. Os dados são persistidos em saves locais/online.

## Arquitetura Cloudflare

```text
GitHub: freitadas/ULTIMA20 (repositório existente visto no histórico)
    └── código-fonte estático e backend (arquivos na raiz)
         |
         └── Cloudflare Workers Builds / Wrangler CLI
                └── Worker "ultima20" (assets + rotas API + WebSocket)
                      ├── ASSETS: dist/ (index.html, game.js, styles.css), gerados por build.mjs
                      ├── D1: users, sessions, saves, auth_attempts
                      └── Durable Objects: salas com votos, posições e histórico
```

Endpoints implementados: `GET /api/health`, `GET /api/me`, `POST /api/register`, `POST /api/login`, `POST /api/logout`, `GET /api/save`, `POST /api/save`, e `GET /ws/CODIGO?name=NOME` com upgrade WebSocket.

Autenticação: cookie de sessão com `HttpOnly`, `SameSite=Strict`, `Secure` em HTTPS; tokens aleatórios guardados somente como SHA-256 no D1; senhas derivadas por PBKDF2 SHA-256 com salt e 210.000 iterações; controle simples de tentativas por origem de IP. A API exige origem coincidente em POST. Registros de salvamento são vinculados a contas.

Cooperação: grupos de até quatro por código, posições propagadas aos participantes e votos da missão; histórico de decisões fica no armazenamento do Durable Object, mantendo o capítulo ao reconectar. Inimigos continuam locais — evolução futura exigiria servidor autoritativo para PvE real sincronizado.

## Próximos requisitos para operação pública robusta

Implantar e executar os testes integrais de Worker/D1/DO na própria conta Cloudflare; limites por conexão e monitoramento; proteção contra adulteração de progresso; reconexão/reentrada em votação; limpeza de sessões expiradas; testes de concorrência; acessibilidade ampliada; sistema de recuperação de contas. Não afirmar que essas tarefas foram realizadas nesta V4.0.
