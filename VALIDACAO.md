# Validação — ÚLTIMA TRANSMISSÃO V1.0

## Execução de testes

Data de preparação: 31/10/2026.

Os fluxos de interface foram exercitados em Chromium por automação Playwright, com HTML/CSS/JavaScript carregados diretamente na página de teste. Para testar persistência nesse ambiente isolado, `localStorage` foi simulado em memória. **Não houve teste em uma implantação real da Cloudflare nem verificação de gravação persistente em um domínio HTTP real.**

## Resultados

| Caso | Resultado |
|---|---|
| Tela de título e início de nova campanha | PASSOU |
| Sequência de todas as missões até o epílogo | PASSOU |
| Salvamento e restauração simulada de estado | PASSOU |
| Sete epílogos alcançáveis por percursos distintos | PASSOU |
| Ações com requisitos de recursos e descoberta | PASSOU |
| Uso de kit médico: custo, cura e redução de infecção | PASSOU |
| Contador de epílogos descobertos | PASSOU |
| Menu, modal de ajuda e fechamento por Escape | PASSOU |
| Sem exceções JavaScript durante os fluxos automatizados | PASSOU |
| Layout testado em 1440×900 e 390×844 | PASSOU |
| Estouro horizontal de layout em 390 px | NÃO DETECTADO |
| Publicação real via GitHub/Cloudflare Pages | NÃO EXECUTADA |
| Persistência real após recarga HTTP em navegador comum | PENDENTE DE TESTE MANUAL |

## Testes manuais sugeridos após publicação

1. Iniciar campanha; selecionar a frequência de emergência; recarregar a página; usar **Continuar história**.
2. Seguir até o abrigo sem ferramentas e verificar se a opção **Reforçar barricadas** fica bloqueada.
3. Usar um kit médico e verificar saúde, infecção, inventário e horário.
4. Finalizar a campanha, reiniciar, escolher caminho diferente e verificar contador de finais encontrados.
5. Testar em Android, iPhone, Windows e navegadores principais.

Nenhuma conta remota, servidor de partidas ou multiplayer foi testado ou incluído nesta V1.0.
