import type { IResourceItem } from "@refinedev/core";

import {
  ApartmentOutlined,
  CheckSquareOutlined,
  ContactsOutlined,
  DashboardOutlined,
  FileProtectOutlined,
  LineChartOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
  {
    name: "dashboards",
    list: "/",
    meta: {
      label: "Dashboards",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "leads",
    list: "/leads",
    meta: {
      label: "Leads",
      icon: <ContactsOutlined />,
    },
  },
  {
    name: "pipeline",
    list: "/pipeline",
    meta: {
      label: "Pipeline",
      icon: <ApartmentOutlined />,
    },
  },
  {
    name: "contracts",
    list: "/contracts",
    meta: {
      label: "Contracts",
      icon: <FileProtectOutlined />,
    },
  },
  {
    name: "tasks",
    list: "/tasks",
    meta: {
      label: "Tasks",
      icon: <CheckSquareOutlined />,
    },
  },
  {
    name: "blog-attribution",
    list: "/attribution/blog",
    meta: {
      label: "Blog Attribution",
      icon: <ReadOutlined />,
    },
  },
  {
    name: "ads-attribution",
    list: "/attribution/ads",
    meta: {
      label: "Ads Attribution",
      icon: <LineChartOutlined />,
    },
  },
  {
    name: "compliance",
    list: "/compliance",
    meta: {
      label: "Compliance",
      icon: <SafetyCertificateOutlined />,
    },
  },
];
