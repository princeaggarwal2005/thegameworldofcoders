// landing page
import EnterWorldForm from "@/components/EnterWorldForm";

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16">
      <main className="flex w-full max-w-md flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Competitive Programming World
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            THEGAMEWORLD
          </h1>
          <p className="text-zinc-600">
            Enter your Codeforces handle to see your arena, title, and progress.
          </p>
        </div>
        <EnterWorldForm />
      </main>
    </div>
  );
}