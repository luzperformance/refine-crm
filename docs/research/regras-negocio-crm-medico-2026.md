# Regras de negócio — CRM médico operacional 2026

## Regras de fonte visual

- A única fonte visual do CRM é o `DESIGN.md` do repo `luzperformance/appsite`.
- Nenhuma decisão de cor, tipografia, card, botão, espaçamento, sombra ou linguagem visual deve ser inferida de outra fonte.
- Quando o `DESIGN.md` não estiver disponível, decisões visuais ficam bloqueadas.

## Regras de lead

- Todo contato comercial começa como lead.
- Todo lead deve ter origem registrada quando conhecida.
- Todo lead deve ter responsável ou fila operacional.
- Todo lead ativo deve ter próxima ação.
- Lead sem próxima ação é risco operacional.

## Regras de lifecycle

- A jornada mínima é: captura → qualificação → avaliação médica pendente/concluída → proposta → contrato ativo → renovação ou perda/inatividade.
- Nenhum lead deve virar contrato ativo sem etapa humana de avaliação/validação quando houver demanda médica.
- Mudanças de estágio devem registrar data, responsável e motivo quando aplicável.

## Regras de contrato

- Tipos oficiais iniciais: mensal, semestral e anual.
- Todo contrato deve ter status, data de início, data de renovação e responsável.
- Contrato ativo precisa de follow-up futuro.
- Renovação deve gerar alerta antes do vencimento.
- Receita deve ser agregável por tipo de contrato e origem do lead.

## Regras de follow-up

- Toda oportunidade aberta deve ter próxima ação com data.
- Follow-up pode ser comercial, operacional ou de renovação.
- Follow-up não pode sugerir conduta clínica individualizada.
- Follow-ups vencidos devem aparecer em dashboard/alerta.

## Regras de atribuição

- Blog, Ads, indicação, orgânico e WhatsApp/DM são canais distintos.
- UTM e página de entrada devem ser preservadas quando disponíveis.
- Atribuição acompanha lead → deal → contrato → receita.
- Atribuição é usada para gestão comercial e marketing, não para decisão clínica.

## Regras LGPD/compliance

- Coletar apenas dados necessários para a finalidade operacional.
- Dados sensíveis exigem finalidade clara e consentimento quando aplicável.
- CRM não deve armazenar prontuário completo.
- CRM não automatiza diagnóstico, prescrição, dose ou ajuste terapêutico.
- Qualquer decisão clínica deve ser feita por humano habilitado fora da automação do CRM.
- Logs/auditoria devem registrar alterações relevantes em consentimento, contrato e estágio.

## Regras de aceite da issue #1

A issue #1 é considerada executada em nível de roadmap quando estes conceitos estiverem documentados e prontos para virar fatias técnicas:

- jornada completa lead → renovação;
- contratos mensal/semestral/anual;
- atribuição Blog/Ads ligada a receita;
- fronteira explícita contra automação clínica;
- proteção de dado sensível;
- lista de fatias demoáveis;
- fonte visual única: `DESIGN.md` do `luzperformance/appsite`.
