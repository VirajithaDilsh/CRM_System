"use client";
import { useEffect, useState } from "react";




type DashboardStats = {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  wonLeads: number;
  lostLeads: number;
  totalValue: number;
  wonValue: number;
};
export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  if (!stats) return <main className="min-h-screen p-6"><p>Loading...</p></main>;

  return <main className="min-h-screen p-6">
    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 border rounded">
        <h2 className="font-semibold">Total Leads</h2>
        <p className="text-2xl">{stats.totalLeads}</p>
      </div>

      <div className="p-4 border rounded">
        <h2 className="font-semibold">New Leads</h2>
        <p className="text-2xl">{stats.newLeads}</p>
      </div>

      <div className="p-4 border rounded">
        <h2 className="font-semibold">Won Leads</h2>
        <p className="text-2xl">{stats.wonLeads}</p>
      </div>

      <div className="p-4 border rounded">
        <h2 className="font-semibold">Total Value</h2>
        <p className="text-2xl">${stats.totalValue}</p>
      </div>
    </div>
  </main>
}
