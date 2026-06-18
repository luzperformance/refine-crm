import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { resources } from "../../config/resources";
import { CrmDashboardPage, CrmEmptyStatePage, crmSections } from ".";

describe("CRM product shell", () => {
  it("exposes CRM-specific top-level navigation resources", () => {
    const labels = resources.map((resource) => resource.meta?.label);

    expect(labels).toEqual([
      "Dashboards",
      "Leads",
      "Pipeline",
      "Contracts",
      "Tasks",
      "Blog Attribution",
      "Ads Attribution",
      "Compliance",
    ]);
  });

  it("renders navigation entry points for every CRM work section", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <CrmDashboardPage />
      </MemoryRouter>,
    );

    expect(html).toContain("CRM médico-operacional LuzPerformance");

    for (const section of crmSections) {
      expect(html).toContain(section.title);
      expect(html).toContain(section.path);
    }
  });

  it("renders a medical compliance empty state with a next action", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <CrmEmptyStatePage sectionKey="compliance" />
      </MemoryRouter>,
    );

    expect(html).toContain("Compliance");
    expect(html).toContain("LGPD e fronteira médica");
    expect(html).toContain("bloquear automações de diagnóstico");
  });
});
