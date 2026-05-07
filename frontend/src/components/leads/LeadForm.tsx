"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Lead } from "@/types/lead";

type LeadFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  lead?: Lead | null;
};

export default function LeadForm({
  isOpen,
  onClose,
  onCreated,
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    leadName: "",
    companyName: "",
    email: "",
    phone: "",
    leadSource: "Website",
    assignedSalesPerson: "",
    status: "New",
    estimatedDealValue: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          estimatedDealValue:
            Number(formData.estimatedDealValue) || 0,
        }),
      });

      onCreated();
      onClose();

      setFormData({
        leadName: "",
        companyName: "",
        email: "",
        phone: "",
        leadSource: "Website",
        assignedSalesPerson: "Admin User",
        status: "New",
        estimatedDealValue: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />

        <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg text-black font-semibold">
              Create New Lead
            </h2>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6"
          >
            <div className="grid grid-cols-1 gap-4 text-black md:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Lead Name"
                className="rounded-lg border px-3 py-2"
                value={formData.leadName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leadName: e.target.value,
                  })
                }
              />

              <input
                required
                type="text"
                placeholder="Company Name"
                className="rounded-lg border px-3 py-2"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    companyName: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-1 text-black gap-4 md:grid-cols-2">
              <input
                required
                type="email"
                placeholder="Email"
                className="rounded-lg border px-3 py-2"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Phone"
                className="rounded-lg border px-3 py-2"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-1 text-black gap-4 md:grid-cols-2">
              <select
                className="rounded-lg border px-3 py-2"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">
                  Proposal Sent
                </option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>

              <select
                className="rounded-lg border px-3 py-2"
                value={formData.leadSource}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leadSource: e.target.value,
                  })
                }
              >
                <option value="Website">Website</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Cold Email">Cold Email</option>
                <option value="Event">Event</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 text-black gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Assigned Salesperson"
                className="rounded-lg border px-3 py-2"
                value={formData.assignedSalesPerson}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assignedSalesPerson: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Estimated Deal Value"
                className="rounded-lg border px-3 py-2"
                value={formData.estimatedDealValue}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedDealValue: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border text-gray-500 px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Create Lead
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}