# ÚLTIMA TRANSMISSÃO V6.0 — BÍBLIA NARRATIVA E TÉCNICA

## Premissa

Clara Mendes, socorrista de Porto Cinza, procura o irmão Daniel depois de uma ordem para interromper as comunicações e bloquear a evacuação. O que parecia uma missão de resgate se torna uma investigação sobre as decisões do Instituto Helix, a verdade ocultada pelo sistema de transmissões e a dificuldade de construir uma comunidade sem repetir os abusos do passado. A trama evita a dicotomia simplista entre “salvar todos” e “deixar todos”: muitas decisões positivas têm custos, e nem todo personagem culpado é irrecuperável.

### Estrutura dramática

**Ato I — As vozes dentro da cidade** (capítulos 1 a 7; conteúdo preservado da V5.0):
1. Ruído Branco — primeiro atendimento de Sofia e resgate de Nina.
2. A Promessa do Resgate — falsas notícias de retirada e colapso das rotas.
3. Ferro e Cinzas — ordens militares e encobrimentos do bloqueio.
4. O Abrigo dos Nomes — memória de Bento e conflitos no abrigo.
5. A Raiz da Praga — responsabilidade da Helix e tratamento experimental.
6. A Cidade se Levanta — conselho, infraestrutura, cercos.
7. A Última Escolha — transmissão inicialmente considerada final e resposta inesperada.

**Ato II — O que existe além do silêncio** (capítulos 8 a 11; seis missões por capítulo):
8. A Outra Margem — trem de Yuri, cartas confiscadas, navio Aurora, reencontro entre Nina e Alice, Samuel, farol.
9. Antes das Sirenes — lembranças da família Mendes, culpa de Sofia, fita de Helena, a voz de Alice, nome de Olívia, promessa no cais.
10. Estrada das Cinzas — pedágios de milícia, cozinha de Rosa, túnel de Henrique, reparação de Omar, desmilitarização, evacuação justa.
11. O Preço de uma Cura — pesquisa responsável, consentimento de Samuel, testemunho de Mara, recursos médicos, anonimização de dados, dilema de dosagem.

**Ato III — O futuro que escolhemos** (capítulos 12 a 15; seis missões por capítulo):
12. Filhos do Bloqueio — Clara descobre Olívia e Júlia, o caderno de Bento, o direito das crianças à festa, rádio de Luiza, casa e escola.
13. A Guerra das Vozes — desinformação, cerco a pacientes, desertores, julgamento de Caio, incêndio do arquivo, falsificação de voz.
14. O Que Nos Foi Tirado — gravação de Vítor, cartas de Dora, diálogo franco com Daniel, reparação de Íris, sepulturas identificadas e futuro de Olívia.
15. Depois da Última Noite — conselho e limites do poder, arquivo de nomes, direitos dos infectados conscientes, provas de Helix, despedida entre bairros, decisão coletiva final.

## Personagens

Dossiê de 33 personagens acessível pelo menu. Os 13 anteriores foram preservados: Clara, Sofia, Nina, Raul, Helena, Tomás, Bento, Eva, Lia, Íris, Vítor, Daniel e Miguel. Entraram Alice, Yuri, Marta, Elias, Omar, Mara, Levi, Dora, Gabriel, Cecília, Joana, Samuel, Rosa, Caio, Estela, Olívia, Júlia, Tereza, Luiza e Henrique.

Conflitos centrais: Clara quer salvar Daniel mas precisa reconhecer o direito de Olívia e Júlia de cobrar sua ausência; Sofia tenta reparar a participação em transferências; Nina busca compreender por que Alice desapareceu; Mara e Íris devem testemunhar contra estruturas das quais participaram; Samuel disputa o direito de escolher um tratamento; Rosa e Caio representam modelos de poder incompatíveis.

## Escolhas com consequências

As missões registram `flags`, `trust`, `recollections`, `decisions`; os flashbacks registram `memoryChoices` e `flags`. Em determinadas cenas, o roteiro consulta flags de missões anteriores antes de apresentar falas adicionais. Sete alternativas especiais são visíveis mas indisponíveis até que requisitos de missões anteriores sejam cumpridos. A última alternativa exige **três requisitos simultâneos**: conselho comunitário, divulgação de provas e vínculo com Olívia.

Os epílogos de diferentes personagens dependem de suas histórias, não apenas do final geral. Existem 24 desfechos centrais distintos, agrupados em travessia marítima (7), revelação e responsabilização (7), reconstrução de Porto Cinza (7) e decisão da assembleia (3). O fracasso da sobrevivente gera uma conclusão adicional.

### Flashbacks

16 sequências, cada uma com três interpretações possíveis. Mecânica narrativa: o jogador **não reescreve acontecimentos pretéritos**; registra a interpretação que Clara carrega deles. Algumas interpretações liberam escolhas em missões seguintes ou mudanças de diálogo. As cenas usam recursos de composição CSS, animação e legendas, sem vídeo nem áudio de voz gravados.

## Gameplay

Mapa 2D contínuo com área lógica de 5.200 × 3.500, controles por teclado/toque, zumbis com perseguição local, vida/fome/sede/infecção, modos História e Sobrevivência, combate, suprimentos, diário, HUD, conquistas, progressão, NPCs, capítulos, cenas, escolhas e salvamento automático. O mapa não é um 3D com prédios exploráveis internamente. A progressão da campanha é sequencial, mas o mapa pode ser explorado livremente, respeitando o desbloqueio de região do primeiro capítulo.

## Arquitetura de publicação

Frontend estático (`index.html`, `styles.css`, `story.js`, `expansion.js`, `game.js`) publicado via Cloudflare Pages ou `assets` do Worker. Autenticação, D1 e salvamento remoto em `worker.js` + `schema.sql`, rooms em Durable Objects. `wrangler.jsonc` precisa de ID D1 real para implantação completa. Publicação estática não ativa o backend.

## Critérios para uma V6 publicada

- Campanha inicia e termina, todas as 78 missões alcançáveis com pelo menos duas opções livres.
- As 16 memórias permitem decidir e registrar a escolha sem repetir flashback.
- Mudança de capítulo mostra introdução corretamente; old saves do V5.0 continuam no capítulo 8.
- 24 definições de desfecho não conflitam com epílogos individuais.
- Comandos teclado e controles móveis utilizáveis; nenhum JavaScript fatal.
- Build separa frontend e backend, e ZIP contém apenas arquivos de projeto soltos na raiz.
- Backend em produção só é aprovado depois de implantação e teste com D1/WebSocket reais.
