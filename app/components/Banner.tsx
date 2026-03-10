const primaryItems = [
  "NO INFLUENCERS", "NO CONTRACTS", "NO SHOOTS", "NO WAITING",
  "200+ AI ACTORS", "5 INDUSTRIES", "FULL COMMERCIAL RIGHTS",
];

const reverseItems = [
  "BEAUTY", "FASHION", "HEALTH & FITNESS", "ELECTRONICS",
  "RESTAURANT & CAFE", "TIKTOK", "INSTAGRAM REELS", "YOUTUBE SHORTS",
];

function BannerItem({ text, light }: { text: string; light?: boolean }) {
  return (
    <div className={`font-[family-name:var(--font-bebas)] text-[2rem] whitespace-nowrap px-[2rem] flex items-center gap-[2rem] tracking-[0.05em] ${light ? "text-white" : "text-[var(--color-black)]"}`}>
      <span className={`w-[12px] h-[12px] rotate-45 shrink-0 ${light ? "bg-white" : "bg-[var(--color-black)]"}`} />
      {text}
    </div>
  );
}

export default function Banner() {
  return (
    <>
      <div className="py-[1.5rem] overflow-hidden bg-accent relative -rotate-[1deg] scale-[1.02] my-[-1rem]">
        <div className="banner-track flex gap-0 w-max">
          {[...primaryItems, ...primaryItems].map((item, i) => (
            <BannerItem key={i} text={item} />
          ))}
        </div>
      </div>

      <div className="py-[1.5rem] overflow-hidden bg-accent2 relative rotate-[1deg] scale-[1.02] my-[-1rem]">
        <div className="banner-track-reverse flex gap-0 w-max">
          {[...reverseItems, ...reverseItems].map((item, i) => (
            <BannerItem key={i} text={item} light />
          ))}
        </div>
      </div>
    </>
  );
}
