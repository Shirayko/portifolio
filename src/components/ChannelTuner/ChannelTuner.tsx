"use client";

import { useEffect, useRef } from "react";

export default function ChannelTuner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("active");
    const timer = setTimeout(() => el.classList.remove("active"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="channel-tuner"
      ref={ref}
      aria-hidden="true"
    >
      <div className="tuner-bar" />
      <div className="tuner-text">CH. 04 — PORTFOLIO</div>
    </div>
  );
}
