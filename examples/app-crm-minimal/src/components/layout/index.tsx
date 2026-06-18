import React from "react";

import { Link } from "react-router";

import { ThemedLayout } from "@refinedev/antd";

import { Header } from "./header";

const ProductTitle = () => {
  return (
    <Link
      to="/"
      style={{
        alignItems: "center",
        color: "#ffffff",
        display: "flex",
        gap: 12,
        paddingInline: 12,
      }}
    >
      <span
        style={{
          alignItems: "center",
          background: "#c9a44a",
          borderRadius: 999,
          color: "#0d1f33",
          display: "inline-flex",
          fontFamily: "Orbitron, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          height: 32,
          justifyContent: "center",
          width: 32,
        }}
      >
        LP
      </span>
      <span
        style={{
          color: "#ffffff",
          fontFamily: "Orbitron, sans-serif",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 0.4,
        }}
      >
        LuzPerformance CRM
      </span>
    </Link>
  );
};

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayout Header={Header} Title={ProductTitle}>
      {children}
    </ThemedLayout>
  );
};
