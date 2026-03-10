import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] py-[1.25rem] px-[3rem] flex justify-between items-center backdrop-blur-[20px] bg-[rgba(5,5,5,0.8)] border-b border-[rgba(200,255,0,0.08)]">
      <div className="font-[family-name:var(--font-bebas)] text-[2rem] tracking-[0.08em]">
        ugc<span className="text-accent">.supply</span>
      </div>
      <div className="nav-links-container flex gap-[2rem] items-center text-[0.85rem] text-grey uppercase tracking-[0.08em]">
        <Link href="#features" className="hover:text-accent transition-colors">Features</Link>
        <Link href="#how" className="hover:text-accent transition-colors">Process</Link>
        <Link href="#pricing" className="hover:text-accent transition-colors">Pricing</Link>
        <Link
          href="/studio"
          className="btn-clip inline-flex items-center gap-[0.5rem] py-[0.75rem] px-[1.75rem] bg-accent text-black font-bold text-[0.9rem] uppercase tracking-[0.05em] hover:shadow-[0_0_40px_rgba(200,255,0,0.3),0_0_80px_rgba(200,255,0,0.1)] hover:scale-[1.03] transition-all"
        >
          Start Creating
        </Link>
      </div>
    </nav>
  );
}
