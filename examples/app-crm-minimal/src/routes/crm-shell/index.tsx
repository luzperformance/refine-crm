import type { CSSProperties } from "react";

import { Link } from "react-router";

import {
  ArrowRightOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";

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
