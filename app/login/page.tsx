"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/studio");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-black)]">
        <div className="text-accent font-[family-name:var(--font-bebas)] text-[2rem] tracking-[0.08em]">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-black)] px-[2rem]">
      <div className="max-w-[420px] w-full text-center">
        <div className="font-[family-name:var(--font-bebas)] text-[3rem] tracking-[0.08em] mb-[1rem]">
          ugc<span className="text-accent">.supply</span>
        </div>
        <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] mb-[1.5rem]">
          SIGN IN TO<br />
          <span className="text-accent glow">THE STUDIO</span>
        </h1>
        <p className="text-grey text-[0.95rem] leading-[1.6] mb-[2.5rem]">
          Generate AI-powered UGC videos for your products in minutes.
        </p>
        <button
          onClick={signInWithGoogle}
          className="btn-clip w-full inline-flex items-center justify-center gap-[0.75rem] py-[1.1rem] px-[2rem] bg-accent text-[var(--color-black)] font-bold text-[1rem] uppercase tracking-[0.05em] hover:shadow-[0_0_40px_rgba(200,255,0,0.3),0_0_80px_rgba(200,255,0,0.1)] hover:scale-[1.03] transition-all cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>
        <a
          href="/"
          className="inline-block mt-[2rem] text-grey text-[0.8rem] uppercase tracking-[0.1em] hover:text-accent transition-colors"
        >
          ← Back to home
        </a>
      </div>
    </div>
  );
}
