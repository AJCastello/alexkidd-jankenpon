import { Box, Img } from "@jay-js/ui";

import LoseIcon from "../../assets/images/lose-icon.webp";
import WinIcon from "../../assets/images/win-icon.webp";
import { ANIMATE } from "../../constants";

function ResultIcon(type: "win" | "lose") {
  return Box({
    className: `${ANIMATE.BOUNCE_IN_FADE_IN} w-20 h-20 ${type === "win" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"} bg-white border-4 rounded-full flex items-center justify-center`,
    children: Img({
      src: type === "win" ? WinIcon : LoseIcon,
      alt: type,
      className: "w-10 h-10"
    })
  })
}

export function Score() {
  const score = Box({
    className: "absolute grid grid-cols-3 gap-2 left-1/2 -translate-x-1/2 bottom-4 z-20",
  });

  return {
    score,
    addScore: (type: "win" | "lose") => {
      score.appendChild(ResultIcon(type));
    }
  }
}

