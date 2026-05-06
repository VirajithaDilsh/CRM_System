type PipelineItem = {
  label: string;
  count: number;
};

type PipelineChartProps = {
  items: PipelineItem[];
  totalLeads: number;
};

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-500",
  Contacted: "bg-cyan-500",
  Qualified: "bg-purple-500",
  "Proposal Sent": "bg-amber-500",
  Won: "bg-green-500",
  Lost: "bg-red-500",
};

const DEFAULT_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export default function PipelineChart({
  items,
  totalLeads,
}: PipelineChartProps) {
  // Ensure all statuses always appear
  const normalizedItems = DEFAULT_STATUSES.map((status) => {
    const found = items.find((item) => item.label === status);

    return {
      label: status,
      count: found?.count || 0,
    };
  });

  const maxCount = Math.max(
    ...normalizedItems.map((item) => item.count),
    1
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Lead Pipeline
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Overview of lead progress by stage
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
          Total Leads: {totalLeads}
        </div>
      </div>

      <div className="flex h-80 items-end justify-between gap-4">
        {normalizedItems.map((item) => {
          const height = (item.count / maxCount) * 100;

          return (
            <div
              key={item.label}
              className="flex flex-1 flex-col items-center"
            >
              {/* Count */}
              <span className="mb-2 text-sm font-semibold text-gray-700">
                {item.count}
              </span>

              {/* Bar */}
              <div className="flex h-60 w-full items-end rounded-xl bg-gray-50 p-1">
                <div
                  className={`w-full rounded-xl transition-all duration-300 hover:opacity-90 ${
                    STATUS_COLORS[item.label]
                  }`}
                  style={{
                    height: `${height}%`,
                    minHeight: item.count > 0 ? "24px" : "6px",
                  }}
                />
              </div>

              {/* Label */}
              <span className="mt-3 text-center text-xs font-medium text-gray-600">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}