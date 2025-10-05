"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { RiskAlertsPanel } from "@/components/risk-alerts-panel";

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Risk Alerts</h1>
      <RiskAlertsPanel />
    </DashboardLayout>
  );
}