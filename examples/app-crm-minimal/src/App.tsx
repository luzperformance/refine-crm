import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import { useNotificationProvider } from "@refinedev/antd";
import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";

import { App as AntdApp, ConfigProvider, theme } from "antd";

import { Layout } from "@/components";
import { resources } from "@/config/resources";
import { authProvider, dataProvider, liveProvider } from "@/providers";
import {
  CrmDashboardPage,
  CrmEmptyStatePage,
  LoginPage,
} from "@/routes";

import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

const luzPerformanceTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#c9a44a",
    colorBgBase: "#0d1f33",
    colorBgContainer: "#142a42",
    colorText: "#ffffff",
    colorTextSecondary: "#e0e0e0",
    colorTextTertiary: "#a0a0a0",
    colorBorder: "rgba(201, 164, 74, 0.3)",
    borderRadius: 16,
    fontFamily: "Montserrat, sans-serif",
  },
  components: {
    Button: {
      borderRadius: 999,
      controlHeight: 40,
      fontWeight: 700,
      primaryColor: "#0d1f33",
    },
    Layout: {
      bodyBg: "#0d1f33",
      headerBg: "#0d1f33",
      siderBg: "#0d1f33",
      triggerBg: "#142a42",
    },
    Menu: {
      darkItemBg: "#0d1f33",
      darkItemSelectedBg: "#1a3a5c",
      darkItemSelectedColor: "#c9a44a",
    },
  },
};

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={luzPerformanceTheme}>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                liveMode: "auto",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<CrmDashboardPage />} />
                  <Route path="/dashboards" element={<CrmDashboardPage />} />
                  <Route
                    path="/leads"
                    element={<CrmEmptyStatePage sectionKey="leads" />}
                  />
                  <Route
                    path="/pipeline"
                    element={<CrmEmptyStatePage sectionKey="pipeline" />}
                  />
                  <Route
                    path="/contracts"
                    element={<CrmEmptyStatePage sectionKey="contracts" />}
                  />
                  <Route
                    path="/tasks"
                    element={<CrmEmptyStatePage sectionKey="tasks" />}
                  />
                  <Route
                    path="/attribution/blog"
                    element={
                      <CrmEmptyStatePage sectionKey="blog-attribution" />
                    }
                  />
                  <Route
                    path="/attribution/ads"
                    element={<CrmEmptyStatePage sectionKey="ads-attribution" />}
                  />
                  <Route
                    path="/compliance"
                    element={<CrmEmptyStatePage sectionKey="compliance" />}
                  />

                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated
                      key="authenticated-auth"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource resource="dashboards" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<LoginPage />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
