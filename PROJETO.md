# PROJETO CONSOLIDADO — ÚLTIMA TRANSMISSÃO V11.0

## Identidade

**Título:** ÚLTIMA TRANSMISSÃO — MUNDO VIVO.  
**Ambientação:** Porto Cinza, cidade fictícia em quarentena durante um surto zumbi.  
**Protagonista:** Clara Mendes, socorrista em busca do irmão Daniel.  
**Plataforma:** PC e dispositivos móveis, diretamente no navegador.  
**Formato:** jogo solo primeiro; backend opcional para contas e salas experimentais.

## Campanha herdada e consolidada

15 capítulos: (1) Ruído Branco; (2) A Promessa do Resgate; (3) Ferro e Cinzas; (4) O Abrigo dos Nomes; (5) A Raiz da Praga; (6) A Cidade se Levanta; (7) A Última Escolha; (8–15) o arco de A Saga das Vozes. O roteiro completo, suas 78 missões e as cenas existentes estão em `story.js`, `expansion.js` e `game.js`.

Clara precisa encontrar Daniel, proteger aliados, revelar a participação da Helix no surto e decidir o futuro dos bairros isolados. Nina e Alice lidam com o reencontro; Sofia enfrenta a responsabilidade médica; Raul decide quem terá sua confiança; Helena e Gabriel respondem pelas antigas ordens; Mara testemunha contra o pai; Júlia e Olívia exigem que a família Mendes respeite sua autonomia; Bento luta para preservar os nomes. A campanha mantém personagens, flashbacks e efeitos narrativos herdados da V6.0.

## Novas mecânicas da V11

1. **Missões no mundo:** antes das decisões, são necessários objetivos concretos. O motor utiliza oito arquétipos de tarefas para distribuir atividades às 78 missões: pista, resgate, defesa, reparo, furtividade, transmissão, eliminação e abertura de rota. As etapas permanecem registradas no salvamento.
2. **Ambientes exploráveis:** 12 interiores com objetos examináveis, documentos, fotografias e suprimentos. Os objetos coletados persistem.
3. **Memórias exploráveis:** os 16 flashbacks narrativos da V6 agora levam a uma área de lembrança com três objetos interativos antes da escolha de interpretação.
4. **Caminhos opcionais:** oito ocorrências secundárias de consequências próprias e efeitos nos vínculos/recursos, além de registros no diário.
5. **Companheiros:** Sofia, Nina, Raul e Helena; a possibilidade de recrutamento depende das relações. Aliados seguem Clara, atacam infectados próximos e podem precisar de cuidados.
6. **Combate e sobrevivência:** zumbis de três categorias, tiros barulhentos, furtividade, esquiva, quatro receitas de fabricação, barricadas, curativos e iscas.
7. **Mundo responsivo:** minimapa, chuva estilizada, locais marcados por decisões, sinalização de interiores e eventos, e mudanças em alguns elementos visuais do ambiente.
8. **Apresentação:** cenas de diálogo reforçadas por animações e figuras estilizadas, ajuda atualizada, controle touch, notificações fora da área principal do objetivo.
9. **Persistência:** chave própria V11 e migração de salvamentos anteriores.
10. **Finalizações:** manutenção dos desfechos anteriores, com duas condições especiais relacionadas à exploração e aos eventos paralelos.

## Decisões e consequências

As escolhas alteram reputações, recursos, flags e epílogos. Algumas decisões do hospital, abrigo, escola e laboratório são refletidas no cenário. Eventos paralelos também geram flags que participam de certos finais. O motor narrativo principal **continua sequencial**; não existe um grafo completo de 78 campanhas diferentes.

## Arquitetura

- **Frontend:** `index.html`, `styles.css`, `story.js`, `expansion.js`, `game.js`. Engine Canvas 2D, interface DOM/CSS, áudio com Web Audio API, `localStorage` para progresso solo.
- **Build:** `build.mjs` gera os cinco arquivos públicos sob `dist/`.
- **Hospedagem:** Cloudflare Pages para frontend solo, conectado a repositório GitHub.
- **Backend opcional:** Cloudflare Workers (`worker.js`), D1 (`schema.sql`) e Durable Objects para presença e voto coletivo.
- **Conta/sessões:** código backend herdado da V6.0, que exige infraestrutura real, credenciais e verificação antes do uso público.
- **Cooperativo:** o cliente compartilha posições e decisões de história. O estado de combate não é autoritativo no servidor e a camada multiplayer não foi homologada em produção.

## Ações de qualidade ainda necessárias para 10/10 efetivo

- Testes humanos do início ao fim, com diferentes perfis e dispositivos.
- Teste de cada um dos finais possíveis e dos caminhos condicionais complexos.
- Arte autoral avançada para cenários e personagens, animações completas, dublagem e trilha sonora.
- IA de NPCs com rotinas sofisticadas, missões realmente únicas (as atuais usam oito arquétipos), campanha não linear de grande amplitude.
- Combate e inventário autoritativos sincronizados, reconexão, anti-trapaça e segurança de multiplayer.
- Implantação e verificação de login/salvamento no D1 e de Durable Objects em conta real, observabilidade e testes de carga.
- Validação de acessibilidade, desempenho em aparelhos antigos e compatibilidade ampla com navegadores.

**Não se atribui nota de qualidade 10/10 sem evidência de testes abrangentes com jogadores.** V11.0 é a consolidação funcional executável do protótipo, não um lançamento comercial totalmente homologado.
