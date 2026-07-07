"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function EnterWorldLandingForm() {
  const router = useRouter();
  const [handle, setHandle] = useState("");

  function onSubmit(e?: FormEvent) {
    if (e) e.preventDefault();
    const trimmed = handle.trim();
    if (!trimmed) {
      alert("Enter a Codeforces handle");
      return;
    }
    router.push(`/world/${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="entry-row"
      style={{ display: "flex", alignItems: "flex-end", gap: 18 }}
    >
      <div
        className="handle-field"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label
          style={{
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "rgba(245,242,232,0.6)",
            marginBottom: 8,
          }}
        >
          Codeforces handle
        </label>
        <input
          className="handle-input"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="tourist"
          style={{
            background: "transparent",
            border: "none",
            borderBottom: "1.5px solid rgba(232,200,115,0.55)",
            color: "var(--text-warm)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 17,
            padding: "4px 2px 8px",
            width: 220,
            outline: "none",
          }}
        />
      </div>
      <button
        type="submit"
        className="cta"
        style={{
          background: "transparent",
          border: "1.5px solid var(--accent-gold)",
          color: "var(--accent-gold)",
          fontFamily: "'Cinzel', serif",
          fontWeight: 600,
          fontSize: 14,
          padding: "11px 22px",
          cursor: "pointer",
        }}
      >
        Enter the World
      </button>
    </form>
  );
}
