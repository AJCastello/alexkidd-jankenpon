import { Box } from "@jay-js/ui";
import { Hero } from "../components/battle/Hero";
import { matchContext } from "../contexts/match/match.context";
import { keyHandler } from "../utils/keyHandler";
import { keySelectHand } from "../utils/keySelectHand";
import { IMatch, TMatchManager } from "../contexts/match/match.interfaces";
import { ANIMATE, HANDS, HERO_STATUS } from "../constants";
import { sleepCb } from "../utils/sleep";
import { playerContext } from "../contexts/player/player.context";
import { Timer } from "../components/common/Timer";
import { confettiTo } from "../utils/centerElementNormalized";
import { Score } from "../components/battle/Score";


export function Battle() {
  const { timer, setTime, endTimer, showTimer } = Timer();
  const { score, addScore } = Score();

  const player = playerContext.states.getPlayer();
  const match = matchContext.states.getMatch();

  const HostHero = Hero(match.hostHero, "player");
  const ChallengerHero = Hero(match.challengerHero, "opponent");

  const CurrentPlayer = player.id === match.host ? HostHero : ChallengerHero;

  matchContext.actions.onSelectHand((hand) => {
    CurrentPlayer.setHand(hand);
  });

  let lastRound = 0;
  let finishedRound = false;

  matchContext.actions.matchManager((match: IMatch) => {
    setTime(match.roundTimer)

    if (match.interfaceStage === "playing") {
      if (match.currentRound !== lastRound) {
        showTimer();
        finishedRound = false;
        lastRound = match.currentRound;
        keyHandler.setKeyDownEvent(keySelectHand);
        CurrentPlayer.setHand(HANDS.SCISSORS);
        HostHero.setSprite(HERO_STATUS.DEFAULT);
        ChallengerHero.setSprite(HERO_STATUS.DEFAULT);
        CurrentPlayer.onThinking();
      }
    }

    if (match.roundTimer === 0) {
      const currentRound = match.rounds.find(round => round.number === match.currentRound);
      if (!currentRound) return;
      endTimer();

      matchContext.states.addRound(currentRound);
      keyHandler.clearKeyDownEvent();
      CurrentPlayer.stopThinking();

      if (match.interfaceStage === "show-hands") {
        HostHero.setSprite(currentRound.host as HERO_STATUS);
        ChallengerHero.setSprite(currentRound.challenger as HERO_STATUS);
      }

      if (match.interfaceStage === "result-status") {
        if (currentRound.winner === "draw") {
          HostHero.setSprite(HERO_STATUS.LOSE);
          ChallengerHero.setSprite(HERO_STATUS.LOSE);
        }

        if (currentRound.winner === "host") {
          HostHero.setSprite(HERO_STATUS.WIN);
          ChallengerHero.setSprite(HERO_STATUS.LOSE);

          if (!finishedRound) {
            if(player.id === match.host){
              addScore("win");
            } else {
              addScore("lose");
            }
            confettiTo(HostHero.Hero);
            finishedRound = true;
          }
        }

        if (currentRound.winner === "challenger") {
          HostHero.setSprite(HERO_STATUS.LOSE);
          ChallengerHero.setSprite(HERO_STATUS.WIN);
          if (!finishedRound) {
            if(player.id === match.challenger){
              addScore("win");
            } else {
              addScore("lose");
            }
            confettiTo(ChallengerHero.Hero);
            finishedRound = true;
          }
        }
      }
    }
  });

  return Box({
    className: `flex flex-col grow gap-2 w-full min-w-[1000px] m-auto items-center justify-center relative ${ANIMATE.JELLY_BOUNCE_IN_RIGHT_FADE_IN}`,
    children: [
      timer,
      score,
      Box({
        className: "flex flex-row grow gap-2 w-full m-auto items-end relative",
        children: [
          Box({
            className: "w-1/2 flex justify-center items-end",
            children: HostHero.Hero
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