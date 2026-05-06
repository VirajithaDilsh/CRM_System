type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    New: "bg-blue-50 text-blue-700",
    Contacted: "bg-yellow-50 text-yellow-700",
    Qualified: "bg-purple-50 text-purple-700",
    "Proposal Sent": "bg-indigo-50 text-indigo-700",
    Won: "bg-green-50 text-green-700",
    Lost: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-50 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}