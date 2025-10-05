"use client"

import { useState } from "react"
import { Search, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useTransactions } from "@/hooks/useTransactions"
import { getCsvExportUrl } from "@/lib/api"

type RiskLevel = "Low" | "Medium" | "High"

interface Transaction {
  id: string
  sender: string
  receiver: string
  amount: number
  timestamp: string
  riskLevel: RiskLevel
}

export function TransactionTable() {
  const { data: apiTxs = [], isLoading } = useTransactions()

  // Deduplicate by sender, receiver, amount, and timestamp
  const deduped: any[] = []
const seen = new Set<string>()

if (Array.isArray(apiTxs)) {
  for (const t of apiTxs) {
    if (t && typeof t === "object") {
      const key = `${t.sender}-${t.receiver}-${t.amount}-${t.timestamp}`
      if (!seen.has(key)) {
        seen.add(key)
        deduped.push(t)
      }
    }
  }
}


  // Take first 4 transactions for sample view
  const transactions: Transaction[] = deduped.slice(0, 4).map((t, idx) => ({
    id: t.transactionId ?? String(idx),
    sender: t.sender,
    receiver: t.receiver,
    amount: t.amount,
    timestamp: t.timestamp ? new Date(t.timestamp).toLocaleString() : "N/A",
    riskLevel: (t.riskLevel as RiskLevel) || "Low",
  }))

  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState<string>("all")
  const [isExporting, setIsExporting] = useState(false)

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.receiver.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = riskFilter === "all" || tx.riskLevel === riskFilter
    return matchesSearch && matchesRisk
  })

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-700 hover:bg-red-100"
      case "Medium":
        return "bg-orange-100 text-orange-700 hover:bg-orange-100"
      case "Low":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
      default:
        return ""
    }
  }

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      window.open(getCsvExportUrl(), "_blank")
    }, 300)
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (HBAR)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td className="p-6 text-center" colSpan={5}>
                  Loading transactions...
                </td>
              </tr>
            ) : filteredTransactions.length === 0 ? (
              <tr>
                <td className="p-6 text-center text-gray-500" colSpan={5}>
                  No transactions found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={`${tx.sender}-${tx.receiver}-${tx.amount}-${tx.timestamp}`} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-900">{tx.sender}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-900">{tx.receiver}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{tx.timestamp}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(tx.riskLevel)}`}
                    >
                      {tx.riskLevel}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
