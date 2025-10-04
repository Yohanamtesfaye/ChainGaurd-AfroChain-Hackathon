"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, CheckCircle, XCircle, Search, Filter } from "lucide-react"
import { useState } from "react"

interface Alert {
  id: string
  timestamp: string
  type: "high" | "medium" | "low"
  title: string
  description: string
  transactionId: string
  status: "active" | "resolved" | "dismissed"
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    timestamp: "2024-01-15 14:32:18",
    type: "high",
    title: "Suspicious Transaction Pattern",
    description: "Multiple high-value transactions detected from the same account within 5 minutes",
    transactionId: "0.0.123456@1705329138.123456789",
    status: "active",
  },
  {
    id: "2",
    timestamp: "2024-01-15 13:45:22",
    type: "high",
    title: "Blacklisted Address Detected",
    description: "Transaction involves a known blacklisted Hedera account",
    transactionId: "0.0.789012@1705326322.987654321",
    status: "active",
  },
  {
    id: "3",
    timestamp: "2024-01-15 12:18:45",
    type: "medium",
    title: "Unusual Transaction Amount",
    description: "Transaction amount significantly higher than account average",
    transactionId: "0.0.345678@1705321125.456789123",
    status: "resolved",
  },
  {
    id: "4",
    timestamp: "2024-01-15 11:22:33",
    type: "medium",
    title: "New Account Activity",
    description: "High-value transaction from newly created account",
    transactionId: "0.0.901234@1705317753.789123456",
    status: "active",
  },
  {
    id: "5",
    timestamp: "2024-01-15 10:05:12",
    type: "low",
    title: "Geographic Anomaly",
    description: "Transaction pattern suggests unusual geographic activity",
    transactionId: "0.0.567890@1705313112.321654987",
    status: "dismissed",
  },
]

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.transactionId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || alert.type === filterType
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const getAlertBadgeColor = (type: string) => {
    switch (type) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-50 text-red-700 border-red-200"
      case "resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "dismissed":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Alerts</h1>
          <p className="text-gray-600 mt-1">Monitor and manage security alerts for suspicious transactions</p>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                        <Badge variant="outline" className={getAlertBadgeColor(alert.type)}>
                          {alert.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={getStatusBadgeColor(alert.status)}>
                          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{alert.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                        <span className="font-mono">{alert.transactionId}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {alert.status === "active" && (
                    <>
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                        <CheckCircle className="h-4 w-4" />
                        Resolve
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                        <XCircle className="h-4 w-4" />
                        Dismiss
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <Card className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
