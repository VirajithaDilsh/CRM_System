"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Lead } from "@/types/lead";
import LeadTable from "@/components/leads/LeadTable";
import LeadFilters from "@/components/leads/LeadFi";
import LeadFormModal from "@/components/leads/LeadForm";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [salesPeople, setSalesPeople] = useState<string[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [salesPerson, setSalesPerson] = useState("");

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (source) params.append("leadSource", source);
    if (salesPerson) params.append("assignedSalesPerson", salesPerson);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leads?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch leads");
    }

    return await res.json();
  };

  const refreshLeads = async () => {
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (error) {
      console.error("Failed to refresh leads:", error);
    }
  };

  const deleteLead = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete lead");
      }

      await refreshLeads();
    } catch (error) {
      console.error("Failed to delete lead:", error);
    }
  };

  useEffect(() => {
    const loadSalesPeople = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load sales people");
        }

        const data: Lead[] = await res.json();

        const uniquePeople = [
          ...new Set(
            data.map((lead) => lead.assignedSalesPerson).filter(Boolean),
          ),
        ];

        setSalesPeople(uniquePeople);
      } catch (error) {
        console.error("Failed to load sales people:", error);
      }
    };

    loadSalesPeople();
  }, []);

  useEffect(() => {
    const loadLeads = async () => {
      setLoading(true);

      try {
        const data = await fetchLeads();
        setLeads(data);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, [search, status, source, salesPerson]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
        <p className="text-sm font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

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
          onClick={() => {
            setSelectedLead(null);
            setIsFormOpen(true);
          }}
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
        salesPerson={salesPerson}
        setSalesPerson={setSalesPerson}
        salesPeople={salesPeople}
      />

      <LeadTable
        leads={leads}
        onEdit={(lead) => {
          setSelectedLead(lead);
          setIsFormOpen(true);
        }}
        onDelete={deleteLead}
      />

      <LeadFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedLead(null);
        }}
        onCreated={refreshLeads}
        lead={selectedLead}
      />
    </div>
  );
}