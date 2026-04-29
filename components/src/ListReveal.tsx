import React from "react";
import { StaggeredMotion } from "remotion-bits";

const items = [
  { label: "Revenue", value: "$128,400", change: "+24%", color: "#6366f1" },
  { label: "Active Users", value: "84,201", change: "+18%", color: "#10b981" },
  { label: "Conversions", value: "3,842", change: "+9%", color: "#f59e0b" },
  { label: "Avg. Session", value: "4m 32s", change: "+12%", color: "#8b5cf6" },
  { label: "Churn Rate", value: "2.1%", change: "−3%", color: "#ef4444" },
];

export const ListReveal: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#09090b",
      padding: "0 8%",
      boxSizing: "border-box",
    }}
  >
    <StaggeredMotion
      transition={{
        y: [40, 0],
        opacity: [0, 1],
        scale: [0.96, 1],
        frames: [0, 35],
        stagger: 5,
        staggerDirection: "forward",
        easing: "easeOutCubic",
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        width: "100%",
        maxWidth: 900,
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            width: "100%",
            height: 72,
            backgroundColor: "#18181b",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            padding: "0 28px",
            gap: 20,
            border: "1px solid #27272a",
          }}
        >
          <div
            style={{
              width: 6,
              height: 36,
              borderRadius: 3,
              backgroundColor: item.color,
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, fontSize: 22, color: "#a1a1aa", fontWeight: 500, fontFamily: "system-ui, sans-serif" }}>
            {item.label}
          </div>
          <div style={{ fontSize: 26, color: "#f4f4f5", fontWeight: 700, fontFamily: "system-ui, sans-serif" }}>
            {item.value}
          </div>
          <div
            style={{
              fontSize: 18,
              color: item.change.startsWith("+") ? "#10b981" : "#ef4444",
              fontWeight: 600,
              fontFamily: "system-ui, sans-serif",
              minWidth: 60,
              textAlign: "right",
            }}
          >
            {item.change}
          </div>
        </div>
      ))}
    </StaggeredMotion>
  </div>
);
