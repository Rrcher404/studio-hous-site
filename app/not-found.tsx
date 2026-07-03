export default function NotFound() {
  return (
    <div
      style={{
        margin: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        background: "#0e110c",
        color: "#edefe0",
        fontFamily: "'JetBrains Mono', monospace",
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 48,
          color: "#cea860",
          margin: 0,
        }}
      >
        This frame&rsquo;s empty.
      </h1>
      <p>The page you&rsquo;re after isn&rsquo;t here.</p>
      <a href="/" style={{ color: "#cea860" }}>
        ← back to Studio Hous
      </a>
    </div>
  );
}
