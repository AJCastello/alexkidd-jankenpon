import { Box, useRef } from "@jay-js/ui";
import { matchContext } from "../contexts/match/match.context";
import { MatchFound } from "../components/findMatch/MatchFound";
import { LookingForMatch } from "../components/findMatch/LookingForMatch";
import { sleepCb, sleepNavigate } from "../utils/sleep";
import { outTransition } from "../utils/transitions";
import { ANIMATE } from "../constants";

export function FindMatch() {
  const ContainerRef = useRef<HTMLDivElement>();

  sleepCb(() => {
    console.log("FindMatch");
    matchContext
      .actions
      .findAndJoinMatch(() => {
        const Container = ContainerRef.current;
        if (Container) {
          Container.innerHTML = "";
          Container.appendChild(MatchFound());
          outTransition(Container);
          sleepNavigate("/lobby");
        };
      });
  });

  return Box({
    ref: ContainerRef,
    className: `w-full max-w-screen-sm m-auto backdrop-blur-md bg-base-100/70 rounded-lg p-16 flex flex-col shadow-xl justify-center items-center ${ANIMATE.JELLY_BOUNCE_IN_RIGHT_FADE_IN}`,
    children: LookingForMatch()
  });
}

