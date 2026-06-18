import { useMemo, useState, type CSSProperties } from "react";

import { Link } from "react-router";

import {
  ArrowRightOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";

import {
  createInMemoryCrmRepository,
  createLeadWithAttribution,
  dealStageLabels,
  dealStages,
  evaluateMedicalGovernancePolicy,
  listPipelineDeals,
  moveDealThroughPipeline,
  moveLeadToDeal,
  type DealStage,
  type InMemoryCrmRepository,
} from "@/domain/crm";

import { crmSections, getCrmSection, type CrmSectionKey } from "./sections";

const { Paragraph, Text, Title } = Typography;

const shellBackground: CSSProperties = {
  minHeight: "calc(100vh - 64px)",
  margin: "-32px",
  padding: "40px",
  background:
    "radial-gradient(circle at top left, rgba(201, 164, 74, 0.16), transparent 30%), #0d1f33",
};

const heroCard: CSSProperties = {
  border: "1px solid rgba(201, 164, 74, 0.3)",
  borderRadius: 24,
  background:
    "linear-gradient(135deg, rgba(20, 42, 66, 0.96), rgba(13, 31, 51, 0.96))",
  boxShadow: "0 24px 80px rgba(0, 0, 0, 0.32)",
};

const sectionCard: CSSProperties = {
  height: "100%",
  border: "1px solid rgba(201, 164, 74, 0.24)",
  borderRadius: 20,
  background: "rgba(20, 42, 66, 0.92)",
};

const pipelineColumn: CSSProperties = {
  height: "100%",
  minHeight: 260,
  border: "1px solid rgba(201, 164, 74, 0.2)",
  borderRadius: 18,
  background: "rgba(13, 31, 51, 0.74)",
};

const buildDemoPipelineRepository = () => {
  const repository = createInMemoryCrmRepository({
    clock: () => new Date("2026-06-18T12:00:00.000Z"),
  });

  seedDeal(repository, {
    fullName: "Lead Blog — hipertrofia segura",
    channel: "blog",
    campaign: "artigo-hipertrofia-segura",
    title: "Avaliação inicial + acompanhamento semestral",
    stage: "medical_review_pending",
    valueCents: 600000,
    interest:
      "Lead relatou sintomas e exames; exige revisão médica antes de orientar ou exportar.",
  });
  seedDeal(repository, {
    fullName: "Lead Ads — performance responsável",
    channel: "ads",
    campaign: "avaliacao-performance-responsavel",
    title: "Acompanhamento anual LuzPerformance",
    stage: "proposal_sent",
    valueCents: 1200000,
  });
  seedDeal(repository, {
    fullName: "Indicação — renovação operacional",
    channel: "referral",
    campaign: "indicacao-paciente-ativo",
    title: "Renovação semestral",
    stage: "renewal_due",
    valueCents: 600000,
  });

  return repository;
};

const seedDeal = (
  repository: InMemoryCrmRepository,
  input: {
    fullName: string;
    channel: "blog" | "ads" | "referral";
    campaign: string;
    title: string;
    stage: DealStage;
    valueCents: number;
    interest?: string;
  },
) => {
  const { lead } = createLeadWithAttribution(repository, {
    contact: {
      fullName: input.fullName,
    },
    attribution: {
      channel: input.channel,
      campaign: input.campaign,
    },
    lead: {
      lifecycleStage: "sql",
      interest:
        input.interest ??
        "Consulta comercial com fronteira médica e redução de danos",
    },
  });

  return moveLeadToDeal(repository, lead.id, {
    title: input.title,
    stage: input.stage,
    valueCents: input.valueCents,
  });
};

export const CrmDashboardPage = () => {
  return (
    <main style={shellBackground}>
      <Card style={heroCard} styles={{ body: { padding: 32 } }}>
        <Space direction="vertical" size={18} style={{ maxWidth: 920 }}>
          <Tag color="gold" style={{ width: "fit-content" }}>
            CRM médico-operacional LuzPerformance
          </Tag>
          <Title
            level={1}
            style={{ color: "#ffffff", fontFamily: "Orbitron, sans-serif" }}
          >
            Shell interno para leads, contratos, atribuição e renovação
          </Title>
          <Paragraph style={{ color: "#e0e0e0", fontSize: 16, margin: 0 }}>
            Este CRM organiza a jornada comercial completa sem virar
            prontuário: captura, qualificação, pipeline, contratos mensal,
            semestral e anual, follow-ups, Blog/Ads attribution, dashboards e
            compliance LGPD.
          </Paragraph>
          <Text style={{ color: "#a0a0a0" }}>
            Fronteira permanente: nada aqui automatiza diagnóstico, prescrição,
            dose ou conduta médica individualizada.
          </Text>
        </Space>
      </Card>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {crmSections.map((section) => (
          <Col key={section.key} xs={24} md={12} xl={8}>
            <Card style={sectionCard} styles={{ body: { padding: 24 } }}>
              <Space direction="vertical" size={14} style={{ width: "100%" }}>
                <Text style={{ color: "#c9a44a", textTransform: "uppercase" }}>
                  {section.eyebrow}
                </Text>
                <Title level={3} style={{ color: "#ffffff", margin: 0 }}>
                  {section.title}
                </Title>
                <Paragraph style={{ color: "#e0e0e0", minHeight: 72 }}>
                  {section.description}
                </Paragraph>
                <Space wrap>
                  {section.bullets.map((bullet) => (
                    <Tag key={bullet} color="gold">
                      {bullet}
                    </Tag>
                  ))}
                </Space>
                <Link to={section.path}>
                  <Button
                    type="primary"
                    icon={<ArrowRightOutlined />}
                    style={{
                      marginTop: 8,
                      borderRadius: 999,
                      background: "#c9a44a",
                      color: "#0d1f33",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Abrir seção
                  </Button>
                </Link>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </main>
  );
};

export const CrmPipelinePage = () => {
  const [repository] = useState(buildDemoPipelineRepository);
  const [revision, setRevision] = useState(0);
  const [leadName, setLeadName] = useState("Novo lead LuzPerformance");
  const [dealTitle, setDealTitle] = useState("Avaliação + acompanhamento");
  const [valueCents, setValueCents] = useState(600000);
  const [lossReasons, setLossReasons] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>();

  const groups = useMemo(
    () => listPipelineDeals(repository),
    [repository, revision],
  );
  const stageChangeAuditLogs = useMemo(
    () =>
      repository
        .listAuditLogs()
        .filter((log) => log.action === "deal_stage.changed")
        .slice(-6)
        .reverse(),
    [repository, revision],
  );

  const refresh = () => setRevision((current) => current + 1);

  const handleCreateDeal = () => {
    setError(undefined);

    const { lead } = createLeadWithAttribution(repository, {
      contact: {
        fullName: leadName,
      },
      attribution: {
        channel: "whatsapp_dm",
        campaign: "pipeline-demo",
      },
      lead: {
        lifecycleStage: "sql",
        interest: "Lead criado manualmente no pipeline demo",
      },
    });

    moveLeadToDeal(repository, lead.id, {
      title: dealTitle,
      stage: "qualification",
      valueCents,
    });

    refresh();
  };

  const handleMoveDeal = (dealId: string, toStage: DealStage) => {
    setError(undefined);

    try {
      moveDealThroughPipeline(repository, {
        dealId,
        toStage,
        actorId: "demo-user",
        lossReason: lossReasons[dealId],
      });
      refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    }
  };

  return (
    <main style={shellBackground}>
      <Card style={heroCard} styles={{ body: { padding: 32 } }}>
        <Space direction="vertical" size={18} style={{ width: "100%" }}>
          <Tag color="gold" style={{ width: "fit-content" }}>
            Pipeline médico-comercial
          </Tag>
          <Title
            level={1}
            style={{ color: "#ffffff", fontFamily: "Orbitron, sans-serif" }}
          >
            Deals agrupados por estágio, com transição auditável
          </Title>
          <Paragraph style={{ color: "#e0e0e0", fontSize: 16, margin: 0 }}>
            Slice demoável: criar lead/deal, mover oportunidade no funil e
            registrar quem moveu, quando moveu, de qual estágio e para qual
            estágio. Perda/cancelamento exige motivo.
          </Paragraph>

          {error ? <Alert type="warning" message={error} showIcon /> : null}

          <Card
            style={{
              border: "1px solid rgba(201, 164, 74, 0.24)",
              borderRadius: 18,
              background: "rgba(13, 31, 51, 0.72)",
            }}
          >
            <Space wrap align="end">
              <Space direction="vertical">
                <Text style={{ color: "#e0e0e0" }}>Lead</Text>
                <Input
                  aria-label="Nome do lead"
                  value={leadName}
                  onChange={(event) => setLeadName(event.target.value)}
                  style={{ minWidth: 240 }}
                />
              </Space>
              <Space direction="vertical">
                <Text style={{ color: "#e0e0e0" }}>Deal</Text>
                <Input
                  aria-label="Título do deal"
                  value={dealTitle}
                  onChange={(event) => setDealTitle(event.target.value)}
                  style={{ minWidth: 260 }}
                />
              </Space>
              <Space direction="vertical">
                <Text style={{ color: "#e0e0e0" }}>Valor</Text>
                <InputNumber
                  aria-label="Valor do deal em centavos"
                  value={valueCents}
                  min={0}
                  step={10000}
                  onChange={(value) => setValueCents(Number(value ?? 0))}
                />
              </Space>
              <Button type="primary" onClick={handleCreateDeal}>
                Criar lead/deal
              </Button>
            </Space>
          </Card>
        </Space>
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {groups.map((group) => (
          <Col key={group.stage} xs={24} md={12} xl={8} xxl={6}>
            <Card style={pipelineColumn} styles={{ body: { padding: 18 } }}>
              <Space direction="vertical" size={14} style={{ width: "100%" }}>
                <Space style={{ justifyContent: "space-between", width: "100%" }}>
                  <Text strong style={{ color: "#ffffff" }}>
                    {group.label}
                  </Text>
                  <Tag color="gold">{group.deals.length}</Tag>
                </Space>

                {group.deals.length === 0 ? (
                  <Text style={{ color: "#a0a0a0" }}>Sem deals neste estágio</Text>
                ) : null}

                {group.deals.map((deal) => {
                  const lead = repository.getLead(deal.leadId);
                  const medicalGovernance = evaluateMedicalGovernancePolicy({
                    content: [deal.title, lead?.interest ?? ""],
                  });

                  return (
                    <Card
                      key={deal.id}
                      size="small"
                      style={{
                        border: "1px solid rgba(201, 164, 74, 0.18)",
                        borderRadius: 14,
                        background: "rgba(20, 42, 66, 0.92)",
                      }}
                    >
                      <Space direction="vertical" size={10} style={{ width: "100%" }}>
                        <Text strong style={{ color: "#ffffff" }}>
                          {deal.title}
                        </Text>
                        {medicalGovernance.requiresMedicalReview ? (
                          <Tag color="red">Revisão médica obrigatória</Tag>
                        ) : (
                          <Tag color="green">Revisão médica não exigida</Tag>
                        )}
                        <Text style={{ color: "#a0a0a0" }}>
                          R$ {((deal.valueCents ?? 0) / 100).toLocaleString("pt-BR")}
                        </Text>
                        <Select<DealStage>
                          aria-label={`Mover ${deal.title}`}
                          value={deal.stage}
                          options={dealStages.map((stage) => ({
                            value: stage,
                            label: dealStageLabels[stage],
                          }))}
                          onChange={(stage) => handleMoveDeal(deal.id, stage)}
                        />
                        <Input
                          aria-label={`Motivo de perda de ${deal.title}`}
                          placeholder="Motivo obrigatório se mover para perdido/cancelado"
                          value={lossReasons[deal.id] ?? ""}
                          onChange={(event) =>
                            setLossReasons((current) => ({
                              ...current,
                              [deal.id]: event.target.value,
                            }))
                          }
                        />
                      </Space>
                    </Card>
                  );
                })}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ ...sectionCard, marginTop: 24 }} styles={{ body: { padding: 24 } }}>
        <Title level={3} style={{ color: "#ffffff", marginTop: 0 }}>
          Histórico de transições
        </Title>
        <Space direction="vertical" style={{ width: "100%" }}>
          {stageChangeAuditLogs.map((log) => (
            <Text key={log.id} style={{ color: "#e0e0e0" }}>
              {log.createdAt} — {log.actorId}: {log.from} → {log.to}
              {log.metadata?.lossReason
                ? ` — motivo: ${log.metadata.lossReason}`
                : ""}
            </Text>
          ))}
          {stageChangeAuditLogs.length === 0 ? (
            <Text style={{ color: "#a0a0a0" }}>
              Nenhuma transição manual registrada ainda.
            </Text>
          ) : null}
        </Space>
      </Card>
    </main>
  );
};

export const CrmEmptyStatePage = ({ sectionKey }: { sectionKey: CrmSectionKey }) => {
  const section = getCrmSection(sectionKey);

  return (
    <main style={shellBackground}>
      <Card style={heroCard} styles={{ body: { padding: 32 } }}>
        <Space direction="vertical" size={18} style={{ maxWidth: 860 }}>
          <Space size={12}>
            <SafetyCertificateOutlined style={{ color: "#c9a44a", fontSize: 24 }} />
            <Tag color="gold">{section.eyebrow}</Tag>
          </Space>
          <Title
            level={1}
            style={{ color: "#ffffff", fontFamily: "Orbitron, sans-serif" }}
          >
            {section.title}
          </Title>
          <Paragraph style={{ color: "#e0e0e0", fontSize: 16 }}>
            {section.description}
          </Paragraph>
          <Card
            style={{
              border: "1px solid rgba(201, 164, 74, 0.24)",
              borderRadius: 18,
              background: "rgba(13, 31, 51, 0.72)",
            }}
          >
            <Text strong style={{ color: "#ffffff" }}>
              Empty state de domínio
            </Text>
            <Paragraph style={{ color: "#e0e0e0", marginTop: 12, marginBottom: 0 }}>
              {section.nextAction}
            </Paragraph>
          </Card>
          <Space wrap>
            {section.bullets.map((bullet) => (
              <Tag key={bullet} color="gold">
                {bullet}
              </Tag>
            ))}
          </Space>
          <Link to="/">
            <Button
              type="primary"
              style={{
                borderRadius: 999,
                background: "#c9a44a",
                color: "#0d1f33",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Voltar ao dashboard
            </Button>
          </Link>
        </Space>
      </Card>
    </main>
  );
};

export * from "./sections";
