import { HEROES, HEROES_ID } from "../constants";
import { matchContext } from "../contexts/match/match.context";

type TArrowActions = Record<string, (index: number) => number>;

const HERO_CONTAINER_COLS = 2;

const arrowActions: TArrowActions = {
  ArrowRight: (index) => index + 1,
  ArrowLeft: (index) => index - 1,
  ArrowDown: (index) => index + HERO_CONTAINER_COLS,
  ArrowUp: (index) => index - HERO_CONTAINER_COLS,
};

let selectedHero = HEROES[0].id;

export function keySelectHero(e: KeyboardEvent): void {
  if (!e.key.startsWith("Arrow")) return;
  let index = HEROES.findIndex((hero) => hero.id === selectedHero);
  
  const action = arrowActions[e.key];
  if (action) {
    index = action(index);
  }
  if (index < 0) {
    index = HEROES.length - 1;
  } else if (index >= HEROES.length) {
    index = 0;
  }
  selectedHero = HEROES[index].id;
  matchContext.actions.emitSelectHero(selectedHero);
}