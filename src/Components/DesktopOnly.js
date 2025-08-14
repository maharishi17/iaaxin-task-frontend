import React, { useEffect, useState } from "react";

export default function DesktopOnly({ minWidth = 1024, children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width:${minWidth - 1}px)`);
    const update = () => setIsMobile(mq.matches);

    // initial + listener
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update); // older Safari fallback

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, [minWidth]);

  if (!isMobile) return children;

  // Full-screen block for small screens
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "linear-gradient(180deg, rgba(0,0,0,.75), rgba(0,0,0,.85))",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          textAlign: "center",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          padding: "28px 22px",
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        }}
      >
        <h2 style={{ margin: "0 0 8px", fontSize: 24, letterSpacing: 1 }}>
          ⚠️ Please open on desktop
        </h2>
        <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.5 }}>
          This application is not available on small screens.
          <br />Use a desktop or widen your browser window.
        </p>
      </div>
    </div>
  );
}