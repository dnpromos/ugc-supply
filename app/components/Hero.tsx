import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-grid min-h-screen relative grid grid-cols-[1fr_1fr] overflow-hidden">
      <div className="hero-content flex flex-col justify-start pt-[7rem] px-[4rem] pb-[4rem] relative z-[2]">
        <div className="badge-clip inline-flex items-center gap-[0.5rem] bg-[rgba(200,255,0,0.06)] border border-[rgba(200,255,0,0.15)] py-[0.5rem] px-[1.25rem] text-[0.7rem] text-accent mb-[2rem] uppercase tracking-[0.15em] w-fit">
          <span className="pulse-dot w-[8px] h-[8px] rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
          Now live — 200+ AI actors
        </div>

        <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(5rem,14vw,12rem)] leading-[0.85] tracking-[-0.02em] mb-[2rem]">
          <span className="glitch inline-block relative">KILL THE</span>
          <br />
          <span className="[-webkit-text-stroke:3px_var(--color-white)] text-transparent">CREATOR</span>
          <br />
          <span className="text-accent glow">BUDGET.</span>
        </h1>

        <p className="text-[1.1rem] text-grey max-w-[480px] leading-[1.7] mb-[2.5rem]">
          AI actors that hold your product, speak your script, and look indistinguishable from real UGC. 5 minutes. Not 5 weeks.
        </p>

        <div className="flex gap-[1rem] flex-wrap">
          <Link
            href="/studio"
            className="btn-clip inline-flex items-center gap-[0.5rem] py-[1.1rem] px-[3rem] bg-accent text-black font-bold text-[1.05rem] uppercase tracking-[0.05em] hover:shadow-[0_0_40px_rgba(200,255,0,0.3),0_0_80px_rgba(200,255,0,0.1)] hover:scale-[1.03] transition-all"
          >
            Generate First Video →
          </Link>
          <Link
            href="#how"
            className="btn-clip inline-flex items-center gap-[0.5rem] py-[1.1rem] px-[3rem] bg-transparent text-white border-2 border-accent font-bold text-[1.05rem] uppercase tracking-[0.05em] hover:bg-accent hover:text-black transition-all"
          >
            Watch Demo
          </Link>
        </div>
      </div>

      <div className="hero-videos hero-videos-container relative grid grid-cols-[1fr_1fr] gap-[0.75rem] pt-[5rem] px-[2rem] pb-[2rem] content-center">
        <video
          src="https://cdn.wiro.ai/uploads/sampleinputs/beauty-studio-woman-blonde-dewy.mp4"
          autoPlay muted loop playsInline
          className="w-full aspect-[9/16] object-cover rounded-[4px] border border-[rgba(200,255,0,0.06)]"
        />
        <video
          src="https://cdn.wiro.ai/uploads/sampleinputs/beauty-dressingroom-woman-gold-rainbow.mp4"
          autoPlay muted loop playsInline
          className="w-full aspect-[9/16] object-cover rounded-[4px] border border-[rgba(200,255,0,0.06)]"
        />
      </div>
    </section>
  );
}
