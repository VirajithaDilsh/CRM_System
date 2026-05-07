"use client";

import { Building2, Pencil, Trash2 } from "lucide-react";
import { Lead } from "@/types/lead";
import StatusBadge from "./StatusBadge";
import { useRouter } from "next/navigation";

type LeadTableProps = {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
};

export default function LeadTable({ leads, onEdit, onDelete }: LeadTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full text-left">
        <thead className="border-b bg-gray-50">
          <tr className="text-gray-500">
            <th className="px-6 py-4 text-sm font-semibold">Lead</th>
            <th className="px-6 py-4 text-sm font-semibold">Status</th>
            <th className="px-6 py-4 text-sm font-semibold">Source</th>
            <th className="px-6 py-4 text-sm font-semibold">Sales Person</th>
            <th className="px-6 py-4 text-sm font-semibold">Value</th>
            <th className="px-6 py-4 text-right text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              onClick={() => router.push(`/dashboard/leads/${lead._id}`)}
              className="cursor-pointer border-b last:border-none hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">{lead.leadName}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Building2 className="h-4 w-4" />
                  <p>{lead.companyName}</p>
                </div>
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {lead.leadSource}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {lead.assignedSalesPerson}
              </td>

              <td className="px-6 py-4 font-medium text-gray-600">
                ${lead.estimatedDealValue}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(lead);
                    }}
                    className="rounded p-2 hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(lead._id);
                    }}
                    className="rounded p-2 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {leads.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                No leads found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
