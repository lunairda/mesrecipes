"use client";

import { useState, useEffect, useRef } from "react";

interface TimeMatch {
  seconds: number;
  label: string;
}

function detectTime(text: string): TimeMatch | null {
  // "1 hour 30 minutes" / "1 heure 30 minutes"
  let m = text.match(/(\d+)\s*(?:hours?|heures?|hr)\s*(?:and\s+)?(\d+)\s*(?:minutes?|mins?|mn)/i);
  if (m) return { seconds: +m[1] * 3600 + +m[2] * 60, label: `${m[1]}h ${m[2]} min` };

  // "2 hours" / "2 heures"
  m = text.match(/(\d+)\s*(?:hours?|heures?|hr)(?!\s*\d)/i);
  if (m) return { seconds: +m[1] * 3600, label: `${m[1]}h` };

  // "25 minutes" / "10 min" / "15 mn"
  m = text.match(/(\d+)\s*(?:minutes?|mins?|mn)/i);
  if (m && +m[1] > 0 && +m[1] <= 180) return { seconds: +m[1] * 60, label: `${m[1]} min` };

  // "30 seconds" / "30 secondes"
  m = text.match(/(\d+)\s*(?:seconds?|secs?|secondes?)/i);
  if (m && +m[1] >= 5) return { seconds: +m[1], label: `${m[1]}s` };

  return null;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function playBeep() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    [0, 250, 500].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.value = 0.18;
      gain.gain.setTargetAtTime(0, ctx.currentTime + delay / 1000 + 0.12, 0.04);
      osc.start(ctx.currentTime + delay / 1000);
      osc.stop(ctx.currentTime + delay / 1000 + 0.25);
    });
    setTimeout(() => ctx.close(), 1500);
  } catch {}
}

interface TimerState {
  total: number;
  remaining: number;
  running: boolean;
  done: boolean;
  label: string;
}

interface Props {
  steps: string[];
  stepWord: string;
}

export function RecipeSteps({ steps, stepWord }: Props) {
  const [timer, setTimer] = useState<TimerState | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timer?.running && !timer.done) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          if (!t) return null;
          const next = t.remaining - 1;
          if (next <= 0) {
            clearInterval(intervalRef.current!);
            playBeep();
            return { ...t, remaining: 0, running: false, done: true };
          }
          return { ...t, remaining: next };
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timer?.running, timer?.done]);

  function startTimer(seconds: number, label: string) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer({ total: seconds, remaining: seconds, running: true, done: false, label });
  }

  function togglePause() {
    setTimer((t) => (t ? { ...t, running: !t.running } : null));
  }

  function resetTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer((t) => (t ? { ...t, remaining: t.total, running: false, done: false } : null));
  }

  function closeTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer(null);
  }

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const progress = timer ? (timer.total - timer.remaining) / timer.total : 0;

  return (
    <>
      <ol className="flex flex-col gap-6">
        {steps.map((step, i) => {
          const timeMatch = detectTime(step);
          return (
            <li key={i} className="flex gap-5">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: "#7A9E7E", fontFamily: "var(--font-body)" }}
              >
                {i + 1}
              </span>
              <div className="flex-1 pt-1.5">
                <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#2C3A2C" }}>
                  {step}
                </p>
                {timeMatch && (
                  <button
                    onClick={() => startTimer(timeMatch.seconds, `${stepWord} ${i + 1} · ${timeMatch.label}`)}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-opacity hover:opacity-70 cursor-pointer"
                    style={{ backgroundColor: "#EDE9E1", color: "#7A9E7E", fontFamily: "var(--font-body)" }}
                  >
                    <span>⏱</span>
                    <span>{timeMatch.label}</span>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {timer && (
        <div
          className="fixed bottom-6 right-6 z-50 rounded-2xl shadow-2xl p-5 w-44"
          style={{ backgroundColor: "#FAF7F2", border: "1.5px solid #EDE9E1" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs truncate opacity-60"
              style={{ fontFamily: "var(--font-body)", color: "#2C3A2C", maxWidth: "100px" }}
            >
              {timer.label}
            </span>
            <button
              onClick={closeTimer}
              className="opacity-30 hover:opacity-60 transition-opacity text-sm ml-1"
              style={{ color: "#2C3A2C" }}
              aria-label="Close timer"
            >
              ✕
            </button>
          </div>

          {/* Circular countdown */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-16 h-16">
              <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90" aria-hidden="true">
                <circle cx="32" cy="32" r={radius} fill="none" stroke="#EDE9E1" strokeWidth="4" />
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  fill="none"
                  stroke={timer.done ? "#7A9E7E" : "#C9A84C"}
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.3s" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-base font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: timer.done ? "#7A9E7E" : "#2C3A2C",
                  }}
                >
                  {timer.done ? "✓" : formatTime(timer.remaining)}
                </span>
              </div>
            </div>

            {/* Controls */}
            {!timer.done ? (
              <div className="flex gap-2">
                <button
                  onClick={togglePause}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm text-white transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#7A9E7E" }}
                  aria-label={timer.running ? "Pause" : "Resume"}
                >
                  {timer.running ? "⏸" : "▶"}
                </button>
                <button
                  onClick={resetTimer}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-opacity hover:opacity-70"
                  style={{ backgroundColor: "#EDE9E1", color: "#C8B89A" }}
                  aria-label="Reset"
                >
                  ↺
                </button>
              </div>
            ) : (
              <button
                onClick={resetTimer}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#EDE9E1", color: "#7A9E7E", fontFamily: "var(--font-body)" }}
              >
                ↺ Again
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
