# ÚLTIMA TRANSMISSÃO — V4.0 (pacote consolidado)

Jogo 2D de apocalipse zumbi, em português, para navegador. Este único pacote consolida V1.1, V1.2, V2.0, V3.0 e V4.0. Todos os arquivos vêm diretamente na raiz do ZIP, sem pasta externa.

## Jogar agora (sem servidor)

1. Extraia todos os arquivos do ZIP para uma mesma pasta.
2. Abra `index.html` no Chrome ou Edge. Também pode publicar os arquivos no Cloudflare Pages para jogar no navegador.
3. Na tela inicial, escolha **Começar campanha**; controle Clara com WASD/setas.

Controles: WASD/setas = andar; E = interagir; Espaço = golpear; F = disparar; M = mapa; J = diário; Esc = pausa. No celular, use os controles na tela e **MOCHILA** para abrir o painel de recursos.

**O modo SOLO funciona sem Cloudflare, login, instalação ou dependências.** Salvamento em localStorage. A primeira abertura pode demorar alguns instantes em computadores mais lentos devido ao desenho do mapa.

## Publicar a campanha solo gratuitamente com Pages

- Suba **os arquivos extraídos** para a raiz do repositório GitHub (não suba o ZIP fechado).
- Cloudflare → Workers & Pages → Create application → Pages → Import existing Git repository.
- Autorize a conexão GitHub, selecione `freitadas/ULTIMA20` (ou seu próprio repositório), branch `main`, framework `None`, build command `exit 0`, output `.`.
- Publique. Esta opção executa a campanha solo; **login, salvamento online e salas cooperativas não funcionam no Pages estático**.

## Publicar a V4.0 completa (Workers + D1 + Durable Objects)

A V4.0 online necessita um **Worker**, não somente Pages. O mesmo Worker servirá HTML/CSS/JS e a API em `/api/*` e WebSockets em `/ws/*`.

1. Instale Node.js recente e descompacte o ZIP. Execute em um terminal dentro da pasta do jogo:

   ```sh
   npm install
   npx wrangler login
   npx wrangler d1 create ultima-transmissao-db
   ```

2. Copie o `database_id` real exibido pelo comando D1 para o campo `database_id` de `wrangler.jsonc`, substituindo literalmente `COLE_AQUI_O_ID_REAL_DO_SEU_D1`. **Não use um ID inventado.**
3. Inicialize o banco e publique:

   ```sh
   npm run db:remote
   npm run deploy
   ```

4. Acesse o domínio `workers.dev` que o Wrangler informar. Confirme `https://SEU-DOMINIO/api/health` mostrando `database:true` e `rooms:true`.
5. Na interface, use **CONTA** para registrar usuário e salvar sua campanha no D1. Use **COOPERATIVO** para criar sala e compartilhar um código de seis caracteres.

**GitHub → Cloudflare Workers Builds:** se usar implantação automática, o Worker deve ter o mesmo nome do campo `name` em `wrangler.jsonc` (neste pacote, `ultima20`). O comando de build é `npm run build` e o de deploy é `npx wrangler deploy`. O build cria `dist/` somente com os 3 arquivos públicos. Primeiro prepare o D1 e atualize o `database_id` no repositório; a migração `new_sqlite_classes` cria o Durable Object. As configurações variam de acordo com a conta. Se a tela mostrar **Missing git connection**, autorize/reconecte a integração GitHub no Cloudflare antes de tentar publicar via repositório. O método Wrangler CLI permite publicar sem a conexão GitHub.

Para desenvolvimento local com backend: execute `npm run db:local`, depois `npm run dev`. O Wrangler usa armazenamento local em sua configuração de desenvolvimento.

## Implementado por versão

- **V1.1:** mapa 2D desenhado em Canvas, prédios, ruas, veículos, árvores, zumbis perseguidores, combate corpo a corpo e à distância, efeitos sonoros sintetizados, feedback de dano, controles desktop/mobile, ajuste básico da dificuldade.
- **V1.2:** decisões ramificadas, relações de confiança com Nina, Sofia e Raul, missões dependentes de recursos, consequências narrativas e registro do diário.
- **V2.0:** segundo capítulo desbloqueável, setor leste, novos cenários e personagens, continuação das escolhas, dez missões de dois capítulos e múltiplos epílogos.
- **V3.0:** cadastro/login de apelido e senha, senha derivada por PBKDF2, sessão por cookie `HttpOnly`, progresso persistido por usuário no D1, conquistas salvas como parte da campanha.
- **V4.0:** salas de até quatro jogadores com Durable Objects/WebSockets, visualização das posições dos participantes, progresso narrativo da sala e votos coletivos nas decisões de missão.

## Limites e escopo reais

- **Exploração aberta 2D**: dois setores conectados, sendo o leste desbloqueado após missão 5. Não é um cenário 3D nem há interiores independentes ou veículos dirigíveis.
- **Combate dos zumbis é local em cada cliente**, mesmo no modo cooperativo. Posições dos jogadores, avanços narrativos e votações são compartilhados, mas inimigos, inventário e dano ainda não são simulados no servidor. Não há PvP.
- **Conquistas em conta** são persistidas como dados da campanha enviados pelo cliente, **não são verificadas por um sistema antitrapaça**. Não há ranking competitivo nesta versão.
- As salas persistem as escolhas, mas dependem de conexão WebSocket. A decisão é finalizada quando todos os participantes conectados votarem. Em caso de empate, vence a primeira alternativa entre as mais votadas.
- Autenticação básica para protótipo; para um serviço público em escala, adicionar recuperação de conta, e-mail verificado, auditoria, monitoramento, testes de carga e medidas adicionais contra automação.
- Nenhum dado sensível/secret é embutido no pacote. A configuração inclui deliberadamente um ID de D1 placeholder que precisa ser preenchido antes do deploy do Worker completo.
- **O backend Cloudflare não foi publicado nem validado em uma conta real nesta entrega.** Sua implantação e testes entre dispositivos dependem das credenciais/configurações da sua conta.

## Estrutura (todos na raiz do ZIP)

`index.html` interface, `styles.css` estilo, `game.js` lógica solo+co-op cliente, `worker.js` API+DO, `schema.sql` tabelas D1, `wrangler.jsonc` configuração, `build.mjs` gera `dist/` sem expor backend, `package.json` scripts, `.assetsignore` defesa adicional, `.gitignore`, `README.md`, `PROJETO.md`, `VALIDACAO.md`.

**Não publique `worker.js`, senhas ou credenciais em serviços terceiros fora do controle do repositório. Nunca coloque tokens de Cloudflare ou senhas em JavaScript cliente.**
