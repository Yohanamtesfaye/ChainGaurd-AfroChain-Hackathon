import { DashboardLayout } from "@/components/dashboard-layout"
import { TransactionTable } from "@/components/transaction-table"
import { ChartsSection } from "@/components/charts-section"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transaction Monitor</h1>
            <p className="text-gray-600 mt-1">Real-time Hedera blockchain transaction monitoring</p>
          </div>
        </div>


        <ChartsSection />

        <TransactionTable />
      </div>
    </DashboardLayout>
  )
}
