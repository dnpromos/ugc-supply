const videos = [
  "beauty-dressingroom-woman-gold-rainbow",
  "health-and-sports-studio-man-tattoo-buzzcut-flexing",
  "fashion-dressingroom-woman-brunette-wavy",
  "electronic-decorative-woman-redhead-warm",
  "restaurant-and-cafe-cafe-man-platinum-sunglasses",
  "beauty-car-woman-cognac-skyline",
  "health-and-sports-gym-woman-platinum-boxing",
  "fashion-accessories-woman-redhead-freckles",
  "electronic-gamer-woman-blonde-earrings",
  "beauty-bedroom-woman-beige-cozy",
  "health-and-sports-outdoor-man-braids-hiking",
  "beauty-bathroom-woman-marble-vanity",
];

export default function VideoWall() {
  return (
    <div className="py-[6rem] relative">
      <div className="font-[family-name:var(--font-bebas)] text-[clamp(6rem,15vw,14rem)] text-center text-[rgba(200,255,0,0.04)] leading-none mb-[-3rem] relative z-[0]">
        ACTORS
      </div>
      <div className="video-grid grid grid-cols-[repeat(6,1fr)] gap-[0.5rem] px-[1rem] relative z-[1]">
        {videos.map((slug) => (
          <video
            key={slug}
            src={`https://cdn.wiro.ai/uploads/sampleinputs/${slug}.mp4`}
            autoPlay muted loop playsInline
            className="w-full aspect-[9/16] object-cover rounded-[6px]"
          />
        ))}
      </div>
    </div>
  );
}
