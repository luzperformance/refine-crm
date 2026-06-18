import type { InMemoryCrmRepository } from "./in-memory-crm-repository";
import { dealStages, type Deal, type DealStage } from "./types";

export const dealStageLabels: Record<DealStage, string> = {
  new_lead: "Novo lead",
  qualification: "Qualificação",
  medical_review_pending: "Avaliação médica pendente",
  medical_review_completed: "Avaliação médica concluída",
  proposal_requested: "Proposta solicitada",
  proposal_sent: "Proposta enviada",
  negotiation: "Negociação",
  payment_pending: "Pagamento pendente",
  won: "Ganho",
  contract_active: "Contrato ativo",
  renewal_due: "Renovação pendente",
  renewed: "Renovado",
  lost: "Perdido/cancelado",
};

export interface DealStageGroup {
  stage: DealStage;
  label: string;
  deals: Deal[];
}

export interface MoveDealThroughPipelineInput {
  dealId: string;
  toStage: DealStage;
  actorId: string;
  lossReason?: string;
}

export const groupDealsByStage = (deals: Deal[]): DealStageGroup[] => {
  return dealStages.map((stage) => ({
    stage,
    label: dealStageLabels[stage],
    deals: deals.filter((deal) => deal.stage === stage),
  }));
};

export const listPipelineDeals = (
  repository: InMemoryCrmRepository,
): DealStageGroup[] => {
  return groupDealsByStage(repository.listDeals());
};

export const moveDealThroughPipeline = (
  repository: InMemoryCrmRepository,
  input: MoveDealThroughPipelineInput,
): Deal => {
  return repository.updateDealStage(input.dealId, input.toStage, {
    actorId: input.actorId,
    lossReason: input.lossReason,
  });
};
