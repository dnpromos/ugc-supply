import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="py-[8rem] px-[2rem] max-w-[900px] mx-auto text-center">
      <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(4rem,10vw,8rem)] leading-[0.9] mb-[1rem]">
        DEAD<br />
        <span className="text-accent glow">SIMPLE.</span>
      </h2>

      <div className="font-[family-name:var(--font-bebas)] text-[clamp(8rem,20vw,16rem)] leading-none text-accent my-[2rem] relative glow">
        $0<span className="text-[0.35em] align-super">.99</span>
        <span className="text-[0.15em] text-grey block tracking-[0.1em]">per video</span>
      </div>

      <p className="text-grey text-[1.1rem] max-w-[500px] mx-auto mb-[2.5rem] leading-[1.7]">
        Buy credits in bulk. No monthly fees. No hidden costs. Credits never expire. First video free.
      </p>

      <Link
        href="#cta"
        className="btn-clip inline-flex items-center gap-[0.5rem] py-[1.5rem] px-[4rem] bg-accent text-black font-bold text-[1.3rem] uppercase tracking-[0.05em] hover:shadow-[0_0_40px_rgba(200,255,0,0.3),0_0_80px_rgba(200,255,0,0.1)] hover:scale-[1.03] transition-all"
      >
        Start Free →
      </Link>
    </section>
  );
}
