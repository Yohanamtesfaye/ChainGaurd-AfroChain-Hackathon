"use client"

import { AlertTriangle, TrendingUp, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Alert {
  id: string
  type: "High Risk" | "Suspicious Volume" | "New Wallet"
  wallet: string
  description: string
  timestamp: string
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "High Risk",
    wallet: "0.0.123456",
    description: "Large transaction from flagged wallet",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "Suspicious Volume",
    wallet: "0.0.890123",
    description: "Unusual transaction volume detected",
    timestamp: "15 min ago",
  },
  {
    id: "3",
    type: "High Risk",
    wallet: "0.0.345678",
    description: "Multiple high-value transactions",
    timestamp: "32 min ago",
  },
]

const getAlertIcon = (type: Alert["type"]) => {
  switch (type) {
    case "High Risk":
      return <AlertTriangle className="h-5 w-5 text-red-600" />
    case "Suspicious Volume":
      return <TrendingUp className="h-5 w-5 text-orange-600" />
    case "New Wallet":
      return <Shield className="h-5 w-5 text-blue-600" />
  }
}

const getAlertColor = (type: Alert["type"]) => {
  switch (type) {
    case "High Risk":
      return "bg-red-100 text-red-700 hover:bg-red-100"
    case "Suspicious Volume":
      return "bg-orange-100 text-orange-700 hover:bg-orange-100"
    case "New Wallet":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100"
  }
}

export function RiskAlertsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockAlerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">{getAlertIcon(alert.type)}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getAlertColor(alert.type)}>{alert.type}</Badge>
              </div>

              <p className="text-sm font-medium text-gray-900 mb-1">{alert.description}</p>

              <p className="text-xs font-mono text-gray-600 mb-2">{alert.wallet}</p>

              <p className="text-xs text-gray-500">{alert.timestamp}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
