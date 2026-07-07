"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function EnterWorldForm() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [isEntering, setIsEntering] = useState(false);

  function onSubmit(e?: FormEvent) {
    if (e) e.preventDefault();
    const trimmed = handle.trim();
    if (!trimmed) {
      alert("Enter a Codeforces handle");
      return;
    }
    setIsEntering(true);
    router.push(`/world/${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", alignItems: "flex-end", gap: 18 }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
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
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="tourist"
          disabled={isEntering}
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
            opacity: isEntering ? 0.5 : 1,
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isEntering}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: isEntering ? "rgba(232,200,115,0.1)" : "transparent",
          border: "1.5px solid var(--accent-gold)",
          color: "var(--accent-gold)",
          fontFamily: "'Cinzel', serif",
          fontWeight: 600,
          fontSize: 14,
          padding: "11px 22px",
          cursor: isEntering ? "default" : "pointer",
          transition: "all 0.25s ease",
        }}
      >
        {isEntering ? (
          <>
            <span
              style={{
                width: 14,
                height: 14,
                border: "2px solid rgba(232,200,115,0.3)",
                borderTopColor: "var(--accent-gold)",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.8s linear infinite",
              }}
            />
            Entering the World
          </>
        ) : (
          "Enter the World"
        )}
      </button>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </form>
  );
}