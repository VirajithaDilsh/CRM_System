"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Lead } from "@/types/lead";
import LeadTable from "@/components/leads/LeadTable";
import LeadFilters from "@/components/leads/LeadFi";
import LeadFormModal from "@/components/leads/LeadForm";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchLeads = async () => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if (search) params.append("search", search);

    if (status) params.append("status", status);

    if (source) params.append("leadSource", source);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leads?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return await res.json();
  };

  useEffect(() => {
    const loadLeads = async () => {
      const data = await fetchLeads();

      setLeads(data);
    };

    loadLeads();
  }, [search, status, source]);


  const refreshLeads = async () => {
    const data = await fetchLeads();

    setLeads(data);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>

          <p className="text-sm text-gray-500">
            Manage sales leads and track pipeline progress.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New Lead
        </button>
      </div>
      <LeadFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        source={source}
        setSource={setSource}
      />
      <LeadTable leads={leads} />

      <LeadFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onCreated={refreshLeads}
      />
    </div>
  );
}
