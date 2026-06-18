# CONTEXT — CRM médico-operacional LuzPerformance

## Domínio

Este repo oficial é `luzperformance/luzperformance-crm`, derivado do `refine-crm`, e transforma a base em um CRM médico-operacional para a LuzPerformance: funil, relacionamento, contratos, follow-ups, renovações, atribuição de marketing e governança LGPD.

O sistema não é prontuário, não é motor de decisão clínica e não substitui avaliação médica.

## Fonte visual

A única fonte visual autorizada para o CRM é o `DESIGN.md` do repo `luzperformance/appsite`.

O CRM deve herdar a identidade LuzPerformance a partir desse documento: dark mode médico-premium, navy, gold, tipografia e componentes descritos ali. Se o arquivo não estiver disponível em um ambiente, decisões visuais ficam bloqueadas até consulta ao `DESIGN.md`.

## Norte do produto

Dar visibilidade tipo HubSpot sobre a jornada completa:

1. captura do lead;
2. qualificação;
3. avaliação médica pendente/concluída por humano;
4. proposta comercial;
5. contrato ativo;
6. acompanhamento operacional;
7. renovação;
8. perda/inatividade quando aplicável.

## Vocabulário central

- **Lead** — pessoa/contato que entrou por Blog, Ads, indicação, WhatsApp, Instagram, orgânico ou outro canal.
- **Lifecycle stage** — etapa operacional da jornada lead → contrato → renovação.
- **Deal** — oportunidade comercial ligada a um lead/contato.
- **Contract** — vínculo comercial de acompanhamento; tipos iniciais: mensal, semestral e anual.
- **Attribution** — origem/campanha/conteúdo que trouxe ou influenciou o lead/deal.
- **Follow-up** — próxima ação operacional com responsável e data.
- **Renewal** — janela de continuidade/renovação do contrato.
- **Compliance boundary** — limite que impede o CRM de armazenar ou automatizar conduta clínica indevida.

## Pode existir no CRM

- origem do lead e UTMs;
- estágio do funil;
- responsável;
- próxima ação;
- status comercial;
- tipo, início e renovação de contrato;
- tarefas e follow-ups;
- consentimentos operacionais;
- indicadores agregados de marketing, venda e retenção.

## Não deve existir no CRM

- diagnóstico automatizado;
- sugestão de prescrição ou dose;
- conduta médica individualizada;
- prontuário completo;
- promessa de resultado estético, hormonal, performance ou saúde;
- dado sensível sem finalidade, consentimento e minimização.

## Fatias demoáveis

A implementação deve avançar em fatias pequenas:

1. documentação de domínio e decisão arquitetural;
2. modelo de entidades CRM médico;
3. tema visual derivado exclusivamente do `DESIGN.md` do appsite;
4. tela de pipeline com lead/deal/contract/follow-up;
5. atribuição Blog/Ads conectada a lead/deal/receita;
6. dashboard de receita, origem, contrato e renovação;
7. trilha de compliance/consentimento.
