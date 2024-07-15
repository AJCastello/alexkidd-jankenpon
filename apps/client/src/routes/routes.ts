// jay
import { LazyModule, Navigate, Router } from "@jay-js/system";
import { playerContext } from "../contexts/player/player.context";
import { GameLayout } from "../layouts/game.layout";
import { Home } from "../pages/Home";
import { Lobby } from "../pages/Lobby";
import { Battle } from "../pages/Battle";
import { FindMatch } from "../pages/FindMatch";

export function Routes(app: HTMLDivElement) {
  Router([
    {
      path: "/",
      element: GameLayout,
      layout: true,
      children: [
        {
          path: "/",
          element: Home
        },
        {
          path: "/lobby",
          element: Lobby
        },
        {
          path: "/battle",
          element: Battle
        },
        {
          path: "/find-match",
          element: FindMatch
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