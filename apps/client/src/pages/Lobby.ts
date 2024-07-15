import { Box, Typography, useRef } from "@jay-js/ui";
import { matchContext } from "../contexts/match/match.context";
import { keyHandler } from "../utils/keyHandler";
import { keySelectHero } from "../utils/keySelectHero";
import { Hero } from "../components/battle/Hero";
import { ANIMATE, HEROES, HEROES_ID } from "../constants";
import { sleepNavigate } from "../utils/sleep";
import { TSelectedHeroes } from "../contexts/match/match.interfaces";
import { Timer } from "../components/common/Timer";

export function Lobby() {
  const { timer, setTime, endTimer } = Timer();
  const HeroesContainerRef = useRef<HTMLDivElement>();

  const DEFAULT_HERO_ID = HEROES[0].id;

  const HostHero = Hero(DEFAULT_HERO_ID, "player");
  const ChallengerHero = Hero(DEFAULT_HERO_ID, "opponent");

  matchContext.actions
    .onSelectHero((heroes: TSelectedHeroes) => {
      if (!HeroesContainerRef.current) return;
      const HeroesContainer = HeroesContainerRef.current;
      const heroesNodes = HeroesContainer.querySelectorAll("[data-hero]");

      heroesNodes.forEach((node) => {
        node.classList.remove("hero-active");
        const Shimmer = node.querySelector(".hero-active-shimmer");
        Shimmer?.classList.remove("shimmer-player", "shimmer-opponent");
      });

      function selectHero(hero: HEROES_ID, player: "player" | "opponent") {
        const HeroNode = HeroesContainer.querySelector(`[data-hero="${hero}"]`);
        if (!HeroNode) return;
        const Shimmer = HeroNode.querySelector(".hero-active-shimmer");
        HeroNode.classList.add("hero-active");
        Shimmer?.classList.add(`shimmer-${player}`);
      }

      HostHero.setHero(heroes.hostHero);
      ChallengerHero.setHero(heroes.challengerHero);

      selectHero(heroes.hostHero, "player");
      selectHero(heroes.challengerHero, "opponent");
    });


  matchContext.actions
    .lobbyTimer((time: number) => {
      setTime(time);
      if (time === 0) {
        keyHandler.clearKeyDownEvent();
        endTimer();
        if (HeroesContainerRef.current) {
          HeroesContainerRef.current.classList.add("animation-delay", "fade-out-top-bounce");
        }
        sleepNavigate("/battle");
      }
    })

  matchContext.actions.emitSelectHero(DEFAULT_HERO_ID);

  keyHandler.setKeyDownEvent(keySelectHero);

  return Box({
    className: `flex flex-col grow gap-2 w-full min-w-[1000px] m-auto items-center justify-center ${ANIMATE.JELLY_BOUNCE_IN_RIGHT_FADE_IN}`,
    children: [
      timer,
      Box({
        className: "flex flex-row grow gap-2 w-full m-auto items-end relative",
        children: [
          Box({
            className: "w-1/2 flex justify-center items-end",
            children: HostHero.Hero
          }),
          Box({
            className: "w-[380px] min-w-[380px] absolute left-1/2 -translate-x-1/2 bottom-6 z-10",
            children: Box({
              ref: HeroesContainerRef,
              className: " grid grid-cols-2 gap-2 backdrop-blur-lg bg-base-100/70 rounded-xl shadow-xl p-4",
              children: HEROES.map((hero, i) => {
                return Box({
                  className: `relative p-2 w-full h-36 bg-base-200 rounded-xl ${i === 0 && "hero-active"}`,
                  children: Typography({
                    tag: "span",
                    className: "hero-active-shimmer shimmer-player"
                  }),
                  style: {
                    backgroundImage: `url(${hero.avatar})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  },
                  dataset: {
                    hero: hero.id
                  }
                })
              })
            }),
          }),
          Box({
            className: "w-1/2 flex justify-center items-end",
            children: ChallengerHero.Hero,
          }),
        ]
      })
    ]
  });
}
