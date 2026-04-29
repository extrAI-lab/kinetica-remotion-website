import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Player, PlayerRef } from "@remotion/player";
import {
  // Text
  AnimatedTitle,
  animatedTitleDefaults,
  Subtitle,
  subtitleDefaults,
  AnimatedCounter,
  animatedCounterDefaults,
  RevealText,
  revealTextDefaults,
  GlitchText,
  glitchTextDefaults,
  // Transitions
  FadeTransition,
  fadeTransitionDefaults,
  WipeTransition,
  wipeTransitionDefaults,
  CircleReveal,
  circleRevealDefaults,
  // Visual
  ParticleField,
  particleFieldDefaults,
  ProgressBar,
  progressBarDefaults,
  Spotlight,
  spotlightDefaults,
  Ticker,
  tickerDefaults,
  Badge,
  badgeDefaults,
} from "@extrai-lab/kinetica-remotion";
import { CombinedShowcase } from "./CombinedShowcase";

// The remotion-components package is built against React 19 types which include
// Promise<ReactNode>. The Vite project uses React 18, so we cast to avoid
// spurious type errors while keeping full runtime compatibility.
type AnyComponent = React.FC<Record<string, unknown>>;

type ComponentConfig = {
  component: AnyComponent;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  posterFrame: number;
  defaultProps: Record<string, unknown>;
};

const registry: Record<string, ComponentConfig> = {
  // Text
  "animated-title": {
    component: AnimatedTitle as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 45,
    posterFrame: 25,
    defaultProps: animatedTitleDefaults as Record<string, unknown>,
  },
  subtitle: {
    component: Subtitle as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 90,
    posterFrame: 45,
    defaultProps: subtitleDefaults as Record<string, unknown>,
  },
  "animated-counter": {
    component: AnimatedCounter as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 45,
    posterFrame: 25,
    defaultProps: animatedCounterDefaults as Record<string, unknown>,
  },
  "reveal-text": {
    component: RevealText as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 90,
    posterFrame: 30,
    defaultProps: revealTextDefaults as Record<string, unknown>,
  },
  "glitch-text": {
    component: GlitchText as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 90,
    posterFrame: 20,
    defaultProps: glitchTextDefaults as Record<string, unknown>,
  },
  // Transitions
  "fade-transition": {
    component: FadeTransition as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 45,
    posterFrame: 22,
    defaultProps: fadeTransitionDefaults as Record<string, unknown>,
  },
  "wipe-transition": {
    component: WipeTransition as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 30,
    posterFrame: 15,
    defaultProps: wipeTransitionDefaults as Record<string, unknown>,
  },
  "circle-reveal": {
    component: CircleReveal as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 45,
    posterFrame: 25,
    defaultProps: circleRevealDefaults as Record<string, unknown>,
  },
  // Visual
  "particle-field": {
    component: ParticleField as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 90,
    posterFrame: 45,
    defaultProps: particleFieldDefaults as Record<string, unknown>,
  },
  "progress-bar": {
    component: ProgressBar as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 60,
    posterFrame: 30,
    defaultProps: progressBarDefaults as Record<string, unknown>,
  },
  spotlight: {
    component: Spotlight as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 90,
    posterFrame: 45,
    defaultProps: spotlightDefaults as Record<string, unknown>,
  },
  ticker: {
    component: Ticker as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 90,
    posterFrame: 45,
    defaultProps: tickerDefaults as Record<string, unknown>,
  },
  badge: {
    component: Badge as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 90,
    posterFrame: 15,
    defaultProps: badgeDefaults as Record<string, unknown>,
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
  defaultProps,
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
      inputProps={defaultProps}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

document.addEventListener("DOMContentLoaded", () => {
  // Homepage hero — combined autoplay loop
  const heroEl = document.getElementById("remotion-hero");
  if (heroEl) {
    createRoot(heroEl).render(
      <Player
        component={CombinedShowcase}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        durationInFrames={270}
        loop
        autoPlay
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        style={{ width: "100%", height: "100%" }}
      />,
    );
  }

  // Card hover players
  document
    .querySelectorAll<HTMLElement>(".rt-player-card")
    .forEach((container) => {
      const componentName = container.dataset.component ?? "animated-title";
      const config = registry[componentName];
      if (!config) return;

      const cardEl = container.closest("article") ?? container;
      createRoot(container).render(<HoverPlayer {...config} cardEl={cardEl} />);
    });

  // Single template page — autoplay preview
  const singleEl = document.getElementById("remotion-single-preview");
  if (singleEl) {
    const name = singleEl.dataset.component ?? "animated-title";
    const config = registry[name];
    if (config) {
      createRoot(singleEl).render(
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
          inputProps={config.defaultProps}
          style={{ width: "100%", height: "100%" }}
        />,
      );
    }
  }
});
