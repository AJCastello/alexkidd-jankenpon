import { useRef, Box } from "@jay-js/ui";
import { ANIMATE, HAND_OPTIONS, HANDS, HERO_POSITIONS, HERO_STATUS, HEROES, HEROES_ID } from "../../constants";
import { ThinkBallon } from "./Think";
import HandsSprite from "../../assets/images/jankenpon.webp";

export function Hero(
  id: HEROES_ID,
  type: "player" | "opponent"
) {
  const hero = HEROES.find((c) => c.id === id) || HEROES[0];

  const heroRef = useRef<HTMLImageElement>();
  const heroThinkRef = useRef<HTMLDivElement>();
  const heroHandRef = useRef<HTMLDivElement>();

  const SCALE_WIDTH = (hero.width * hero.scale);
  const SCALE_HEIGHT = (hero.height * hero.scale);

  const HeroContainer = Box({
    className: `relative flex justify-end items-end flex-col ${type === "opponent" ? "scale-x-[-1]" : ""}`,
    style: {
      width: `${SCALE_WIDTH}px`,
      height: `${SCALE_HEIGHT}px`,
    },
    children: [
      Box({
        ref: heroThinkRef,
        className: "w-fit absolute z-10 hidden top-[-250px] left-1/2 -translate-x-1/2 justify-center items-center",
        children: [
          Box({
            ref: heroHandRef,
            className: `${ANIMATE.JELLY_BOUNCING} animation-delay absolute z-20`,
            style: {
              width: `${HAND_OPTIONS.w}px`,
              height: `${HAND_OPTIONS.h}px`,
              backgroundImage: `url(${HandsSprite})`,
              backgroundSize: "cover",
              backgroundPositionX: "0px",
              backgroundRepeat: "no-repeat",
            },
          }),
          ThinkBallon()
        ]
      }),
      Box({
        ref: heroRef,
        className: `${ANIMATE.JELLY_BOUNCING} z-10`,
        style: {
          width: `${SCALE_WIDTH}px`,
          height: `${SCALE_HEIGHT}px`,
          backgroundImage: `url(${hero.img})`,
          backgroundSize: "cover",
          backgroundPositionX: "0px",
          backgroundRepeat: "no-repeat",
        },
      }),
      Box({
        className: "h-4 w-full rounded-[100%] bg-black opacity-60 blur-sm absolute bottom-0 z-0",
      })
    ]
  });
  
  return {
    setSprite: (status: HERO_STATUS) => {
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionX = `-${HERO_POSITIONS[status] * SCALE_WIDTH}px`;
      }
    },
    setHero: (id: HEROES_ID) => {      
      const hero = HEROES.find((c) => c.id === id) || HEROES[0];
      const SCALE_WIDTH = (hero.width * hero.scale);
      const SCALE_HEIGHT = (hero.height * hero.scale);

      if (heroRef.current) {
        heroRef.current.style.backgroundImage = `url(${hero.img})`;
        heroRef.current.style.width = `${SCALE_WIDTH}px`;
        heroRef.current.style.height = `${SCALE_HEIGHT}px`;
      }

      if (HeroContainer) {
        HeroContainer.style.width = `${SCALE_WIDTH}px`
        HeroContainer.style.height = `${SCALE_HEIGHT}px`
      }
    },
    setHand: (hand: HANDS) => {
      if (heroHandRef.current) {
        heroHandRef.current.style.backgroundPositionX = `-${HAND_OPTIONS[hand] * (HAND_OPTIONS.w)}px`;
      }
    },
    onThinking: () => {
      const heroThink = heroThinkRef.current;
      if (heroThink) {
        heroThink.classList.remove("hidden");
        heroThink.classList.add("flex");
      }
    },
    stopThinking: () => {
      const heroThink = heroThinkRef.current;
      if (heroThink) {
        heroThink.classList.add("hidden");
        heroThink.classList.remove("flex");
      }
    },
    Hero: HeroContainer
  }
}