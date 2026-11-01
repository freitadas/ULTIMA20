# ÚLTIMA TRANSMISSÃO V6.0 — REGISTRO DE VALIDAÇÃO

## Resultado técnico da entrega

- Verificação de sintaxe: `npm run check` — **PASS** para `story.js`, `expansion.js`, `game.js` e `worker.js`.
- Preparação do frontend: `npm run build` — **PASS**; pasta `dist` formada pelos cinco recursos públicos.
- Integridade narrativa e interface com Chromium headless (scripts e CSS injetados diretamente na página devido às restrições de navegação do ambiente): **PASS**.
- Metadados do roteiro: **15 capítulos**, **78 missões**, **33 personagens**, **16 flashbacks interativos**. Total de sequências roteirizadas: 15 introduções + 78 cenas de missão + 16 cenas de flashback = **109**. São sequências HTML/CSS, não vídeos.
- Fluxo: as 78 missões foram percorridas na interface por cliques de escolha, com passagem por cenas, registros de consequência e final: **PASS**.
- Memórias: 16 escolhas registradas e persistidas, sem repetição das cenas já concluídas: **PASS**.
- Todos os 78 objetivos têm pelo menos duas alternativas habilitadas no roteiro testado: **PASS**.
- Desfecho alcançado em rota de reconstrução: **PASS**. Especial da assembleia: permanece bloqueado sem requisitos e é liberado com os três requisitos correspondentes: **PASS**.
- História concluída: **78 decisões** e **94 registros** (78 escolhas atuais + 16 interpretações de memória), sem erros fatais de JavaScript no percurso testado.
- Persistência local: reinicialização lógica com dados salvos e restauração das 78 missões concluídas: **PASS**.
- Migração de um salvamento V5.0 concluído na missão 30 para V6.0, com retomada na missão 31: **PASS**.
- Interface móvel simulada em viewport 390 × 844, cutscene e controles virtuais: **PASS**.
- Tamanho de um salvamento final de teste: aproximadamente 33,5 mil caracteres, abaixo do limite máximo declarado no Worker de 49 mil caracteres.
- Variações de final: 24 definições narrativas condicionais escritas no código, além da derrota. Não foi exercitada cada combinação de flags até cada final, portanto não se afirma teste individual de todos os 24 caminhos.

## Não comprovado neste ambiente

- Publicação real em repositório GitHub do usuário e conexão/autorização Cloudflare.
- Registro e autenticação por contas Cloudflare Workers + D1 implantados.
- Salvamento remoto numa instância D1 real.
- Cooperação WebSocket e Durable Objects com navegadores independentes conectados na infraestrutura publicada.
- Performance em telefones reais e acessibilidade completa em todas as plataformas.
- Acessibilidade/navegação real dos 78 locais com deslocamento manual; o teste de progresso reposicionou Clara até os objetivos, o que isola a lógica narrativa do combate. O motor de movimento e o mapa são preservados da versão anterior.

## Restrições conhecidas

O combate, o inventário, os zumbis, o dano e as escolhas pessoais dos flashbacks são processados no cliente, não sincronizados por um servidor autoritativo. Mesmo com o Worker ativo, a cooperação suporta apenas posições e votação nas missões compartilhadas. O jogo utiliza sprites desenhados no Canvas e cenários/cutscenes estilizados em CSS; não tem dublagem gravada ou cenas cinematográficas pré-renderizadas.
