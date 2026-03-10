const stats = [
  { value: "200+", label: "AI Actors" },
  { value: "21", label: "Scene Types" },
  { value: "5", label: "Industries" },
  { value: "<5m", label: "Generation" },
  { value: "3", label: "Aspect Ratios" },
  { value: "10s", label: "Max Duration" },
];

export default function StatsBar() {
  return (
    <div className="py-[3rem] border-t border-b border-[rgba(200,255,0,0.1)] overflow-hidden">
      <div className="stats-track flex gap-[6rem] w-max">
        {[...stats, ...stats].map((s, i) => (
          <div key={i} className="flex items-baseline gap-[1rem] whitespace-nowrap">
            <span className="font-[family-name:var(--font-bebas)] text-[5rem] text-accent leading-none">
              {s.value}
            </span>
            <span className="text-[0.8rem] text-grey uppercase tracking-[0.1em]">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
