"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { Actor } from "@/lib/actors";
import ActorPicker from "./components/ActorPicker";
import GenerateForm from "./components/GenerateForm";
import TaskStatus from "./components/TaskStatus";

const COMPLETED_STATUSES = ["task_postprocess_end", "task_cancel"];

export default function StudioPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskStatus, setTaskStatus] = useState<string>("");
  const [taskOutputs, setTaskOutputs] = useState<{ url: string; name: string; contenttype: string }[]>([]);
  const [taskError, setTaskError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const pollTask = useCallback((id: string) => {
    if (pollRef.current) clearInterval(pollRef.current);

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch("/api/wiro/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId: id }),
        });
        const data = (await res.json()) as {
          tasklist?: { status: string; outputs?: { url: string; name: string; contenttype: string }[] }[];
        };

        if (data.tasklist?.[0]) {
          const task = data.tasklist[0];
          setTaskStatus(task.status);

          if (COMPLETED_STATUSES.includes(task.status)) {
            if (pollRef.current) clearInterval(pollRef.current);
            setIsGenerating(false);
            if (task.outputs?.length) {
              setTaskOutputs(task.outputs);
            }
          }
        }
      } catch {
        setTaskError("Failed to check task status");
        if (pollRef.current) clearInterval(pollRef.current);
        setIsGenerating(false);
      }
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  async function handleGenerate(data: {
    effectType: string;
    mode: string;
    script: string;
    ratio: string;
    inputImageUrl: string;
  }) {
    setIsGenerating(true);
    setTaskId(null);
    setTaskStatus("task_queue");
    setTaskOutputs([]);
    setTaskError(null);

    try {
      const res = await fetch("/api/wiro/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await res.json()) as {
        result: boolean;
        taskid?: string;
        errors?: string[];
      };

      if (result.result && result.taskid) {
        setTaskId(result.taskid);
        pollTask(result.taskid);
      } else {
        setTaskError(result.errors?.[0] || "Failed to start generation");
        setIsGenerating(false);
      }
    } catch {
      setTaskError("Network error — please try again");
      setIsGenerating(false);
    }
  }

  function handleReset() {
    if (pollRef.current) clearInterval(pollRef.current);
    setTaskId(null);
    setTaskStatus("");
    setTaskOutputs([]);
    setTaskError(null);
    setIsGenerating(false);
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-black)]">
        <div className="pulse-dot w-[12px] h-[12px] rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-black)]">
      {/* Studio Nav */}
      <nav className="sticky top-0 z-[100] py-[1rem] px-[2rem] flex justify-between items-center backdrop-blur-[20px] bg-[rgba(5,5,5,0.9)] border-b border-[rgba(200,255,0,0.08)]">
        <a href="/" className="font-[family-name:var(--font-bebas)] text-[1.5rem] tracking-[0.08em]">
          ugc<span className="text-accent">.supply</span>
        </a>
        <div className="flex items-center gap-[1.5rem]">
          <div className="flex items-center gap-[0.75rem]">
            {user.photoURL && (
              <img src={user.photoURL} alt="" className="w-[28px] h-[28px] rounded-full" />
            )}
            <span className="text-[0.8rem] text-grey hidden sm:block">{user.displayName}</span>
          </div>
          <button
            onClick={signOut}
            className="text-[0.7rem] text-grey uppercase tracking-[0.1em] hover:text-accent transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-[2rem] py-[2rem]">
        <div className="mb-[2rem]">
          <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(2rem,4vw,3rem)] leading-[0.9]">
            CREATE <span className="text-accent">VIDEO</span>
          </h1>
          <p className="text-grey text-[0.85rem] mt-[0.5rem]">
            Pick an actor, upload your product, write a script, and generate.
          </p>
        </div>

        {/* Task result / active generation */}
        {(taskId || taskError) && (
          <div className="mb-[2rem]">
            <TaskStatus status={taskStatus} outputs={taskOutputs} error={taskError} />
            {(taskStatus === "task_postprocess_end" || taskStatus === "task_cancel" || taskError) && (
              <button
                onClick={handleReset}
                className="mt-[1rem] text-[0.75rem] text-grey uppercase tracking-[0.1em] hover:text-accent transition-colors cursor-pointer"
              >
                ← Create another video
              </button>
            )}
          </div>
        )}

        {/* Studio form */}
        {!taskId && !taskError && (
          <div className="grid grid-cols-[1fr_1fr] gap-[2rem] items-start max-[900px]:grid-cols-[1fr]">
            <ActorPicker
              selected={selectedActor?.value || ""}
              onSelect={setSelectedActor}
            />
            <GenerateForm
              selectedActor={selectedActor?.value || ""}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>
        )}
      </div>
    </div>
  );
}
