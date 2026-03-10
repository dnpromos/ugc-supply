import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-accent p-[3rem] flex justify-between items-center">
      <div className="font-[family-name:var(--font-bebas)] text-[1.5rem] tracking-[0.08em]">
        ugc<span className="text-accent">.supply</span>
      </div>
      <div className="flex gap-[2rem] text-[0.75rem] text-grey uppercase tracking-[0.1em]">
        <Link href="#" className="hover:text-accent transition-colors">Privacy</Link>
        <Link href="#" className="hover:text-accent transition-colors">Terms</Link>
        <Link href="#" className="hover:text-accent transition-colors">Contact</Link>
        <span className="text-grey">&copy; 2026</span>
      </div>
    </footer>
  );
}
