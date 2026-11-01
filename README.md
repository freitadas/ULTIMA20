# ÚLTIMA TRANSMISSÃO — V1.0

Jogo de apocalipse zumbi com história ramificada, missões e escolhas. **Primeiro capítulo jogável** em HTML, CSS e JavaScript puro; não exige servidor para jogar localmente.

## Arquivos (todos na raiz)

- `index.html` — interface e telas.
- `styles.css` — estilo responsivo e ilustrações em CSS/SVG.
- `game.js` — motor do jogo, narrativa, recursos e salvamento.
- `PROJETO.md` — documento completo de concepção, arquitetura e roadmap.
- `README.md` — instruções de uso e publicação.

## Jogar

Extraia os arquivos juntos na mesma pasta e abra `index.html` no Chrome, Firefox ou Edge. Clique em **INICIAR NOVA HISTÓRIA**. Depois de começar, use o mouse, o toque ou as teclas de 1 a 4 para tomar decisões.

A campanha é salva automaticamente no armazenamento local do navegador (`localStorage`), desde que ele esteja habilitado. O botão **CONTINUAR HISTÓRIA** aparece quando há um salvamento válido. Um novo jogo substitui a campanha anterior, mas conserva a lista de finais encontrados.

## Publicar com GitHub + Cloudflare Pages

1. Crie um repositório GitHub dedicado ao jogo, por exemplo `ultima-transmissao`.
2. Envie **todos os arquivos soltos para a raiz** do repositório (não coloque a pasta do ZIP dentro do repositório).
3. Abra [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository**.
4. Conecte o GitHub e escolha o repositório.
5. Use estes parâmetros:
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: `exit 0` (ou sem comando, conforme a interface)
   - **Build output directory**: `.` (pasta raiz, onde está o `index.html`)
6. Faça o deploy. O jogo será servido em um endereço `*.pages.dev` atribuído pela Cloudflare.
7. Atualizações enviadas à branch de produção pelo GitHub poderão disparar novos deploys automaticamente.

Documentação oficial: [Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) e [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/).

## Escopo e limitações

- Solo, offline após carregar os arquivos; sem multiplayer, contas ou servidor.
- Salvamento em um único navegador/dispositivo e dependente das configurações de armazenamento.
- Mapa é um painel ilustrativo da progressão, não um mundo aberto com movimento WASD.
- História original de Porto Cinza. Sem bibliotecas externas, imagens de terceiros, credenciais ou chamadas a APIs.
- Recursos visíveis na tela; as opções apresentam requisitos antes de serem selecionadas.
- O ZIP está pronto para **enviar ao GitHub e hospedar**. Ele não representa publicação automática em suas contas.

## Teste rápido

Inicie a história, anote a localização atual, escolha uma ação, recarregue a página e clique em **CONTINUAR HISTÓRIA**. Depois chegue ao epílogo. Reinicie para experimentar outra rota.
