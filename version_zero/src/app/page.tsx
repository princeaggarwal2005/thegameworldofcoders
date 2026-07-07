import EnterWorldForm from "@/components/EnterWorldForm";

export default function LandingPage() {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Inter',sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://images3.alphacoders.com/831/831208.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "50% 42%",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* feathered readability wash — NOT a box, fades in all directions */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse 46% 55% at 20% 24%, rgba(6,10,18,0.38) 0%, rgba(6,10,18,0.14) 45%, transparent 72%)",
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, transparent 65%, rgba(4,7,12,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      <main
        style={{
          position: "relative",
          zIndex: 5,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "7% 0 0 6%",
          maxWidth: 560,
        }}
      >
        <div
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: 13,
            letterSpacing: 4,
            color: "rgba(245,242,232,0.75)",
            textShadow: "0 2px 10px rgba(0,0,0,0.55)",
            marginBottom: 48,
          }}
        >
          THE<span style={{ color: "var(--accent-gold)" }}>GAME</span>WORLD
        </div>

        <h1
          style={{
            fontFamily: "'Cinzel',serif",
            fontWeight: 700,
            fontSize: "clamp(30px, 3.6vw, 46px)",
            lineHeight: 1.22,
            letterSpacing: "0.5px",
            marginBottom: 20,
            background:
              "linear-gradient(180deg,#FDF6E3 0%, var(--accent-gold) 55%, var(--accent-gold-deep) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 2px 24px rgba(0,0,0,0.5)",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))",
          }}
        >
          Welcome, warrior,
          <br />
          to the Kingdom of Codeforces.
        </h1>

        <p
          style={{
            fontFamily: "'Cinzel',serif",
            fontWeight: 500,
            fontSize: "clamp(15px,1.35vw,19px)",
            color: "rgba(245,242,232,0.92)",
            textShadow: "0 2px 12px rgba(0,0,0,0.65)",
            lineHeight: 1.5,
            marginBottom: 38,
          }}
        >
          To challenge the{" "}
          <em style={{ fontStyle: "normal", color: "var(--accent-gold)" }}>
            Monarch
          </em>
          , enter your Codeforces handle.
        </p>

        <EnterWorldForm />
      </main>

      <div
        style={{
          position: "absolute",
          left: "6%",
          bottom: "6%",
          zIndex: 5,
          fontSize: 12.5,
          color: "rgba(245,242,232,0.65)",
          textShadow: "0 1px 8px rgba(0,0,0,0.7)",
        }}
      >
        ~
        <strong
          style={{
            color: "var(--accent-gold)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          601,482
        </strong>{" "}
        programmers already live here
      </div>
    </div>
  );
}
