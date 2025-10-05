"use client";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAlerts, Alert as AlertDoc } from "@/hooks/useAlerts";
import AlertModal from "@/components/alert-modal";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

type AlertType = "High Risk" | "Suspicious Volume";

// local alias to avoid name clash
interface LocalAlert {
  id: string;
  type: AlertType;
  wallet: string;
  description: string;
  timestamp: string;
}

const getAlertIcon = (type: AlertType) =>
  ({
    "High Risk": <AlertTriangle className="h-5 w-5 text-red-600" />,
    "Suspicious Volume": <TrendingUp className="h-5 w-5 text-orange-600" />,
  }[type]);

const getAlertColor = (type: AlertType) =>
  ({
    "High Risk": "bg-red-100 text-red-700 hover:bg-red-100",
    "Suspicious Volume": "bg-orange-100 text-orange-700 hover:bg-orange-100",
  }[type]);

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export function RiskAlertsPanel() {
  const { data: alerts = [] } = useAlerts();
  const [open, setOpen] = useState<AlertDoc | null>(null);

  if (!alerts.length)
    return <p className="text-sm text-gray-500">No alerts</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alerts.map((a) => (
          <div
            key={a._id}
            onClick={() => setOpen(a)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {a.riskLevel === "High" ? <AlertTriangle className="h-5 w-5 text-red-600" /> : <TrendingUp className="h-5 w-5 text-orange-600" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={a.riskLevel === "High" ? "bg-red-100 text-red-700 hover:bg-red-100" : "bg-orange-100 text-orange-700 hover:bg-orange-100"}>
                    {a.riskLevel === "High" ? "High Risk" : "Suspicious Volume"}
                  </Badge>
                </div>

                <p className="text-sm font-medium text-gray-900 mb-1">
                  {a.sender} → {a.receiver}
                </p>

                <p className="text-xs font-mono text-gray-600 mb-2">
                  {a.amount} HBAR
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(a.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertModal alert={open} onClose={() => setOpen(null)} />
    </>
  );
}