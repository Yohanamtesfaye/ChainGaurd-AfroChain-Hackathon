"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function ChartsSection() {
  const volumeChartRef = useRef<HTMLCanvasElement>(null)
  const riskChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!volumeChartRef.current || !riskChartRef.current) return

    // Volume Chart
    const volumeCtx = volumeChartRef.current.getContext("2d")
    if (volumeCtx) {
      const volumeChart = new Chart(volumeCtx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Transaction Volume (HBAR)",
              data: [12500, 19000, 15000, 25000, 22000, 30000, 28000],
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      })

      return () => volumeChart.destroy()
    }
  }, [])

  useEffect(() => {
    if (!riskChartRef.current) return

    // Risk Distribution Chart
    const riskCtx = riskChartRef.current.getContext("2d")
    if (riskCtx) {
      const riskChart = new Chart(riskCtx, {
        type: "doughnut",
        data: {
          labels: ["Low Risk", "Medium Risk", "High Risk"],
          datasets: [
            {
              data: [65, 25, 10],
              backgroundColor: ["rgb(16, 185, 129)", "rgb(251, 146, 60)", "rgb(239, 68, 68)"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 15,
                usePointStyle: true,
              },
            },
          },
        },
      })

      return () => riskChart.destroy()
    }
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Volume</h3>
        <div className="h-64">
          <canvas ref={volumeChartRef}></canvas>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
        <div className="h-64">
          <canvas ref={riskChartRef}></canvas>
        </div>
      </div>
    </div>
  )
}
