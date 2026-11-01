# VALIDAÇÃO — ÚLTIMA TRANSMISSÃO V4.0

## Testes executados (neste ambiente)

- `node --check game.js` → sem erros sintáticos.
- `node --check worker.js` → sem erros sintáticos.
- Chromium headless + Playwright com HTML/CSS/JS injetados em página de teste isolada, pois navegação para URLs e `file://` estava bloqueada pelo ambiente.
- Inicialização do jogo e fluxo de escolha para iniciar campanha: aprovado.
- Movimentação WASD e interação espacial (E) no Hospital Municipal: aprovado.
- Três alternativas da missão inicial disponíveis; seleção move missão 1 para missão 2: aprovado.
- Tela de mapa, diário e menu cooperativo: aberto sem erros JavaScript.
- Layout desktop 1440×900 e layout mobile 390×844: renderizado sem transbordamento horizontal no teste.
- Simulação da sequência completa das 10 missões com decisões e recursos compatíveis: avançou até a missão 10 e registrou o desfecho **AMANHECER COLETIVO** sem erros de JavaScript.
- Teste isolado do Durable Object com dois participantes simulados: votação 1/2, resolução de empate, persistência dos votos após nova instância e histórico de missões: aprovado. `GET /api/health` simulado: aprovado.
- Build de assets (`node build.mjs`) e verificação de que `dist/` contém somente `index.html`, `styles.css` e `game.js`: aprovado.
- Teste de sincronia e persistência com Cloudflare real: **NÃO EXECUTADO** (sem D1/DO publicado neste ambiente).
- Teste ponta a ponta real de cadastro, login e coop: **NÃO EXECUTADO**. A sintaxe foi verificada, mas o comportamento em produção depende do deployment e das bindings da Cloudflare.

## Regressões e limitações conhecidas

- Os controles móveis permitem acessar mochila pelo botão **MOCHILA**; a área do jogo em celular é menor e não mostra o painel permanentemente.
- O algoritmo local desenha mapa e zumbis em Canvas; a qualidade do desempenho depende do aparelho, e não foi medida em múltiplos modelos de celulares.
- Ataques de zumbis são processados localmente, sem confirmação autoritativa do servidor em coop.
- D1 `database_id` precisa ser preenchido antes do deploy Worker, e a base SQL precisa ser inicializada.
- Conquistas não são atestadas pelo servidor; são exibidas conforme o save da campanha.

## Critérios para homologação online posterior

1. `GET /api/health` retorna `database:true`, `rooms:true`.
2. Cadastrar usuário, fazer login, salvar campanha, encerrar sessão, relogar e recuperar progresso.
3. Dois navegadores distintos entram na mesma sala e veem o outro jogador se movimentar.
4. Os dois votam na mesma missão: o Durable Object divulga um único resultado e avança o capítulo em ambos.
5. Um novo integrante entra numa sala com histórico: obtém a missão correta.
6. Quinto jogador é recusado; IDs de sala malformados e operações API sem origem correta são rejeitados.
7. Sala não autoriza escolhas de missões fora da progressão.
8. Versão mobile e Desktop publicada carregam os mesmos arquivos e não apresentam falhas nos controles.
