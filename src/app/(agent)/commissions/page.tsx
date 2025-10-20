'use client'

import React, { useMemo, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import {
  Calendar as CalendarIcon,
  DollarSign,
  FileText,
  Users,
  TrendingUp,
} from 'lucide-react'
import { SummaryCard } from '@/components/dashboard/policy-summary'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { monthlyPerformanceData } from '@/constants/commissions'
import { PRIMARY, SECONDARY } from '@/components/colors'
import { useGetTransactions } from '@/app/data/queries/transactions'
import { TransactionDataTable } from '@/components/transactions/transaction-data-table'

export default function CommissionPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: transactionsResponse, isLoading } = useGetTransactions()

  const transactions = transactionsResponse?.data?.data || []

  const totalCommision = useMemo(() => {
    return transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
  }, [transactions])

  const commissionThisMonth = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    return transactions
      .filter((t) => {
        const txDate = new Date(t.created_at)
        return (
          txDate.getMonth() === currentMonth &&
          txDate.getFullYear() === currentYear
        )
      })
      .reduce((sum, t) => sum + (t.amount || 0), 0)
  }, [transactions])

  const policiesSold = useMemo(() => {
    return transactions.filter((t) => t.status === 'completed').length
  }, [transactions])

  const commissionByType = useMemo(() => {
    const data = transactions.reduce(
      (acc, item) => {
        if (item.status !== 'completed') return acc
        const type = item.status.charAt(0).toUpperCase() + item.status.slice(1)
        if (!acc[type]) {
          acc[type] = 0
        }
        acc[type] += item.amount || 0
        return acc
      },
      {} as Record<string, number>
    )
    return Object.entries(data).map(([name, commission]) => ({
      name,
      commission,
    }))
  }, [transactions])

  return (
    <div className="relative mx-auto w-full space-y-6">
      {/* Header */}
      <header className="mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Commissions</h1>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={DollarSign}
          title="Total Commission"
          value={`PHP ${totalCommision.toLocaleString()}`}
        />
        <SummaryCard
          icon={TrendingUp}
          title="Commision this Month"
          value={`PHP ${commissionThisMonth.toLocaleString()}`}
        />
        <SummaryCard
          icon={FileText}
          title="Policy Sold this Month"
          value={policiesSold}
        />
        <SummaryCard icon={Users} title="New Client this Month" value={54} />
      </div>

      {/* Charts Grid */}
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>Monthly Performance</CardHeader>

          <CardContent>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={monthlyPerformanceData}
                  // margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorCommission"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="0"
                    >
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#6B7280' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#6B7280' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(5px)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow:
                        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    }}
                    labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                    itemStyle={{ color: '#4f46e5' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="commission"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    fill="url(#colorCommission)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>Commission by Type</CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={commissionByType}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorCommissionByType"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="5%" stopColor={PRIMARY} stopOpacity={1} />
                      <stop
                        offset="95%"
                        stopColor={SECONDARY}
                        stopOpacity={1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    vertical={false}
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: '#6B7280' }}
                    axisLine={false}
                    tickLine={false}
                    width={60}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(5px)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow:
                        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar
                    dataKey="commission"
                    fill="url(#colorCommissionByType)"
                    radius={[0, 8, 8, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-background shadow-sm">
        <CardContent className="p-6">
          <TransactionDataTable
            data={transactionsResponse?.data}
            isLoading={isLoading}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  )
}
