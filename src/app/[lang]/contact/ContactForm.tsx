"use client";
import { useState } from "react";

interface Labels {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
}

export function ContactForm({ labels }: { labels: Labels }) {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ backgroundColor: "#EDE9E1" }}
      >
        <div className="text-3xl mb-3">🌿</div>
        <p className="text-base font-semibold" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
          {labels.success}
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    color: "#2C3A2C",
    backgroundColor: "#fff",
    borderColor: "#EDE9E1",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}>
            {labels.name}
          </label>
          <input
            type="text"
            required
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            className="px-4 py-3 rounded-xl border text-sm outline-none transition-shadow focus:shadow-md"
            style={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}>
            {labels.email}
          </label>
          <input
            type="email"
            required
            value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
            className="px-4 py-3 rounded-xl border text-sm outline-none transition-shadow focus:shadow-md"
            style={inputStyle}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}>
          {labels.message}
        </label>
        <textarea
          required
          rows={5}
          value={fields.message}
          onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
          className="px-4 py-3 rounded-xl border text-sm outline-none transition-shadow focus:shadow-md resize-none"
          style={inputStyle}
        />
      </div>

      {status === "error" && (
        <p className="text-sm" style={{ fontFamily: "var(--font-body)", color: "#C46E72" }}>
          {labels.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start px-7 py-3 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-85 disabled:opacity-50 cursor-pointer"
        style={{ backgroundColor: "#7A9E7E", fontFamily: "var(--font-body)" }}
      >
        {status === "sending" ? labels.sending : labels.send}
      </button>
    </form>
  );
}
