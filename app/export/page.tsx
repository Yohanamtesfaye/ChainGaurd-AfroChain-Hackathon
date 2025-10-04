"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, FileSpreadsheet, Calendar } from "lucide-react"
import { useState } from "react"

export default function ExportPage() {
  const [exportFormat, setExportFormat] = useState("csv")
  const [dateRange, setDateRange] = useState("last-7-days")
  const [isExporting, setIsExporting] = useState(false)
  const [selectedFields, setSelectedFields] = useState({
    transactionId: true,
    timestamp: true,
    from: true,
    to: true,
    amount: true,
    type: true,
    status: true,
    riskScore: true,
  })

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      // Mock export functionality
      alert("Export completed! File downloaded successfully.")
    }, 2000)
  }

  const toggleField = (field: keyof typeof selectedFields) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Export Data</h1>
          <p className="text-gray-600 mt-1">Export transaction data and reports in various formats</p>
        </div>

        <div className="grid gap-6">
          {/* Export Format */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Format</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setExportFormat("csv")}
                className={`p-4 border-2 rounded-lg transition-all ${
                  exportFormat === "csv" ? "border-emerald-600 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <FileSpreadsheet
                  className={`h-8 w-8 mx-auto mb-2 ${exportFormat === "csv" ? "text-emerald-600" : "text-gray-400"}`}
                />
                <div className="text-center">
                  <div className="font-semibold text-gray-900">CSV</div>
                  <div className="text-sm text-gray-600">Comma-separated values</div>
                </div>
              </button>

              <button
                onClick={() => setExportFormat("json")}
                className={`p-4 border-2 rounded-lg transition-all ${
                  exportFormat === "json" ? "border-emerald-600 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <FileText
                  className={`h-8 w-8 mx-auto mb-2 ${exportFormat === "json" ? "text-emerald-600" : "text-gray-400"}`}
                />
                <div className="text-center">
                  <div className="font-semibold text-gray-900">JSON</div>
                  <div className="text-sm text-gray-600">JavaScript Object Notation</div>
                </div>
              </button>

              <button
                onClick={() => setExportFormat("pdf")}
                className={`p-4 border-2 rounded-lg transition-all ${
                  exportFormat === "pdf" ? "border-emerald-600 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <FileText
                  className={`h-8 w-8 mx-auto mb-2 ${exportFormat === "pdf" ? "text-emerald-600" : "text-gray-400"}`}
                />
                <div className="text-center">
                  <div className="font-semibold text-gray-900">PDF</div>
                  <div className="text-sm text-gray-600">Portable Document Format</div>
                </div>
              </button>
            </div>
          </Card>

          {/* Date Range */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Date Range</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date-range">Select Time Period</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger id="date-range" className="mt-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Fields Selection */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Fields to Export</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(selectedFields).map(([field, checked]) => (
                <div key={field} className="flex items-center space-x-2">
                  <Checkbox
                    id={field}
                    checked={checked}
                    onCheckedChange={() => toggleField(field as keyof typeof selectedFields)}
                  />
                  <Label htmlFor={field} className="cursor-pointer font-normal">
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())
                      .trim()}
                  </Label>
                </div>
              ))}
            </div>
          </Card>

          {/* Export Summary */}
          <Card className="p-6 bg-emerald-50 border-emerald-200">
            <h3 className="font-semibold text-gray-900 mb-3">Export Summary</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="font-medium">{exportFormat.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>Date Range:</span>
                <span className="font-medium">
                  {dateRange
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Fields Selected:</span>
                <span className="font-medium">{Object.values(selectedFields).filter(Boolean).length} of 8</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Records:</span>
                <span className="font-medium">~1,247 transactions</span>
              </div>
            </div>
          </Card>

          {/* Export Button */}
          <Button
            onClick={handleExport}
            disabled={isExporting || Object.values(selectedFields).filter(Boolean).length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-base"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Export Data
              </>
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
