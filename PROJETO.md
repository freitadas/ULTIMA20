# ÚLTIMA TRANSMISSÃO — documento do projeto

**Gênero:** aventura narrativa de apocalipse zumbi, escolhas com consequências, gerenciamento leve de sobrevivência.  
**Público:** jogadores de navegador interessados em suspense, histórias ramificadas e campanhas curtas.  
**Plataformas:** navegador desktop e celular; interface em português do Brasil.  
**Modelo de acesso V1.0:** jogo gratuito, solo, sem cadastro e sem compras.

## 1. Identidade e premissa

**Nome:** ÚLTIMA TRANSMISSÃO.  
**Temporada 1:** A Queda de Porto Cinza.  
**Capítulo 1:** Sinal Perdido.  
**Protagonista:** Clara, socorrista.  
**Personagens:** Nina (adolescente), Dra. Sofia (coordenadora do abrigo), Posto Horizonte (equipe externa de resgate).  
**Conflito:** a cidade isolada entrou em colapso e uma torre de rádio ainda pode pedir socorro. A sobrevivência individual entra em choque com a responsabilidade coletiva.

Tom: suspense, dilemas morais, escassez, vínculos pessoais. O objetivo não é exterminar hordas, mas sobreviver, decidir sob pressão e administrar consequências.

## 2. Pilares de design

1. **Escolhas significativas:** cada decisão altera recursos, estado do mundo, disponibilidade de ações, confiança ou final.
2. **Escassez compreensível:** saúde, infecção, barulho, alimentação, kits, ferramentas e munição visíveis durante toda a partida.
3. **História reaproveitável:** cenas e escolhas em objetos de dados; novos capítulos não precisam reescrever o motor.
4. **Partidas curtas:** o primeiro capítulo deve ser concluível em uma sessão, com rotas alternativas e desfechos distintos.
5. **Transparência:** custo e requisitos das escolhas aparecem antes da decisão.

## 3. Mecânicas V1.0 — implementadas

- História interativa por cenas e decisões; atalhos de teclado 1–4.
- Sete objetivos narrativos (missões numeradas 01–07) em seis regiões.
- Rotas alternativas e escolhas bloqueadas de acordo com recursos e descobertas.
- Saúde (0 a 100); infecção (0 a 100); barulho/ameaça (0 a 100).
- Inventário: alimentos, kits médicos, ferramentas e munição.
- Uso de kits médicos para recuperar saúde e reduzir infecção.
- Ações ruidosas com ameaça a partir de 75 provocam ataques adicionais.
- Bandeiras narrativas persistidas: código de emergência, Nina resgatada, abrigo ajudado, barricadas reforçadas, feridos tratados, energia restaurada, sinal estabelecido ou instável.
- Relógio interno e registro cronológico de decisões.
- Sete epílogos possíveis, incluindo um de derrota, com registro local de epílogos descobertos.
- Salvamento automático após cada decisão e retomada no mesmo navegador.
- Painel com mapa ilustrativo, mochila, diário, estado vital e objetivo atual.
- Layout adaptado a desktop e celular; sem bibliotecas externas e sem conexão obrigatória.

**Fora da V1:** mundo aberto navegável por WASD, combate em tempo real, geração procedural, cadastro, multiplayer, sincronização entre dispositivos, trilha sonora, missões diárias e compras. Nenhum desses recursos é anunciado como existente no protótipo.

## 4. Estrutura do capítulo inicial

| Missão | Região | Decisão-chave |
|---|---|---|
| 01 · A Ruptura | Apartamento | Recolher kit, descobrir frequência ou sair depressa |
| 02 · Avenida dos Ecos | Avenida | Resgatar Nina, coletar itens ou fugir |
| 03 · Remédios para o Amanhã | Farmácia | Invadir, negociar, arriscar o depósito ou seguir |
| 04 · O Abrigo | Ginásio | Compartilhar recursos, reforçar defesas ou preservar suprimentos |
| 05 · A Última Centelha | Subestação | Restaurar energia ou assumir sinal instável |
| 06 · Frequência Morta | Torre | Entrar na torre e escolher como transmitir |
| 07 · A Escolha Final | Torre/Praça | Evacuar o grupo, priorizar Nina ou fugir |

Desfechos: **Ainda existe amanhã**, **O preço de não desistir**, **A promessa cumprida**, **Uma voz só**, **A noite não terminou**, **Fora do mapa**, **O último chamado**.

## 5. Interface — V1.0

- Tela de apresentação: nova campanha, continuar campanha, como jogar.
- Cabeçalho: logo, capítulo, dia/hora, status de salvamento, ajuda e menu.
- Coluna principal: localização, arte CSS, narração, fala de personagens, escolhas e custos.
- Barra lateral: saúde, infecção, ameaça, recursos, confiança e objetivo.
- Abas: mapa de progresso, inventário, diário de decisões.
- Tela final: epílogo, quantidade de epílogos encontrados e reiniciar.

Paleta: carvão, verde musgo, amarelo pálido e vermelho de alerta. Fonte do sistema, sem download de fontes; estilo de painel de emergência.

## 6. Plano de versões

| Versão | Resultado esperado | Dependências |
|---|---|---|
| **V1.0 — Sinal Perdido** | Capítulo completo jogável, 7 missões, decisões, recursos, 7 finais, salvamento local | HTML/CSS/JS e Cloudflare Pages |
| **V1.1 — Polimento** | Balanceamento das rotas, revisão de diálogos, acessibilidade, feedback dos testes e áudio opcional | Testes com usuários |
| **V1.2 — Repercussões** | Consequências mais complexas, árvore de decisões, novo painel de relações, estatísticas da partida | Motor narrativo V1 |
| **V2.0 — O Segundo Dia** | Capítulo 2, novas áreas, decisões herdadas da campanha, personagens e finais de temporada | Esquema de progresso versionado |
| **V2.1 — Sobrevivência** | Estados persistentes mais profundos, medos, fadiga, traumas, escassez por cenário | Balanceamento |
| **V3.0 — Comunidade** | Conta opcional, salvamento remoto, conquistas e rankings não competitivos | Workers + D1 + autenticação segura |
| **V3.1 — Escolhas da Comunidade** | Desafios semanais com cenários comuns, percentuais agregados de escolhas | API e privacidade |
| **V4.0 — Histórias compartilhadas** | Campanhas cooperativas assíncronas e decisões por votação (se validadas) | Durable Objects / WebSockets |

Multiplayer só entra quando a campanha solo estiver estável; não é requisito do primeiro lançamento.

## 7. Arquitetura GitHub + Cloudflare

### V1.0 (implantada no ZIP)

```text
GitHub (repositório estático)
    |
    | push/commit
    v
Cloudflare Pages (entrega de HTML/CSS/JS)
    |
    v
Navegador do jogador
    |-- motor narrativo em JavaScript
    |-- interface responsiva
    `-- localStorage (campanha e finais descobertos)
```

**Não há backend na V1.0**, e o progresso salvo no navegador não acompanha o usuário em outros dispositivos. Limpar os dados do site também apaga o progresso. Não publicar tokens ou chaves privadas no repositório.

### V3+ (planejada, não implementada)

```text
Cloudflare Pages (cliente)
    |
Cloudflare Workers (API autenticada e validação)
    |-- D1: perfis, progresso e decisões
    `-- Durable Objects: sessões cooperativas em tempo real, se houver
```

Não confiar em resultados de ranking enviados pelo cliente sem validação no servidor. Aplicar limites de requisição, autenticação segura e migrações de banco.

## 8. Critérios de aceite V1.0

1. Abrir `index.html` e iniciar campanha sem instalação de bibliotecas.
2. Exibir opções bloqueadas quando faltar recurso ou informação.
3. Alterar inventário, saúde, confiança e status após escolhas.
4. Avançar pelas sete missões até um epílogo.
5. Reiniciar e concluir a campanha por rota diferente, chegando a um resultado distinto.
6. Recarregar a página e retomar pelo botão **Continuar história**.
7. Usar a interface com mouse, toque e teclas numéricas.
8. Não haver dependências de serviços externos, login, moedas reais ou anúncios.
9. Publicar no Cloudflare Pages com conteúdo estático a partir da raiz do repositório.

## 9. Backlog além do MVP

- Confirmar duração real da campanha e taxa de conclusão após testes.
- Adicionar efeitos sonoros opcionais com controle de volume e sem reprodução automática.
- Adicionar sistema de capítulos com migração do salvamento local.
- Preparar tradução e adaptação a leitores de tela por revisão especializada.
- Testar maior variabilidade da infecção e da ameaça; nesta versão ambos são indicadores de risco e a infecção pode levar à derrota, mas não existe uma IA de perseguição em tempo real.
- Construir editor de cenas e validador automatizado de árvore narrativa.
