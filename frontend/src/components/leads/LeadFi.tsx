type LeadFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  source: string;
  setSource: (value: string) => void;
};

export default function LeadFilters({
  search,
  setSearch,
  status,
  setStatus,
  source,
  setSource,
}: LeadFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl text-black border border-gray-300 bg-white p-4 md:grid-cols-3">
      <input
        type="text"
        placeholder="Search by name, company, email..."
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>

      <select
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      >
        <option value="">All Sources</option>
        <option value="Website">Website</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="Referral">Referral</option>
        <option value="Cold Email">Cold Email</option>
        <option value="Event">Event</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}