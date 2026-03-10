import Link from "next/link";

export default function FinalCTA() {
  return (
    <div id="cta" className="final-cta py-[10rem] px-[2rem] text-center relative overflow-hidden">
      <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(4rem,12vw,10rem)] leading-[0.85] mb-[2rem] relative">
        <span className="[-webkit-text-stroke:3px_var(--color-white)] text-transparent">STOP</span>
        <br />
        <span className="[-webkit-text-stroke:3px_var(--color-white)] text-transparent">SCROLLING.</span>
        <br />
        <span className="text-accent glow">START SELLING.</span>
      </h2>

      <p className="text-grey text-[1.2rem] max-w-[550px] mx-auto mb-[3rem] leading-[1.6] relative">
        Your competitors are already using AI UGC. Every day you wait is money left on the table.
      </p>

      <Link
        href="#"
        className="btn-clip inline-flex items-center gap-[0.5rem] py-[1.5rem] px-[4rem] bg-accent text-black font-bold text-[1.3rem] uppercase tracking-[0.05em] hover:shadow-[0_0_40px_rgba(200,255,0,0.3),0_0_80px_rgba(200,255,0,0.1)] hover:scale-[1.03] transition-all relative"
      >
        Create Your First Ad →
      </Link>
    </div>
  );
}
