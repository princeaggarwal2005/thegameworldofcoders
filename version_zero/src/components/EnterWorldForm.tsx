"use client";
/**
 * Client Component — needs browser interactivity:
 * - useState for input value
 * - onSubmit to prevent page reload
 * - useRouter to navigate without full refresh
 */

import {useRouter} from "next/navigation";
import {FormEvent, useState} from "react";

export default function EnterWorldForm() {
  const router = useRouter();

  const [handle , setHandle] = useState("");
  const [error , setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    //stop the page from reloading
    e.preventDefault();
    
    const trimmed = handle.trim();
    if(!trimmed){
      setError("Enter a Codeforces Handle");
      return;
    }
    setError("");
    router.push(`/world/${encodeURIComponent(trimmed)}`);
  }
  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <label htmlFor="cf-handle" className="text-sm font-medium text-zinc-700">
        Codeforces handle
      </label>
      <input
        id="cf-handle"
        type="text"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        placeholder="e.g. tourist"
        autoComplete="off"
        spellCheck={false}
        className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        className="rounded-lg bg-zinc-900 px-4 py-3 font-medium text-white transition-colors hover:bg-zinc-700"
      >
        Enter World
      </button>
    </form>
  );

}
