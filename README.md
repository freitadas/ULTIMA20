# ÚLTIMA TRANSMISSÃO — V5.0 / Edição Narrativa

Jogo **solo jogável de apocalipse zumbi em mundo aberto 2D**, com campanha original de **7 capítulos / 30 missões**, mais de 90 opções de escolha (3 por missão), 13 personagens documentados, 37 cutscenes de capítulos/missões, consequências individuais, epílogos por personagem e **16 desfechos narrativos possíveis, além da morte**. Funciona em navegador moderno, sem dependências para o modo solo.

## Começar agora

1. Extraia **todos os arquivos** do ZIP para a mesma pasta (sem alterar os nomes).
2. Abra `index.html` no Chrome ou Edge para jogar **offline/solo**.
3. Clique em **INICIAR HISTÓRIA**, acompanhe ou pule a cutscene, explore o mapa e vá até o ponto amarelo da missão. Pressione **E** perto do ponto de interesse; as escolhas aparecem após a cena.
4. Durante a exploração, use **WASD/setas** para movimentação, **Espaço** para golpe, **F** para disparo, **M** para mapa, **J** para diário e **Esc** para pausa. No celular, utilize o controle virtual, **USAR**, **GOLPE**, **TIRO** e **MOCHILA**.

**Importante:** as cutscenes são cenas animadas com CSS, textos, diálogos e efeitos sonoros sintetizados. **Não são arquivos de vídeo nem cenas 3D.** O mundo aberto é um mapa 2D contínuo com regiões e marcos distintos. Os locais de missão não têm interiores 3D.

## Mudanças em relação à V4.0

- Passou de **2 para 7 capítulos** e de **10 para 30 missões**, distribuídas em diferentes bairros de Porto Cinza.
- **20 missões novas** com descrição do conflito, três decisões por missão e consequência narrativa própria.
- **Prólogo de cada capítulo e cutscene de todas as 30 missões**, com navegação fala a fala e botão para pular; após cada escolha aparece a consequência, e o diário registra as memórias.
- Protagonista com objetivo central: descobrir o destino de **Daniel Mendes**, seu irmão, e a origem da política de silêncio relacionada ao **Instituto Helix**.
- **13 personagens** no dossiê: Clara, Sofia, Nina, Raul, Helena, Tomás, Bento, Eva, Lia, Íris, Vítor, Daniel e Miguel. Relações quantificadas com oito personagens.
- **16 desfechos narrativos principais + morte**, com epílogos condicionais para sete personagens. Os finais dependem de alianças, ações solidárias, provas, tratamento, destino de Daniel, governança da comunidade e caminho final.
- Mundo expandido de 2.800 × 1.880 para **3.480 × 2.450 unidades**, mais pontos exploráveis, recursos, ruas e NPCs.
- De 8 para **14 conquistas**. Novo quadro de capítulos e registro histórico detalhado.
- Mantidos combate, inventário, zumbis, ciclo de dia/noite, progresso, modo solo e sistema cooperativo opcional.

## Continuidade de salvamentos V4.0

O modo solo **reconhece automaticamente o salvamento V4.0** (`ut-v4-campaign`) quando ainda não existir salvamento V5.0. A campanha antiga concluída na missão 10 pode ser retomada como uma **falsa evacuação**, entrando no capítulo 3. As escolhas e os recursos antigos são preservados, com campos novos inicializados nos valores padrão. Para evitar substituição acidental, a V5.0 utiliza a chave separada `ut-v5-campaign` e não apaga o salvamento antigo. Salvamentos V4.0 do D1 também podem ser convertidos ao carregar pela API da V5.0.

## Publicar o modo solo com GitHub + Cloudflare Pages

1. Crie ou atualize o repositório do jogo no GitHub e envie os **arquivos extraídos** do ZIP para a raiz, não o ZIP em si.
2. Cloudflare → Workers & Pages → **Pages** → **Import an existing Git repository**. Autorize a integração GitHub, selecione seu repositório e a branch `main`.
3. Framework `None`; **build command `npm run build`**; **diretório de saída `dist`**. O build copia somente os arquivos públicos `index.html`, `styles.css`, `story.js` e `game.js`, evitando exposição do backend e da documentação.
4. Publique e abra o URL `pages.dev` gerado. **Nesse modo estático, contas e cooperativo online não estarão ativos.**

## Publicar o modo online com Cloudflare Workers, D1 e Durable Objects

O backend é uma adaptação do Worker da V4.0, agora com validação de 30 missões, coordenadas ampliadas e todas as opções do sistema cooperativo.

1. Instale Node.js recente e abra um terminal na pasta extraída. Execute:
   ```sh
   npm install
   npx wrangler login
   npx wrangler d1 create ultima-transmissao-db
   ```
2. Substitua `COLE_AQUI_O_ID_REAL_DO_SEU_D1` em `wrangler.jsonc` pelo `database_id` **real** que a Cloudflare informar. Nunca coloque credenciais no código.
3. Inicialize as tabelas e publique:
   ```sh
   npm run db:remote
   npm run deploy
   ```
4. No endereço do Worker, teste `/api/health`, crie uma conta no botão **CONTA**, salve o progresso e crie uma sala em **COOPERATIVO**. Salas usam WebSockets/Durable Objects e permitem até 4 pessoas com posição compartilhada e decisões por votos.
5. Para integração GitHub → Workers Builds, utilize o comando build `npm run build` e deploy `npx wrangler deploy`, após configurar o D1. `npm run build` coloca apenas os 4 arquivos públicos em `dist/`.

**Atenção:** D1 e Durable Objects exigem configuração real em sua conta, uma implantação correta e testes com usuários distintos. A publicação online e as sessões multiplayer reais **não foram executadas nesta entrega**. Combate com zumbis, inventário e dano continuam processados **localmente** em cada navegador; coop sincroniza apenas posições e escolhas da narrativa. O multiplayer ainda não é um servidor de combate autoritativo.

## Comandos locais

```sh
npm install
npm run check
npm run build
npm run db:local
npm run dev
```

## Arquivos do pacote

- `index.html` — interface, comandos e menu.
- `styles.css` — identidade visual, cenas animadas e responsividade.
- `story.js` — roteiro, personagens, cenas e opções de 20 missões novas, além das cenas aprimoradas das primeiras dez.
- `game.js` — motor do mundo aberto, cutscenes, escolhas, narrativas, salvamentos e cooperativo cliente.
- `worker.js`, `schema.sql`, `wrangler.jsonc` — backend e serviços online.
- `package.json`, `build.mjs` — ferramentas de desenvolvimento.
- `.gitignore`, `.assetsignore` — exclusões.
- `PROJETO.md` — enredo e critérios editoriais.
- `VALIDACAO.md` — testes e limites.

Todos os arquivos listados estão **diretamente na raiz do ZIP**. Para publicar o projeto completo com Worker, o build copia apenas os arquivos públicos para `dist/`.
