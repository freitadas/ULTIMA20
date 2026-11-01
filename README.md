# ÚLTIMA TRANSMISSÃO — V6.0 | A Saga das Vozes

**Jogo 2D de mundo aberto, sobrevivência e narrativa interativa, em português.** Versão integral e autossuficiente sobre a V5.0: 15 capítulos, 78 missões sequenciais, 33 personagens com dossiê, 16 flashbacks com escolhas, 109 sequências de cutscene roteirizadas e 24 desfechos narrativos definidos, além da derrota. Inclui 7 alternativas narrativas especiais condicionadas a escolhas anteriores. Os números foram verificados no código-fonte e nos testes.

## Jogar

1. Extraia os arquivos do ZIP diretamente numa pasta.
2. Abra **index.html** num navegador moderno para jogar em modo solo. Não é necessário instalar Node.js ou configurar a nuvem.
3. Clique **INICIAR HISTÓRIA** ou **CONTINUAR CAMPANHA**. Use **WASD/setas** para andar, **E** para interagir com a missão marcada, **ESPAÇO** para corpo a corpo, **F** para disparar, **M** para mapa, **J** para diário e **Esc** para pausa. No celular, use os controles virtuais. Na tela inicial, selecione **HISTÓRIA** (menos ataques e desgaste, padrão) ou **SOBREVIVÊNCIA** (combate e necessidades mais exigentes).
4. Em missões com flashback, avance pelo diálogo e selecione uma das três interpretações da memória. O passado não é reescrito; o sentido que Clara atribui à lembrança passa a constar do registro e pode influenciar cenas ou opções posteriores.
5. Ao alcançar um objetivo, escolha como agir. Os fatos da escolha são gravados e podem repercutir dezenas de missões depois.

O mundo aberto é uma cidade 2D contínua ampliada para 5.200 × 3.500 unidades; exploração, combate, zumbis, coleta, dia/noite, inventário, vida, fome, sede e infecção foram preservados. As cutscenes são **cenas de diálogo estilizadas em HTML/CSS com efeitos sintetizados**. Não são vídeos 3D, cenas pré-renderizadas nem personagens dublados.

## Novidades da V6.0

- **48 missões novas**, capítulos 8 a 15; 30 missões dos sete capítulos anteriores continuam integradas.
- **20 personagens adicionais**, com histórias cruzadas (Alice, Olívia, Júlia, Samuel, Joana, Mara, Levi, Rosa, etc.).
- **16 flashbacks com decisões** e interações desbloqueadas por pistas, resgates e relações.
- **24 desfechos narrativos escritos** e epílogos individualizados, além da possibilidade de morte.
- **Vínculos duradouros** com novos personagens, ramificações de diálogo condicionadas a fatos antigos, finais afetados por justiça, família, transparência, acolhimento e autoritarismo.
- **Migração de salvamento solo da V5.0/V4.0**, sem excluir o progresso salvo anteriormente. A última cena da V5.0 vira a abertura do segundo arco, não o fim definitivo.

### Como funciona a continuidade

A V6.0 grava o estado na chave `ut-v6-campaign`. Caso não exista, procura `ut-v5-campaign` e, depois, `ut-v4-campaign`. Se o jogo antigo terminou no capítulo 7 com 30 missões, a V6.0 abre a campanha a partir da **missão 31**, mantendo decisões, confiança, inventário e conquistas. A V5.0 original não é apagada. O salvamento na nuvem é convertido da mesma forma quando estiver autenticado.

## Publicar pela Cloudflare Pages — modo solo

1. Envie os arquivos **extraídos** para a **raiz do repositório do GitHub** (exemplo: `freitadas/ULTIMA20`), e não apenas o ZIP.
2. Cloudflare → Workers & Pages → **Pages** → importar repositório Git. Corrija uma eventual mensagem `Missing git connection` autorizando a integração GitHub.
3. Framework: `None`; Build command: `npm run build`; Build output directory: `dist`; branch: `main` (se for a branch principal do repositório).
4. Publique e abra o domínio `pages.dev` fornecido pelo serviço. `build.mjs` coloca somente `index.html`, `styles.css`, `story.js`, `expansion.js` e `game.js` na pasta `dist/`. As APIs online não funcionam em uma publicação exclusiva do Pages.

## Publicar o backend online — Workers, D1 e Durable Objects

Esta funcionalidade **exige configuração e implantação na conta Cloudflare**. Não é ativada ao abrir `index.html` localmente.

```sh
npm install
npx wrangler login
npx wrangler d1 create ultima-transmissao-db
```

Edite `wrangler.jsonc` substituindo `COLE_AQUI_O_ID_REAL_DO_SEU_D1` pelo `database_id` efetivamente fornecido pela Cloudflare e execute:

```sh
npm run db:remote
npm run deploy
```

Na URL publicada por Workers, confira `/api/health`, cadastre uma conta, use **CONTA** para sincronizar o salvamento, e teste **COOPERATIVO** com navegadores ou perfis separados. O Workers build pode usar `npm run build` e `npx wrangler deploy`. A tabela D1 e a classe Durable Object estão nos arquivos do projeto.

**Limites técnicos do multiplayer**: até quatro clientes podem ver posições e votar em decisões de missão. O combate, o dano, os zumbis, o inventário e as decisões pessoais de flashback continuam processados localmente e não são sincronizados de forma autoritativa. A publicação online, cadastro real, salvamento D1 real e conexão WebSocket com vários usuários **não foram testados numa conta Cloudflare real** neste pacote. Consulte `VALIDACAO.md`.

## Arquivos

`index.html`, `styles.css`, `story.js`, `expansion.js`, `game.js`, `worker.js`, `schema.sql`, `wrangler.jsonc`, `package.json`, `build.mjs`, `.gitignore`, `.assetsignore`, `README.md`, `PROJETO.md`, `VALIDACAO.md` — **todos diretamente na raiz do ZIP**, sem pasta externa.
