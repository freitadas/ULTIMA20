# VALIDAÇÃO — V5.0

## Verificações concluídas

- `node --check`: `game.js`, `story.js` e `worker.js` — sem erros sintáticos.
- Verificação da tabela de votação do Worker: 30 missões, 3 opções/etapa, IDs iguais aos da campanha.
- Execução automatizada do motor em **Chromium headless isolado**, com assets carregados inline devido às restrições de rede do ambiente de teste: **30 missões concluídas**, 30 escolhas aplicadas, 30 memórias registradas, 37 cenas marcadas como vistas e final coletivo `exodo` alcançado.
- Validação de cutscenes, pular cenas, tela de decisão, consequência pós-escolha, transição de capítulos e interface de epílogos durante a execução automatizada.
- Salvamento da V5.0 e restauração após reinicialização do contexto de JavaScript com dados persistidos — aprovado.
- Importação de salvamento V4.0 concluído com 10 missões, convertendo corretamente para capítulo 3, versão 5, sem marcar a campanha expandida como concluída — aprovado.
- Interface mobile (390 × 844), navegação de cutscene e ausência de erros JavaScript — aprovado.

## Limites de validação

- O teste automatizado desloca Clara diretamente até os pontos de missão **apenas no ambiente de teste** para acelerar os percursos; o jogador real precisa movimentar-se pelo mapa. Não existe função de teleporte de teste dentro do pacote distribuído.
- Os testes cobrem integralmente um percurso narrativo e verificam a definição das rotas, mas **não percorrem todas as combinações possíveis** de escolhas e finais.
- O modo offline foi validado com navegador isolado; o endereço público real no Cloudflare ainda **não foi implantado nem verificado**.
- Cadastro/login contra banco real, WebSockets remotos, D1 e Durable Objects **não foram testados em produção**. As rotas e a tabela de votos foram atualizadas no código.
- Os testes descritos não substituem auditoria de segurança, teste de carga nem homologação de múltiplos dispositivos.
