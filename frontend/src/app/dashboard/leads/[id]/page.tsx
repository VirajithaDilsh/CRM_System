"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  UserCircle2,
  Calendar,
  DollarSign,
  Trash2,
  Pencil,
} from "lucide-react";

import { Lead } from "@/types/lead";
import StatusBadge from "@/components/leads/StatusBadge";
import LeadFormModal from "@/components/leads/LeadForm";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [lead, setLead] = useState<Lead | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const id = params.id as string;

  const getLead = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      router.push("/dashboard/leads");
      return null;
    }

    return await res.json();
  };

  const refreshLead = async () => {
    const data = await getLead();
    if (data) setLead(data);
  };

  useEffect(() => {
    refreshLead();
  }, [id]);

  const updateStatus = async (newStatus: string) => {
    if (!lead) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leads/${lead._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      },
    );

    if (!res.ok) {
      console.error("Failed to update status");
      return;
    }

    const data = await res.json();
    setLead(data);
  };

  const deleteLead = async () => {
    if (!lead) return;

    const confirmDelete = confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leads/${lead._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      console.error("Failed to delete lead");
      return;
    }

    router.push("/dashboard/leads");
  };

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lead || !noteContent.trim()) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leads/${lead._id}/notes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: noteContent,
        }),
      },
    );

    if (!res.ok) {
      console.error("Failed to add note");
      return;
    }

    const data = await res.json();

    setLead(data);
    setNoteContent("");
  };

  const deleteNote = async (noteId?: string) => {
    if (!lead || !noteId) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leads/${lead._id}/notes/${noteId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      console.error("Failed to delete note");
      return;
    }

    const data = await res.json();
    setLead(data);
  };

  if (!lead) {
    return <p>Loading...</p>;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <Link
            href="/dashboard/leads"
            className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Leads
          </Link>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {lead.leadName}
            </h1>

            <StatusBadge status={lead.status} />
          </div>

          <p className="mt-1 flex items-center gap-2 text-gray-500">
            <Building2 className="h-4 w-4" />
            {lead.companyName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
                Lead Status
              </p>
            </div>

            <select
              value={lead.status}
              className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-800 outline-none transition focus:border-black focus:bg-white"
              onChange={(e) => updateStatus(e.target.value)}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>

            <button
              onClick={deleteLead}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-blue-600">
                    {lead.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-blue-600">
                    {lead.phone || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Deal Details
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Estimated Value</p>
                  <p className="text-sm font-medium text-black">
                    Rs. {lead.estimatedDealValue}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <UserCircle2 className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Assigned To</p>
                  <p className="text-sm font-medium text-black">
                    {lead.assignedSalesPerson}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Globe className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Source</p>
                  <p className="text-sm font-medium text-black">
                    {lead.leadSource}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium text-black">
                    {formatDate(lead.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-black">Notes</h2>

          <form onSubmit={addNote} className="mb-5 space-y-3">
            <textarea
              required
              placeholder="Add a note..."
              className="min-h-24 w-full rounded-lg border px-3 py-2 text-sm text-black placeholder:text-gray-400"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Add Note
            </button>
          </form>

          {lead.notes && lead.notes.length > 0 ? (
            <div className="space-y-3">
              {lead.notes.map((note) => (
                <div
                  key={note._id}
                  className="flex items-start justify-between gap-3 rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm text-gray-700">{note.content}</p>

                    <p className="mt-2 text-xs text-gray-400">
                      {note.createdBy?.name
                        ? `By ${note.createdBy.name} on ${new Date(
                            note.createdAt,
                          ).toLocaleString()}`
                        : new Date(note.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteNote(note._id)}
                    className="rounded p-2 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No notes yet.</p>
          )}
        </div>
      </div>

      <LeadFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onCreated={refreshLead}
        lead={lead}
      />
    </div>
  );
}
