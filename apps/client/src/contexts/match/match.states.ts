import { StateType } from "@jay-js/system";

// interfaces
import {
  IMatch,
  IMatchContextPrivateStates,
  IMatchContextStates,
  TRound,
  TSelectedHeroes
} from "./match.interfaces";
import { playerContext } from "../player/player.context";
import { HANDS } from "../../constants";

export class MatchStates implements IMatchContextStates {
  private match: StateType<IMatch>;

  constructor(privateStates: IMatchContextPrivateStates) {
    this.match = privateStates.match;
  }

  setHand(hand: HANDS) {
    this.match.set(match => ({
      ...match,
      currentHand: hand
    }));
  }

  addRound(round: TRound) {
    this.match.set(match => {
      match.rounds.push(round);
      return match;
    });
  }

  getCurrentHand() {
    const { currentHand } = this.match.get();
    return currentHand;
  }

  getMatch() {
    return this.match.get();
  }

  setMatch(match: IMatch) {
    this.match.set(match);
  }

  setHeroes(heroes: TSelectedHeroes) {
    this.match.set(match => ({
      ...match,
      ...heroes
    }));
  }

  getMatchId() {
    const { id } = this.match.get();
    return id;
  }

  clear() {
    this.match.clear({} as IMatch);
  }
}
