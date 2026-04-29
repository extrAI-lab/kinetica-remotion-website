import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Player, PlayerRef } from "@remotion/player";
import { ListReveal } from "./ListReveal";
import { StaggeredFadeIn } from "./StaggeredFadeIn";
import { BlurSlideWord } from "./BlurSlideWord";

type ComponentConfig = {
  component: React.FC;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  posterFrame: number;
};

const registry: Record<string, ComponentConfig> = {
  "list-reveal": {
    component: ListReveal,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 90,
    posterFrame: 50,
  },
  "staggered-fade-in": {
    component: StaggeredFadeIn,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 90,
    posterFrame: 50,
  },
  "blur-slide-word": {
    component: BlurSlideWord,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 90,
    posterFrame: 50,
  },
};

type HoverPlayerProps = ComponentConfig & { cardEl: Element };

const HoverPlayer: React.FC<HoverPlayerProps> = ({
  component,
  width,
  height,
  fps,
  durationInFrames,
  posterFrame,
  cardEl,
}) => {
  const ref = useRef<PlayerRef>(null);

  useEffect(() => {
    const play = () => {
      ref.current?.seekTo(0);
      ref.current?.play();
    };
    const pause = () => {
      ref.current?.pause();
      ref.current?.seekTo(posterFrame);
    };

    cardEl.addEventListener("mouseenter", play);
    cardEl.addEventListener("mouseleave", pause);
    return () => {
      cardEl.removeEventListener("mouseenter", play);
      cardEl.removeEventListener("mouseleave", pause);
    };
  }, [cardEl, posterFrame]);

  return (
    <Player
      ref={ref}
      component={component}
      compositionWidth={width}
      compositionHeight={height}
      fps={fps}
      durationInFrames={durationInFrames}
      autoPlay={false}
      initialFrame={posterFrame}
      controls={false}
      loop
      clickToPlay={false}
      doubleClickToFullscreen={false}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

document.addEventListener("DOMContentLoaded", () => {
  // Card hover players
  document.querySelectorAll<HTMLElement>(".rt-player-card").forEach((container) => {
    const componentName = container.dataset.component ?? "staggered-fade-in";
    const config = registry[componentName];
    if (!config) return;

    const cardEl = container.closest("article") ?? container;
    const root = createRoot(container);
    root.render(<HoverPlayer {...config} cardEl={cardEl} />);
  });

  // Single template page – full autoplay preview
  const singletons: Record<string, string> = {
    "remotion-single-preview": "list-reveal",
  };
  for (const [id, componentName] of Object.entries(singletons)) {
    const el = document.getElementById(id);
    if (!el) continue;
    const config = registry[componentName];
    if (!config) continue;
    const root = createRoot(el);
    root.render(
      <Player
        component={config.component}
        compositionWidth={config.width}
        compositionHeight={config.height}
        fps={config.fps}
        durationInFrames={config.durationInFrames}
        loop
        autoPlay
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
});
