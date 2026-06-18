export type CrmSectionKey =
  | "leads"
  | "pipeline"
  | "contracts"
  | "tasks"
  | "blog-attribution"
  | "ads-attribution"
  | "compliance";

export type CrmSection = {
  key: CrmSectionKey;
  title: string;
  path: string;
  eyebrow: string;
  description: string;
  nextAction: string;
  bullets: string[];
};

export const crmSections: CrmSection[] = [
  {
    key: "leads",
    title: "Leads",
    path: "/leads",
    eyebrow: "Captura e qualificação",
    description:
      "Central para contatos vindos de Blog, Ads, indicação, WhatsApp/DM e orgânico antes de qualquer proposta ou avaliação médica.",
    nextAction:
      "Próximo passo: conectar formulários e registrar origem, responsável e próxima ação para cada lead.",
    bullets: ["Origem", "Responsável", "Próxima ação"],
  },
  {
    key: "pipeline",
    title: "Pipeline",
    path: "/pipeline",
    eyebrow: "Jornada lead → contrato",
    description:
      "Visão operacional das etapas captura, qualificação, avaliação humana, proposta, contrato ativo, renovação e perda/inatividade.",
    nextAction:
      "Próximo passo: modelar estágios e motivos de avanço/perda sem automatizar conduta clínica.",
    bullets: ["Estágios", "Deals", "Motivos"],
  },
  {
    key: "contracts",
    title: "Contratos",
    path: "/contracts",
    eyebrow: "Mensal, semestral e anual",
    description:
      "Contratos são conceitos de primeira classe para acompanhar início, vigência, receita, status e janela de renovação.",
    nextAction:
      "Próximo passo: criar contrato com tipo, data de início, renovação e follow-up futuro obrigatório.",
    bullets: ["Mensal", "Semestral", "Anual"],
  },
  {
    key: "tasks",
    title: "Tarefas",
    path: "/tasks",
    eyebrow: "Follow-up operacional",
    description:
      "Fila de próximas ações comerciais, operacionais e de renovação para evitar leads ou contratos ativos sem dono.",
    nextAction:
      "Próximo passo: substituir o kanban demo por tarefas ligadas a lead, deal, contrato e renovação.",
    bullets: ["Vencidas", "Hoje", "Renovação"],
  },
  {
    key: "blog-attribution",
    title: "Blog Attribution",
    path: "/attribution/blog",
    eyebrow: "Conteúdo → receita",
    description:
      "Liga artigos, páginas e UTMs do Blog a leads, deals, contratos e receita agregada sem inferir decisão clínica.",
    nextAction:
      "Próximo passo: preservar página de entrada, UTM e primeiro conteúdo associado ao lead.",
    bullets: ["Artigo", "UTM", "Receita"],
  },
  {
    key: "ads-attribution",
    title: "Ads Attribution",
    path: "/attribution/ads",
    eyebrow: "Campanha → contrato",
    description:
      "Conecta campanha, conjunto, criativo e landing page ao resultado comercial para leitura real de CAC e receita.",
    nextAction:
      "Próximo passo: normalizar UTMs e associar campanha ao deal e ao contrato quando houver conversão.",
    bullets: ["Campanha", "Criativo", "CAC"],
  },
  {
    key: "compliance",
    title: "Compliance",
    path: "/compliance",
    eyebrow: "LGPD e fronteira médica",
    description:
      "Área para consentimento, finalidade, minimização de dados sensíveis e auditoria do limite CRM operacional vs prontuário.",
    nextAction:
      "Próximo passo: registrar consentimentos e bloquear automações de diagnóstico, prescrição ou dose.",
    bullets: ["Consentimento", "Minimização", "Auditoria"],
  },
];

export const getCrmSection = (key: CrmSectionKey) => {
  const section = crmSections.find((item) => item.key === key);

  if (!section) {
    throw new Error(`Unknown CRM section: ${key}`);
  }

  return section;
};
