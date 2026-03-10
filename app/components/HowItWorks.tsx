const steps = [
  { title: "Upload product photo", desc: "Bottles, boxes, gadgets, food — drop a clean product shot." },
  { title: "Cast your AI actor", desc: "Browse 200+ actors by industry and scene. Preview each one in video." },
  { title: "Direct the script", desc: "Write what they say. 5-second hooks or 10-second narratives." },
  { title: "Download & run ads", desc: "Ready in minutes. Push to TikTok, Meta, YouTube. Start converting." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="split-grid grid grid-cols-[1fr_1fr] min-h-[80vh]">
      <div className="flex flex-col justify-center p-[4rem]">
        <div className="text-[0.7rem] uppercase tracking-[0.2em] text-accent mb-[1.5rem]">
          Process
        </div>
        <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,6vw,5rem)] leading-[0.95] mb-[2rem]">
          FOUR STEPS.<br />
          <span className="text-grey">ZERO CREATORS.</span>
        </h2>

        <div className="split-steps mt-[2rem]">
          {steps.map((step) => (
            <div
              key={step.title}
              className="split-step flex gap-[1.5rem] py-[1.25rem] border-b border-[rgba(255,255,255,0.05)]"
            >
              <div>
                <h4 className="text-[1rem] font-semibold mb-[0.25rem]">
                  {step.title}
                </h4>
                <p className="text-grey text-[0.85rem] leading-[1.5]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="split-video relative overflow-hidden">
        <video
          src="https://cdn.wiro.ai/uploads/sampleinputs/beauty-studio-woman-curly-serum.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
