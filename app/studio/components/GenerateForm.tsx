"use client";

import { useState, useRef } from "react";

interface GenerateFormProps {
  selectedActor: string;
  onGenerate: (data: {
    effectType: string;
    mode: string;
    script: string;
    ratio: string;
    inputImageUrl: string;
  }) => void;
  isGenerating: boolean;
}

export default function GenerateForm({ selectedActor, onGenerate, isGenerating }: GenerateFormProps) {
  const [mode, setMode] = useState("std");
  const [ratio, setRatio] = useState("9:16");
  const [script, setScript] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSubmit() {
    if (!selectedActor || !script.trim() || !imagePreview) return;
    onGenerate({
      effectType: selectedActor,
      mode,
      script: script.trim(),
      ratio,
      inputImageUrl: imagePreview,
    });
  }

  const canSubmit = selectedActor && script.trim() && imagePreview && !isGenerating;

  return (
    <div className="flex flex-col gap-[1.5rem]">
      {/* Product Image Upload */}
      <div>
        <label className="block text-[0.7rem] uppercase tracking-[0.15em] text-accent mb-[0.75rem]">
          2. Upload Product Photo
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-[rgba(200,255,0,0.2)] rounded-[4px] p-[2rem] text-center cursor-pointer hover:border-accent transition-colors relative overflow-hidden"
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Product" className="max-h-[200px] mx-auto object-contain" />
          ) : (
            <>
              <div className="text-[2rem] mb-[0.5rem]">📦</div>
              <p className="text-grey text-[0.85rem]">Click to upload product photo</p>
              <p className="text-[rgba(255,255,255,0.3)] text-[0.7rem] mt-[0.25rem]">PNG, JPG — clean product shot works best</p>
            </>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>

      {/* Script */}
      <div>
        <label className="block text-[0.7rem] uppercase tracking-[0.15em] text-accent mb-[0.75rem]">
          3. Write Script
        </label>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="e.g. This serum changed my skin in just 7 days. The glow is unreal..."
          rows={4}
          className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[4px] p-[1rem] text-white text-[0.9rem] leading-[1.6] resize-none focus:outline-none focus:border-accent transition-colors placeholder:text-[rgba(255,255,255,0.2)]"
        />
        <p className="text-[rgba(255,255,255,0.3)] text-[0.65rem] mt-[0.4rem]">
          {mode === "std" ? "Standard: ~5 seconds" : "Pro: ~10 seconds"} — longer scripts will be cut short
        </p>
      </div>

      {/* Mode & Ratio */}
      <div className="grid grid-cols-2 gap-[1rem]">
        <div>
          <label className="block text-[0.7rem] uppercase tracking-[0.15em] text-accent mb-[0.75rem]">
            4. Duration
          </label>
          <div className="flex gap-[0.5rem]">
            {[
              { value: "std", label: "5s Standard" },
              { value: "pro", label: "10s Pro" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setMode(opt.value)}
                className={`flex-1 py-[0.6rem] text-[0.75rem] uppercase tracking-[0.06em] font-semibold border transition-all cursor-pointer ${
                  mode === opt.value
                    ? "bg-accent text-[var(--color-black)] border-accent"
                    : "bg-transparent text-grey border-[rgba(255,255,255,0.1)] hover:border-accent"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[0.7rem] uppercase tracking-[0.15em] text-accent mb-[0.75rem]">
            5. Aspect Ratio
          </label>
          <div className="flex gap-[0.5rem]">
            {["9:16", "16:9", "1:1"].map((r) => (
              <button
                key={r}
                onClick={() => setRatio(r)}
                className={`flex-1 py-[0.6rem] text-[0.75rem] uppercase tracking-[0.06em] font-semibold border transition-all cursor-pointer ${
                  ratio === r
                    ? "bg-accent text-[var(--color-black)] border-accent"
                    : "bg-transparent text-grey border-[rgba(255,255,255,0.1)] hover:border-accent"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`btn-clip w-full py-[1.25rem] text-[1.1rem] font-bold uppercase tracking-[0.05em] transition-all cursor-pointer ${
          canSubmit
            ? "bg-accent text-[var(--color-black)] hover:shadow-[0_0_40px_rgba(200,255,0,0.3)] hover:scale-[1.02]"
            : "bg-[rgba(200,255,0,0.15)] text-[rgba(200,255,0,0.4)] cursor-not-allowed"
        }`}
      >
        {isGenerating ? "Generating..." : "Generate Video →"}
      </button>
    </div>
  );
}
