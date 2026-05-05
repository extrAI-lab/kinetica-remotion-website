import React from "react";
import { AnimatedText } from "remotion-bits";

export const BlurSlideWord: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      padding: "0 8%",
      boxSizing: "border-box",
    }}
  >
    <AnimatedText
      transition={{
        y: [50, 0],
        blur: [12, 0],
        opacity: [0, 1],
        split: "word",
        splitStagger: 5,
        easing: "easeOutCubic",
      }}
      style={{
        fontWeight: 800,
        fontSize: 88,
        color: "#f5f5f5",
        letterSpacing: "-0.04em",
        lineHeight: 1.05,
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      Your Story Starts Here
    </AnimatedText>
    <AnimatedText
      transition={{
        y: [30, 0],
        blur: [8, 0],
        opacity: [0, 1],
        split: "word",
        splitStagger: 4,
        delay: 20,
        easing: "easeOutCubic",
      }}
      style={{
        fontWeight: 400,
        fontSize: 34,
        color: "#71717a",
        letterSpacing: "-0.01em",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      Cinematic text animations for video
    </AnimatedText>
  </div>
);
