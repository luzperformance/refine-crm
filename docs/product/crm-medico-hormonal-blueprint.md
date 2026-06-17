# Blueprint — CRM médico hormonal LuzPerformance

## Objetivo

Transformar o `refine-crm` em um CRM médico-operacional real para a LuzPerformance, com visibilidade de funil, contratos, follow-ups, renovações, atribuição Blog/Ads e governança LGPD.

O produto deve organizar a operação comercial e de relacionamento sem virar prontuário e sem automatizar decisão clínica.

## Fonte visual obrigatória

Toda decisão visual deste blueprint deve usar apenas o `DESIGN.md` do repositório `luzperformance/appsite` como fonte de verdade.

Não usar screenshots, HTML renderizado, memória visual, gosto pessoal, tema genérico do Refine/Ant Design ou inferências externas como fonte de design.

### Tokens e linguagem visual extraídos do `DESIGN.md` do appsite

- Vibe: médico moderno, alta performance, sofisticado, confiável e dark.
- Tema: dark mode como base exclusiva/primária.
- Conceito: redução de danos e jogo longo traduzidos em UI séria, limpa e premium.
- Tipografia de headings/display: `Orbitron`, pesos 400, 500, 600 e 700.
- Tipografia de corpo/texto: `Montserrat`, pesos 400, 500, 600 e 700.
- Navy/base: `#0d1f33`.
- Navy hover/surface secundária: `#1a3a5c`.
- Navy cards: `#142a42`.
- Gold CTA/acento: `#c9a44a`.
- Gold hover: `#d4b55a`.
- Gold borda/subtle: `#b8933a`.
- Texto primário: `#ffffff`.
- Texto secundário: `#e0e0e0`.
- Texto muted/disabled: `#a0a0a0`.
- Botões primários: pill-shaped, gold background, navy text, uppercase, tracking-wider e sombra gold sutil.
- Botões outline: pill-shaped, transparent background, gold border.
- Cards/surfaces: glassmorphism ou navy com borda gold `border-[#c9a44a]/30`, `rounded-xl` ou `rounded-2xl`.
- Divisores: wave divider branco entre seções dark quando fizer sentido.
- Animações: floating sutil, pulse glow e fade-in suave.
- Links: underline/borda gold animada no hover.

### Implicação para o CRM

- O CRM deve parecer continuação operacional da LuzPerformance, não um admin genérico.
- Padrões do Refine/Ant Design podem ser usados apenas como estrutura funcional, desde que a camada visual respeite o `DESIGN.md` do appsite.
- Em conflito entre Refine/Ant Design e `DESIGN.md`, vence o `DESIGN.md` do appsite.

## Jornada lead → renovação

| Etapa | Objetivo | Próxima ação obrigatória | Limite médico |
| --- | --- | --- | --- |
| Captura do lead | Registrar entrada, origem e interesse | Criar tarefa de qualificação | Sem triagem clínica automatizada |
| Qualificação | Entender contexto comercial e aderência | Encaminhar ou descartar com motivo | Não diagnosticar nem prometer resultado |
| Avaliação médica pendente | Sinalizar necessidade de avaliação humana | Agendar/revisar com médico | Conduta só por médico |
| Proposta | Formalizar plano mensal/semestral/anual | Acompanhar aceite/pagamento | Proposta não é prescrição |
| Contrato ativo | Acompanhar rotina operacional | Manter follow-up futuro | CRM não é prontuário |
| Renovação | Abrir janela de continuidade | Contatar antes do vencimento | Renovação não ajusta tratamento automaticamente |
| Perdido/inativo | Registrar motivo e aprendizado | Definir se pode retomar | Sem pressão indevida |

## Contratos de primeira classe

### Mensal

- Renovação curta.
- Exige follow-up próximo.
- Maior risco de churn.
- Métrica principal: continuidade e próxima ação registrada.

### Semestral

- Renovação a cada 6 meses.
- Bom equilíbrio entre previsibilidade e revisão.
- Métrica principal: janela de renovação aberta no prazo.

### Anual

- Renovação a cada 12 meses.
- Maior previsibilidade operacional.
- Métrica principal: relacionamento ativo antes da renovação.

## Atribuição Blog/Ads

Cada lead/deal deve poder carregar:

- canal de origem: Blog, Ads, indicação, orgânico, WhatsApp/DM;
- campanha;
- artigo/página/landing page;
- UTM source/medium/campaign/content;
- primeira interação;
- última interação antes da conversão;
- receita associada quando houver contrato.

Atribuição serve para gestão de marketing, venda e receita. Não serve para inferir diagnóstico ou conduta.

## Dashboards esperados

- leads por origem;
- conversão por etapa;
- deals por status;
- receita por contrato;
- receita por Blog/Ads/campanha;
- renovações próximas;
- contratos ativos sem próxima ação;
- pendências de consentimento/compliance.

## Guardrails de produto

- Bloquear automação de diagnóstico, prescrição e dose.
- Minimizar dados sensíveis.
- Separar CRM de prontuário.
- Registrar consentimento e finalidade quando houver dado sensível.
- Exigir revisão humana para qualquer decisão médica.

## Fatias demoáveis

1. Documentação canônica do domínio e ADR.
2. Tema visual derivado exclusivamente do `DESIGN.md` do appsite.
3. Modelo de dados lead/deal/contract/attribution/follow-up/compliance.
4. Pipeline operacional com contratos.
5. Atribuição Blog/Ads conectada a receita.
6. Dashboard de funil, receita e renovação.
7. Auditoria/consentimento e alertas LGPD.
