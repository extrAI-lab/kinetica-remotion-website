import React from "react";
import { Series, AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { BlurSlideWord } from "./BlurSlideWord";
import { ListReveal } from "./ListReveal";
import { StaggeredFadeIn } from "./StaggeredFadeIn";

const SCENE = 90; // frames per scene (3s at 30fps)

const Faded: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, SCENE - 12, SCENE], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const CombinedShowcase: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
    <Series>
      <Series.Sequence durationInFrames={SCENE}>
        <Faded>
          <BlurSlideWord />
        </Faded>
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE}>
        <Faded>
          <ListReveal />
        </Faded>
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE}>
        <Faded>
          <StaggeredFadeIn />
        </Faded>
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);
