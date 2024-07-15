// jay
import { Navigate, Router } from "@jay-js/system";
import { playerContext } from "../contexts/player/player.context";
import { Lazy } from "../utils/Lazy";
import { GameLayout } from "../layouts/game.layout";

export function Routes(app: HTMLDivElement) {
  Router([
    {
      path: "/",
      element: GameLayout,
      layout: true,
      children: [
        {
          path: "/",
          element: Lazy("Home")
        },
        {
          path: "/lobby",
          element: Lazy("Lobby")
        },
        {
          path: "/battle",
          element: Lazy("Battle")
        },
        {
          path: "/find-match",
          element: Lazy("FindMatch")
        }
      ]
    },
  ], {
    target: app,
    beforeResolve: (location) => {
      if (location.path !== "") {
        const hasPlayer = playerContext.actions.hasPlayer();
        if (!hasPlayer) {
          Navigate("/");
          return false;
        }
      }
      return true;
    },
    onError: (error) => {
      if (error.cause === "no-match") {
        Navigate("/");
      }
    }
  });
}