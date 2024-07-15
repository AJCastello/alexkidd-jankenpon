import { Typography, useRef } from "@jay-js/ui";

import { ANIMATE } from "../../constants";

export function Timer() {
  const TimerCountdownRef = useRef<HTMLSpanElement>();

  const timer = Typography({
    children: Typography({
      ref: TimerCountdownRef,
      tag: "span",
      children: "10",
      className: "text-center"
    }),
    className: "title z-20 scale-75 -mt-14",
  })

  return {
    setTime: (time: number) => {
      if (TimerCountdownRef.current) {
        TimerCountdownRef.current.innerText = time.toString().padStart(2, "0");
      }
    },
    endTimer: () => {
      timer.classList.remove(ANIMATE.BOUNCE_IN_FADE_IN) 
      timer.classList.add(ANIMATE.JELLY_BOUNCE_OUT_TOP_FADE_OUT)
    },
    showTimer: () => {
      timer.classList.remove(ANIMATE.JELLY_BOUNCE_OUT_TOP_FADE_OUT)
      timer.classList.add(ANIMATE.BOUNCE_IN_FADE_IN)      
    },
    timer
  };
}