import { HANDS } from "../constants";
import { matchContext } from "../contexts/match/match.context";


export function keySelectHand(event: KeyboardEvent) {
  if (event.key.startsWith("Arrow")) {
    const currentHand = matchContext.states.getCurrentHand();

    let currentIndexChoice = Object.values(HANDS).indexOf(currentHand as any);
    if (event.key === "ArrowUp") {
      currentIndexChoice += Object.keys(HANDS).length - 1;
    }
    if (event.key === "ArrowDown") {
      currentIndexChoice += 1;
    }
    const HAND_CHOICES = Object.values(HANDS);
    const handSelected = HAND_CHOICES[currentIndexChoice % Object.keys(HANDS).length];
    console.log(handSelected);
    matchContext.actions.emitSelectHand(handSelected);
  }
}
