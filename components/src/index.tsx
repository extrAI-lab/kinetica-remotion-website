import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Player, PlayerRef } from "@remotion/player";
import {
  CodeWalkthroughScene,
  codeWalkthroughSceneDefaults,
  WorldMapScene,
  worldMapSceneDefaults,
  TimelineJourneyScene,
  timelineJourneySceneDefaults,
  BarChartRaceScene,
  barChartRaceSceneDefaults,
  StatisticEmphasisScene,
  statisticEmphasisSceneDefaults,
} from "@extrai-lab/kinetica-remotion";

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
  "code-walkthrough": {
    component: CodeWalkthroughScene as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 360,
    posterFrame: 60,
    defaultProps: codeWalkthroughSceneDefaults as Record<string, unknown>,
  },
  "world-map": {
    component: WorldMapScene as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 240,
    posterFrame: 60,
    defaultProps: worldMapSceneDefaults as Record<string, unknown>,
  },
  "timeline-journey": {
    component: TimelineJourneyScene as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 400,
    posterFrame: 80,
    defaultProps: timelineJourneySceneDefaults as Record<string, unknown>,
  },
  "bar-chart-race": {
    component: BarChartRaceScene as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 360,
    posterFrame: 60,
    defaultProps: barChartRaceSceneDefaults as Record<string, unknown>,
  },
  "statistic-emphasis": {
    component: StatisticEmphasisScene as AnyComponent,
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 360,
    posterFrame: 60,
    defaultProps: statisticEmphasisSceneDefaults as Record<string, unknown>,
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
  // Carousel items — autoplay, no controls
  document
    .querySelectorAll<HTMLElement>(".rt-carousel-item")
    .forEach((container) => {
      const componentName = container.dataset.component ?? "code-walkthrough";
      const config = registry[componentName];
      if (!config) return;

      createRoot(container).render(
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
    });

  // Card hover players
  document
    .querySelectorAll<HTMLElement>(".rt-player-card")
    .forEach((container) => {
      const componentName = container.dataset.component ?? "code-walkthrough";
      const config = registry[componentName];
      if (!config) return;

      const cardEl = container.closest("article") ?? container;
      createRoot(container).render(<HoverPlayer {...config} cardEl={cardEl} />);
    });

  // Single scene page — autoplay preview
  const singleEl = document.getElementById("remotion-single-preview");
  if (singleEl) {
    const name = singleEl.dataset.component ?? "code-walkthrough";
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
