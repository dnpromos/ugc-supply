"use client";

import { useState, useRef } from "react";
import { industries, getScenes, getActors, Actor } from "@/lib/actors";

interface ActorPickerProps {
  selected: string;
  onSelect: (actor: Actor) => void;
}

function actorToSlug(value: string): string {
  return value.replace(/\+&\+/g, "-and-").replace(/\+/g, "-");
}

function ActorCard({ actor, isSelected, onSelect }: { actor: Actor; isSelected: boolean; onSelect: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const slug = actorToSlug(actor.value);
  const videoUrl = `https://cdn.wiro.ai/uploads/sampleinputs/${slug}.mp4`;

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className={`relative aspect-[9/16] rounded-[4px] overflow-hidden border-2 transition-all cursor-pointer group bg-[var(--color-card)] ${
        isSelected
          ? "border-accent shadow-[0_0_20px_rgba(200,255,0,0.3)]"
          : "border-transparent hover:border-[rgba(200,255,0,0.3)]"
      }`}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-[0.5rem] pt-[2rem]">
        <span className="text-[0.65rem] text-white font-medium leading-tight block">
          {actor.label}
        </span>
      </div>
      {isSelected && (
        <div className="absolute top-[0.4rem] right-[0.4rem] w-[20px] h-[20px] bg-accent rounded-full flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-black)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </button>
  );
}

export default function ActorPicker({ selected, onSelect }: ActorPickerProps) {
  const [industry, setIndustry] = useState(industries[0]);
  const [scene, setScene] = useState(getScenes(industries[0])[0]);

  const scenes = getScenes(industry);
  const actorList = getActors(industry, scene);

  function handleIndustryChange(ind: string) {
    setIndustry(ind);
    const firstScene = getScenes(ind)[0];
    setScene(firstScene);
  }

  return (
    <div>
      <label className="block text-[0.7rem] uppercase tracking-[0.15em] text-accent mb-[0.75rem]">
        1. Choose AI Actor
      </label>

      {/* Industry tabs */}
      <div className="flex flex-wrap gap-[0.5rem] mb-[1rem]">
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => handleIndustryChange(ind)}
            className={`px-[1rem] py-[0.4rem] text-[0.75rem] uppercase tracking-[0.08em] font-semibold border transition-all cursor-pointer ${
              industry === ind
                ? "bg-accent text-[var(--color-black)] border-accent"
                : "bg-transparent text-grey border-[rgba(255,255,255,0.1)] hover:border-accent hover:text-accent"
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Scene tabs */}
      <div className="flex flex-wrap gap-[0.5rem] mb-[1.25rem]">
        {scenes.map((sc) => (
          <button
            key={sc}
            onClick={() => setScene(sc)}
            className={`px-[0.75rem] py-[0.3rem] text-[0.7rem] uppercase tracking-[0.06em] border transition-all cursor-pointer ${
              scene === sc
                ? "bg-[rgba(200,255,0,0.15)] text-accent border-[rgba(200,255,0,0.3)]"
                : "bg-transparent text-grey border-[rgba(255,255,255,0.06)] hover:text-white"
            }`}
          >
            {sc}
          </button>
        ))}
      </div>

      {/* Actor grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-[0.5rem] max-h-[400px] overflow-y-auto pr-[0.5rem]">
        {actorList.map((actor) => (
          <ActorCard
            key={actor.value}
            actor={actor}
            isSelected={selected === actor.value}
            onSelect={() => onSelect(actor)}
          />
        ))}
      </div>
    </div>
  );
}
