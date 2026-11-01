# PROJETO — ÚLTIMA TRANSMISSÃO V5.0

## Premissa

Clara Mendes, socorrista que permaneceu em Porto Cinza após o colapso, recebe uma transmissão incompleta de seu irmão Daniel. A busca individual a coloca diante da ocultação de registros pelo Instituto Helix, de uma política de isolamento previamente ordenada e de comunidades que precisam escolher entre fugir, revelar a verdade ou reconstruir a cidade.

Tema principal: a diferença entre **sobreviver** e **assumir responsabilidade pelo destino dos outros**. A história não apresenta um protagonista perfeitamente justo: escolhas pragmáticas podem quebrar vínculos que serão necessários depois.

## Estrutura dos 7 capítulos

| Capítulo | Arco | Missões |
|---|---|---|
| 1. Ruído Branco | Hospital, Nina, Raul, abrigo e primeiro sinal de Daniel | 1–5 |
| 2. A Promessa do Resgate | Bloqueio, escola, torre, Helix e falsa evacuação | 6–10 |
| 3. Ferro e Cinzas | Helena na ponte, Tomás no terminal, Eva nas bombas e Lia na estação | 11–14 |
| 4. O Abrigo dos Nomes | Bento, responsabilidade médica de Sofia, julgamento de Raul e família de Nina | 15–18 |
| 5. A Raiz da Praga | Arquivos, antídoto, confronto com Vítor e fita de Daniel | 19–22 |
| 6. A Cidade se Levanta | Geradores, cerco, conselho e possível reencontro com Daniel | 23–26 |
| 7. A Última Escolha | Assembleia, transmissão, rota da comunidade e destino de Porto Cinza | 27–30 |

## Personagens e conflito pessoal

- **Clara Mendes:** principal personagem jogável; procura o irmão, mas precisa reconhecer o valor das outras vidas.
- **Daniel Mendes:** operador de radiodifusão, autor das gravações que conectam o apagão ao encobrimento.
- **Sofia Valença:** médica que convive com responsabilidade por uma transferência de pacientes.
- **Nina Duarte:** técnica de rádio que procura a mãe desaparecida.
- **Raul Nascimento:** mecânico viúvo e guardião dos geradores, vulnerável a acusações da comunidade.
- **Helena Vasques:** guarda municipal que precisa decidir se obedece às ordens de bloqueio.
- **Tomás Arantes:** jornalista dividido entre direito à informação e proteção das testemunhas.
- **Bento:** adolescente que registra nomes dos desaparecidos e insiste em manter a memória.
- **Eva Saldanha:** engenheira responsabilizada por uma inundação deliberada.
- **Lia Tavares:** operadora de rádio e preservadora de pedidos de ajuda ignorados.
- **Íris Monteiro:** cientista que busca corrigir as consequências de pesquisas ocultadas.
- **Vítor Antunes:** diretor do instituto que justifica políticas cruéis como cálculo utilitarista.
- **Miguel Braga:** responsável pelos suprimentos do abrigo, dividido entre prudência e solidariedade.

## Mecânicas narrativas implementadas

1. **Três escolhas por missão**, com efeitos no inventário, saúde, infecção, XP, confiança, flags e memória narrativa.
2. **37 cutscenes jogáveis**: prólogo de sete capítulos e cenas anteriores às 30 decisões, com diálogos, estética animada no CSS, sons sintetizados, avanço e opção de pular.
3. **30 consequências pós-decisão**, apresentadas em tela própria.
4. **9 cenas de retorno contextual** em pontos-chave, nas quais decisões anteriores alteram o diálogo.
5. **8 indicadores de relações** com pessoas relevantes e um dossiê de 13 personagens.
6. **16 conclusões narrativas principais** com regras de elegibilidade e variações por ações anteriores; 1 conclusão por morte. O destino de 7 personagens recebe epílogo específico, condicionado a relacionamentos e decisões.
7. **Diário persistente**, capítulo em andamento, conquistas e memória das decisões.

## Desfechos principais

**Rota de fuga:** O Êxodo da Aurora; O Navio das Pulseiras; Um Lugar para Daniel; A Caravana dos Vivos; A Estrada Vazia; O Resgate Incompleto.

**Rota da verdade:** O Dia em que o Mundo Ouviu; A Verdade Sobrevive; O Eco das Mentiras; Duas Vozes, Um Sinal; A Última Testemunha.

**Rota da reconstrução:** Uma Cidade sem Donos; Ferro, Água e Esperança; A Fortaleza Silenciosa; A Cura não É uma Ordem; As Últimas Luzes.

**Derrota:** Porto Cinza Cobrou um Preço (morte por ferimentos ou infecção).

## Mecânicas existentes preservadas

Exploração Canvas 2D, ruas, prédios, caches, NPCs, hordas, combate, inventário, medidores de saúde/fome/sede/infecção, experiência e conquistas, ciclo diário, salvamento local, migração do salvamento V4.0, login e cloud save quando configurados, salas WebSocket para até 4 usuários com votações coletivas.

## Fora de escopo e próximos limites técnicos

- As cutscenes não são filmes/renderizações 3D nem têm dublagem gravada.
- Narrativa principal é sequencial, mas as escolhas causam ramificações em cenas de retorno, relacionamentos, recursos, epílogos e diferentes finais. Não há 90 missões distintas, apenas **90 alternativas em 30 missões**.
- O combate cooperativo não é autoritativo do lado do servidor.
- Não há streaming de grande mundo, veículos controláveis, interiores 3D, narração TTS, IA generativa ou áudio gravado de atores.
- Salvos online e salas de jogadores dependem de publicação/validação em uma conta Cloudflare real.
