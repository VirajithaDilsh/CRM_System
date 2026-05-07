"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  DollarSign,
  Target,
  CheckCircle2,
  XCircle,
  BarChart3,
} from "lucide-react";

import { Lead } from "@/types/lead";
import StatusBadge from "@/components/leads/StatusBadge";
import PipelineChart from "@/components/PipelineChart";

type DashboardStats = {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  wonLeads: number;
  lostLeads: number;
  totalValue: number;
  wonValue: number;
};

function KpiCard({
  title,
  value,
  icon: Icon,
  colorClass,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  colorClass: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
        </div>

        <div className={`rounded-lg p-3 ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("token");

      const statsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const leadsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const statsData = await statsRes.json();
      const leadsData = await leadsRes.json();

      setStats(statsData);
      setLeads(leadsData);
    };

    loadDashboard();
  }, []);

  if (!stats) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>

        <p className="text-sm font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  const recentLeads = [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const statusCounts = [
    { label: "New", count: stats.newLeads },
    { label: "Qualified", count: stats.qualifiedLeads },
    { label: "Won", count: stats.wonLeads },
    { label: "Lost", count: stats.lostLeads },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Total Pipeline Value"
          value={formatCurrency(stats.totalValue)}
          icon={DollarSign}
          colorClass="bg-indigo-50 text-indigo-600"
        />

        <KpiCard
          title="Won Deal Value"
          value={formatCurrency(stats.wonValue)}
          icon={Target}
          colorClass="bg-green-50 text-green-600"
        />

        <KpiCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={Users}
          colorClass="bg-blue-50 text-blue-600"
        />

        <KpiCard
          title="New Leads"
          value={stats.newLeads}
          icon={BarChart3}
          colorClass="bg-yellow-50 text-yellow-600"
        />

        <KpiCard
          title="Qualified Leads"
          value={stats.qualifiedLeads}
          icon={CheckCircle2}
          colorClass="bg-purple-50 text-purple-600"
        />

        <KpiCard
          title="Won / Lost"
          value={`${stats.wonLeads} / ${stats.lostLeads}`}
          icon={XCircle}
          colorClass="bg-gray-100 text-gray-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            Pipeline Summary
          </h2>

          <div className="space-y-4">
            <PipelineChart items={statusCounts} totalLeads={stats.totalLeads} />
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Leads
            </h2>

            <Link
              href="/dashboard/leads"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>

          <div className="flex-1 space-y-4">
            {recentLeads.map((lead) => (
              <Link
                key={lead._id}
                href={`/dashboard/leads/${lead._id}`}
                className="block rounded-lg p-2 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {lead.leadName}
                    </p>
                    <p className="text-xs text-gray-500">{lead.companyName}</p>
                  </div>

                  <div className="text-right">
                    <p className="mb-1 text-sm font-medium text-gray-900">
                      {formatCurrency(lead.estimatedDealValue)}
                    </p>

                    <StatusBadge status={lead.status} />
                  </div>
                </div>
              </Link>
            ))}

            {recentLeads.length === 0 && (
              <p className="py-4 text-center text-sm text-gray-500">
                No leads yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}