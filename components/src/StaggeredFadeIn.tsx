import React from "react";
import { StaggeredMotion } from "remotion-bits";

const features = [
  { icon: "✦", label: "Scene transitions" },
  { icon: "✦", label: "Dynamic overlays" },
  { icon: "✦", label: "Brand identity" },
  { icon: "✦", label: "Social formats" },
];

export const StaggeredFadeIn: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#0a0a18",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      fontFamily: "system-ui, sans-serif",
    }}
  >
    {/* Title */}
    <StaggeredMotion
      transition={{
        opacity: [0, 1],
        y: [30, 0],
        duration: 25,
        easing: "easeOutCubic",
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: "#f5f5f5",
          letterSpacing: "-0.03em",
          textAlign: "center",
        }}
      >
        Product Showcase
      </div>
    </StaggeredMotion>

    {/* Feature pills */}
    <StaggeredMotion
      transition={{
        opacity: [0, 1],
        y: [24, 0],
        scale: [0.92, 1],
        duration: 22,
        stagger: 6,
        delay: 15,
        staggerDirection: "forward",
        easing: "easeOutCubic",
      }}
      style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}
    >
      {features.map((f, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: "#a1a1aa",
            fontWeight: 500,
          }}
        >
          <span style={{ color: "#6366f1", fontSize: 18 }}>{f.icon}</span>
          {f.label}
        </div>
      ))}
    </StaggeredMotion>
  </div>
);
