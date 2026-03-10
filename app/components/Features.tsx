const features = [
  { num: "01", title: "200+ AI ACTORS", desc: "Diverse cast across beauty, fitness, fashion, tech, and food. Studios, gyms, kitchens, cars, bathrooms, bedrooms." },
  { num: "02", title: "VOICE & LIP SYNC", desc: "Write any script. The actor delivers it with natural voice, synced lips, and authentic gestures." },
  { num: "03", title: "PRODUCT IN HAND", desc: "Upload your product photo. It appears in the actor's hands — like a real unboxing or review." },
  { num: "04", title: "5 MINUTES FLAT", desc: "No outreach. No contracts. No reshoots. Generate a video faster than you write the brief." },
  { num: "05", title: "EVERY FORMAT", desc: "9:16 TikTok & Reels. 16:9 YouTube. 1:1 Instagram feed. Switch with one click." },
  { num: "06", title: "YOURS FOREVER", desc: "Full commercial license. Run paid ads, post organic, embed on your site. No royalties." },
];

export default function Features() {
  return (
    <section id="features" className="py-[8rem] px-[2rem] max-w-[1300px] mx-auto">
      <div className="flex justify-between items-end mb-[4rem] border-b-2 border-accent pb-[2rem]">
        <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,7vw,6rem)] leading-[0.9]">
          THE UNFAIR<br />
          <span className="text-accent">ADVANTAGE</span>
        </h2>
        <p className="text-grey max-w-[400px] text-right leading-[1.6]">
          Everything a creator agency does. Minus the creators, the invoices, and the 3-week turnaround.
        </p>
      </div>

      <div className="feat-grid grid grid-cols-[repeat(3,1fr)] gap-0">
        {features.map((f) => (
          <div
            key={f.num}
            className="feat-card py-[3rem] px-[2.5rem] border border-[rgba(255,255,255,0.04)] relative overflow-hidden transition-all duration-[400ms]"
          >
            <div className="feat-num font-[family-name:var(--font-bebas)] text-[8rem] leading-none text-[rgba(200,255,0,0.06)] absolute top-[-0.5rem] right-[1rem] transition-colors duration-[400ms]">
              {f.num}
            </div>
            <h3 className="font-[family-name:var(--font-bebas)] text-[1.8rem] tracking-[0.03em] mb-[0.75rem] relative">
              {f.title}
            </h3>
            <p className="text-grey text-[0.9rem] leading-[1.6] relative">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
