# ADR 0001 — CRM médico operacional, não prontuário

## Status

Accepted

## Contexto

A LuzPerformance precisa de um CRM para gerenciar leads, pipeline, contratos, follow-ups, renovações, atribuição de marketing e indicadores comerciais.

Como a operação envolve medicina hormonal/performance, existe risco de o CRM acumular dados sensíveis ou ser usado indevidamente como prontuário ou ferramenta de conduta clínica.

Também existe risco de o CRM virar uma interface administrativa genérica, visualmente desconectada da LuzPerformance.

## Decisão

O `refine-crm` será evoluído como CRM médico-operacional, não como prontuário eletrônico.

O sistema deve organizar relacionamento, operação e receita. Ele não deve diagnosticar, prescrever, sugerir dose, ajustar tratamento ou automatizar conduta individualizada.

A identidade visual do CRM deve ser derivada exclusivamente do `DESIGN.md` do repo `luzperformance/appsite`.

## Consequências

- Entidades centrais devem ser `Lead`, `Deal`, `Contract`, `Attribution`, `FollowUp`, `Consent` e `ComplianceEvent`.
- Dados clínicos profundos ficam fora do CRM ou em integração futura explicitamente governada.
- Dashboards priorizam funil, receita, origem, follow-up e renovação.
- Qualquer automação deve parar antes de decisão clínica.
- Campos sensíveis exigem minimização, finalidade, consentimento e auditoria.
- A evolução do produto deve ocorrer em fatias demoáveis e revisáveis.
- UI/tema devem seguir apenas o `DESIGN.md` do appsite; se ele estiver indisponível, decisões visuais ficam bloqueadas.

## Alternativas consideradas

### Usar o CRM como prontuário leve

Rejeitado. Mistura operação comercial com dado clínico sensível, aumenta risco LGPD e cria ambiguidade de responsabilidade médica.

### Criar sistema clínico completo agora

Rejeitado. Escopo maior que a necessidade inicial. O primeiro produto deve resolver operação comercial/relacionamento e manter fronteira clara para integrações futuras.

### Criar visual próprio para o CRM

Rejeitado. A LuzPerformance já tem fonte visual no appsite. Criar identidade paralela aumenta inconsistência e retrabalho.

### CRM operacional com fronteira médica explícita e design herdado do appsite

Aceito. Entrega valor imediato para gestão do funil, reduz risco clínico/LGPD e mantém continuidade visual com a marca.
