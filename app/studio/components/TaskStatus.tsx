"use client";

interface TaskStatusProps {
  status: string;
  outputs: { url: string; name: string; contenttype: string }[];
  error: string | null;
}

const statusLabels: Record<string, string> = {
  task_queue: "In queue...",
  task_accept: "Accepted",
  task_assign: "Assigning worker...",
  task_preprocess_start: "Preprocessing...",
  task_preprocess_end: "Preprocessing done",
  task_start: "Generating video...",
  task_output: "Producing output...",
  task_postprocess_end: "Complete!",
  task_cancel: "Cancelled",
};

function getProgressPercent(status: string): number {
  const map: Record<string, number> = {
    task_queue: 10,
    task_accept: 20,
    task_assign: 30,
    task_preprocess_start: 40,
    task_preprocess_end: 50,
    task_start: 65,
    task_output: 85,
    task_postprocess_end: 100,
    task_cancel: 0,
  };
  return map[status] ?? 0;
}

export default function TaskStatus({ status, outputs, error }: TaskStatusProps) {
  const isComplete = status === "task_postprocess_end";
  const isCancelled = status === "task_cancel";
  const progress = getProgressPercent(status);

  if (error) {
    return (
      <div className="border border-accent2 rounded-[4px] p-[1.5rem]">
        <p className="text-accent2 font-semibold mb-[0.5rem]">Error</p>
        <p className="text-grey text-[0.85rem]">{error}</p>
      </div>
    );
  }

  return (
    <div className="border border-[rgba(200,255,0,0.15)] rounded-[4px] p-[1.5rem]">
      <div className="flex items-center justify-between mb-[1rem]">
        <span className="text-[0.7rem] uppercase tracking-[0.15em] text-accent">
          {statusLabels[status] || status}
        </span>
        <span className="text-[0.7rem] text-grey">{progress}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-[4px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden mb-[1.5rem]">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!isComplete && !isCancelled && (
        <div className="flex items-center gap-[0.75rem]">
          <div className="pulse-dot w-[8px] h-[8px] rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
          <p className="text-grey text-[0.8rem]">This usually takes 1-3 minutes...</p>
        </div>
      )}

      {isComplete && outputs.length > 0 && (
        <div className="space-y-[1rem]">
          {outputs.map((out, i) => (
            <div key={i}>
              {out.contenttype.startsWith("video") || out.name.endsWith(".mp4") ? (
                <video
                  src={out.url}
                  controls
                  autoPlay
                  className="w-full max-w-[400px] rounded-[4px] border border-[rgba(200,255,0,0.15)]"
                />
              ) : (
                <img
                  src={out.url}
                  alt={out.name}
                  className="w-full max-w-[400px] rounded-[4px] border border-[rgba(200,255,0,0.15)]"
                />
              )}
              <a
                href={out.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clip inline-flex items-center gap-[0.5rem] mt-[1rem] py-[0.6rem] px-[1.5rem] bg-accent text-[var(--color-black)] font-bold text-[0.8rem] uppercase tracking-[0.05em] hover:scale-[1.03] transition-all"
              >
                Download ↓
              </a>
            </div>
          ))}
        </div>
      )}

      {isCancelled && (
        <p className="text-accent2 text-[0.85rem]">Task was cancelled.</p>
      )}
    </div>
  );
}
