# VALIDAÇÃO — ÚLTIMA TRANSMISSÃO V11.0

## Verificações realizadas

- `npm run check`: **PASS**. Arquivos `story.js`, `expansion.js`, `game.js` e `worker.js` analisados pelo Node.js sem erros de sintaxe.
- `npm run build`: **PASS**. Geração de `dist/` com os cinco arquivos públicos da aplicação.
- Inicialização em Chromium headless com arquivos HTML/CSS/JS combinados para ensaio local: **PASS**, sem erros de execução JavaScript observados.
- Menu inicial e abertura da primeira cutscene: **PASS**.
- Início da primeira missão, interação com alvo do resgate e liberação da consequência narrativa: **PASS** após o acompanhamento do sobrevivente. O ensaio usa teleporte local para acelerar deslocamentos e acompanha a atualização do resgatado em tempo real.
- Evento opcional com efeitos e persistência (`O caderno molhado`): **PASS**.
- Fabricação de curativo e atualização de inventário: **PASS**.
- Recrutamento da Sofia por confiança: **PASS**.
- Coleta dos três objetos de um interior: **PASS**.
- Flashback 30 com exame dos três objetos e apresentação de três interpretações possíveis: **PASS**.
- Campanha com **78 decisões e desfecho final**: **PASS em simulação automatizada de progressão**. Essa verificação aplica decisões diretamente no motor; **não comprova** o percurso manual das 78 atividades no mundo, nem a ausência de todas as condições de bloqueio em jogabilidade real.
- Carregamento de um salvamento V6 com missão 20 e migração para formato V11 sem perder a etapa: **PASS**.
- Interface móvel em viewport de 390–400 px, renderização do mapa e botões de ação: **PASS** em ensaio Chromium headless.
- Distribuição das atividades no código: 78 missões, oito tipos diferentes. 12 interiores, oito eventos opcionais, 16 flashbacks e quatro aliados recrutáveis.

## Limitações da validação

- Não executamos testes de usuário completos, nem percorremos manualmente todas as 78 missões.
- Não testamos individualmente todas as combinações de finais e condições de escolha.
- Não foram verificados desempenho em hardware diverso, qualidade sonora em todos os dispositivos nem carga de centenas de usuários.
- Não houve publicação efetiva do projeto no GitHub/Cloudflare durante a criação do pacote.
- **Sem teste real de D1, Workers e Durable Objects** numa conta Cloudflare: login remoto, backup online, cooperação e votação coletiva mantêm-se **pendentes de homologação**.
- O multiplayer não compartilha estado autoritativo de zumbis, dano, inventários e combate.

## Critérios de publicação

1. O ZIP deve conter somente arquivos de projeto diretamente na raiz, sem pasta externa.
2. `index.html` deve existir na raiz; build deve gerar `dist/index.html` e os quatro assets necessários.
3. Modo solo deve abrir em navegador moderno e continuar sem backend.
4. Nunca afirmar que um domínio está publicado ou que sistemas online foram homologados sem teste real.
5. Ao habilitar Workers, usar ID de D1 **real**, executar SQL e testar `/api/health`, cadastro, login, salvar, carregar e sala cooperativa em múltiplos navegadores.
