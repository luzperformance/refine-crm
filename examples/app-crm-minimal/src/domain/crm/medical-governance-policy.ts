import type { AuditLog } from "./types";

export type MedicalGovernanceFlag =
  | "contains_health_sensitive_data"
  | "requires_medical_review"
  | "ads_export_blocked";

export type SensitiveHealthTopicCategory =
  | "symptoms"
  | "exams"
  | "hormones"
  | "medications"
  | "dose"
  | "side_effects"
  | "adverse_events";

export interface MedicalGovernancePolicyInput {
  content?: string | string[];
  metadata?: AuditLog["metadata"];
  auditLog?: Pick<AuditLog, "action" | "entityType" | "metadata">;
}

export interface MedicalGovernancePolicyResult {
  containsHealthSensitiveData: boolean;
  requiresMedicalReview: boolean;
  adsExportBlocked: boolean;
  reviewStatus: "review_not_required" | "medical_review_required";
  flags: MedicalGovernanceFlag[];
  matchedCategories: SensitiveHealthTopicCategory[];
}

type TopicMatcher = {
  category: SensitiveHealthTopicCategory;
  pattern: RegExp;
};

const topicMatchers: TopicMatcher[] = [
  {
    category: "symptoms",
    pattern:
      /\b(sintoma|sintomas|dor|fadiga|cansa[cç]o|tontura|enjoo|n[aá]usea|ins[oô]nia|libido|ansiedade|depress[aã]o|palpita[cç][aã]o|symptom|symptoms|pain|fatigue|dizziness)\b/i,
  },
  {
    category: "exams",
    pattern:
      /\b(exame|exames|laborat[oó]rio|hemograma|glicemia|insulina|testosterona total|testosterona livre|estradiol|prolactina|tsh|tgo|tgp|creatinina|hdl|ldl|exam|exams|lab|labs|bloodwork)\b/i,
  },
  {
    category: "hormones",
    pattern:
      /\b(horm[oô]nio|hormonal|testosterona|estradiol|estrog[eê]nio|progesterona|nandrolona|oxandrolona|anabolizante|trt|gh|hcg|hormone|hormones|testosterone)\b/i,
  },
  {
    category: "medications",
    pattern:
      /\b(medica[cç][aã]o|medicamento|rem[eé]dio|f[aá]rmaco|finasterida|dutasterida|metformina|semaglutida|tirzepatida|anastrozol|tamoxifeno|clomifeno|medication|medicine|drug|prescription)\b/i,
  },
  {
    category: "dose",
    pattern:
      /\b(dose|dosagem|mg|mcg|ui|ml\/semana|mg\/semana|posologia|doseamento|dosage)\b/i,
  },
  {
    category: "side_effects",
    pattern:
      /\b(efeito colateral|efeitos colaterais|colateral|rea[cç][aã]o|acne|queda de cabelo|ginecomastia|side effect|side effects|reaction)\b/i,
  },
  {
    category: "adverse_events",
    pattern:
      /\b(evento adverso|eventos adversos|rea[cç][aã]o adversa|emerg[eê]ncia|internou|hospital|adverse event|adverse events|serious adverse)\b/i,
  },
];

const explicitGovernanceFlagKeys = new Map<string, MedicalGovernanceFlag>([
  ["containshealthsensitivedata", "contains_health_sensitive_data"],
  ["requiresmedicalreview", "requires_medical_review"],
  ["adsexportblocked", "ads_export_blocked"],
]);

const sensitiveMetadataKeyCategories = new Map<
  string,
  SensitiveHealthTopicCategory
>([
  ["clinicalnote", "symptoms"],
  ["clinicalnotes", "symptoms"],
  ["symptom", "symptoms"],
  ["symptoms", "symptoms"],
  ["exam", "exams"],
  ["exams", "exams"],
  ["examresult", "exams"],
  ["examresults", "exams"],
  ["hormone", "hormones"],
  ["hormones", "hormones"],
  ["medication", "medications"],
  ["medications", "medications"],
  ["dose", "dose"],
  ["dosage", "dose"],
  ["sideeffect", "side_effects"],
  ["sideeffects", "side_effects"],
  ["adverseevent", "adverse_events"],
  ["adverseevents", "adverse_events"],
]);

export const evaluateMedicalGovernancePolicy = (
  input: MedicalGovernancePolicyInput,
): MedicalGovernancePolicyResult => {
  const matchedCategories = new Set<SensitiveHealthTopicCategory>();
  const explicitFlags = new Set<MedicalGovernanceFlag>();
  const textCorpus = collectTextCorpus(input);

  for (const text of textCorpus) {
    for (const matcher of topicMatchers) {
      if (matcher.pattern.test(text)) {
        matchedCategories.add(matcher.category);
      }
    }
  }

  for (const [key, value] of Object.entries(input.metadata ?? {})) {
    const normalizedKey = normalizeGovernanceKey(key);
    const explicitFlag = explicitGovernanceFlagKeys.get(normalizedKey);

    if (explicitFlag && value === true) {
      explicitFlags.add(explicitFlag);
    }

    const metadataKeyCategory = sensitiveMetadataKeyCategories.get(normalizedKey);

    if (metadataKeyCategory) {
      matchedCategories.add(metadataKeyCategory);
    }
  }

  const containsHealthSensitiveData =
    matchedCategories.size > 0 ||
    explicitFlags.has("contains_health_sensitive_data") ||
    explicitFlags.has("requires_medical_review") ||
    explicitFlags.has("ads_export_blocked");
  const requiresMedicalReview =
    containsHealthSensitiveData || explicitFlags.has("requires_medical_review");
  const adsExportBlocked =
    requiresMedicalReview || explicitFlags.has("ads_export_blocked");
  const flags: MedicalGovernanceFlag[] = [];

  if (containsHealthSensitiveData) {
    flags.push("contains_health_sensitive_data");
  }

  if (requiresMedicalReview) {
    flags.push("requires_medical_review");
  }

  if (adsExportBlocked) {
    flags.push("ads_export_blocked");
  }

  return {
    containsHealthSensitiveData,
    requiresMedicalReview,
    adsExportBlocked,
    reviewStatus: requiresMedicalReview
      ? "medical_review_required"
      : "review_not_required",
    flags,
    matchedCategories: Array.from(matchedCategories),
  };
};

export const buildMedicalGovernanceAuditMetadata = (
  input: MedicalGovernancePolicyInput,
): NonNullable<AuditLog["metadata"]> => {
  const result = evaluateMedicalGovernancePolicy(input);

  if (!result.requiresMedicalReview) {
    return {};
  }

  return {
    containsHealthSensitiveData: result.containsHealthSensitiveData,
    requiresMedicalReview: result.requiresMedicalReview,
    adsExportBlocked: result.adsExportBlocked,
    medicalGovernanceFlags: result.flags.join(","),
    sensitiveTopicCategories: result.matchedCategories.join(","),
  };
};

const collectTextCorpus = (input: MedicalGovernancePolicyInput): string[] => {
  const content = Array.isArray(input.content)
    ? input.content
    : input.content
      ? [input.content]
      : [];
  const metadataValues = Object.values(input.metadata ?? {}).flatMap((value) =>
    typeof value === "string" ? [value] : [],
  );
  const auditMetadataValues = Object.values(input.auditLog?.metadata ?? {}).flatMap(
    (value) => (typeof value === "string" ? [value] : []),
  );

  return [...content, ...metadataValues, ...auditMetadataValues].filter(Boolean);
};

const normalizeGovernanceKey = (key: string): string =>
  key.toLowerCase().replace(/[^a-z]/g, "");
