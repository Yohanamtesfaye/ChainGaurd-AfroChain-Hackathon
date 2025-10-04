"use client"

import { useState } from "react"
import { Search, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type RiskLevel = "Low" | "Medium" | "High"

interface Transaction {
  id: string
  sender: string
  receiver: string
  amount: number
  timestamp: string
  riskLevel: RiskLevel
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    sender: "0.0.123456",
    receiver: "0.0.789012",
    amount: 1500.5,
    timestamp: "2025-01-04 14:32:15",
    riskLevel: "High",
  },
  {
    id: "2",
    sender: "0.0.234567",
    receiver: "0.0.890123",
    amount: 250.0,
    timestamp: "2025-01-04 14:28:42",
    riskLevel: "Low",
  },
  {
    id: "3",
    sender: "0.0.345678",
    receiver: "0.0.901234",
    amount: 5000.0,
    timestamp: "2025-01-04 14:25:18",
    riskLevel: "High",
  },
  {
    id: "4",
    sender: "0.0.456789",
    receiver: "0.0.012345",
    amount: 750.25,
    timestamp: "2025-01-04 14:20:55",
    riskLevel: "Medium",
  },
  {
    id: "5",
    sender: "0.0.567890",
    receiver: "0.0.123456",
    amount: 100.0,
    timestamp: "2025-01-04 14:15:30",
    riskLevel: "Low",
  },
  {
    id: "6",
    sender: "0.0.678901",
    receiver: "0.0.234567",
    amount: 3200.75,
    timestamp: "2025-01-04 14:10:12",
    riskLevel: "Medium",
  },
  {
    id: "7",
    sender: "0.0.789012",
    receiver: "0.0.345678",
    amount: 450.0,
    timestamp: "2025-01-04 14:05:48",
    riskLevel: "Low",
  },
  {
    id: "8",
    sender: "0.0.890123",
    receiver: "0.0.456789",
    amount: 8500.0,
    timestamp: "2025-01-04 14:00:25",
    riskLevel: "High",
  },
]

const getRiskColor = (risk: RiskLevel) => {
  switch (risk) {
    case "High":
      return "bg-red-100 text-red-700 hover:bg-red-100"
    case "Medium":
      return "bg-orange-100 text-orange-700 hover:bg-orange-100"
    case "Low":
      return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
  }
}

export function TransactionTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState<string>("all")
  const [isExporting, setIsExporting] = useState(false)

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch =
      tx.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.receiver.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRisk = riskFilter === "all" || tx.riskLevel === riskFilter

    return matchesSearch && matchesRisk
  })

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      // Mock CSV export
      console.log("Exporting transactions to CSV...")
    }, 1500)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>

          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Exporting..." : "Export CSV"}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by wallet address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="Low">Low Risk</SelectItem>
              <SelectItem value="Medium">Medium Risk</SelectItem>
              <SelectItem value="High">High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receiver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount (HBAR)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900">{tx.sender}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900">{tx.receiver}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900">
                    {tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">{tx.timestamp}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={getRiskColor(tx.riskLevel)}>{tx.riskLevel}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No transactions found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
