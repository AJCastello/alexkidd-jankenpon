import {
  IPlayerContextStates,
  IPlayerContextActions
} from "./player.interfaces";


export class PlayerActions implements IPlayerContextActions {
  states: IPlayerContextStates

  constructor(states: IPlayerContextStates) {
    this.states = states
  }

  hasPlayer() {
    const { playername, id } = this.states.getPlayer();
    return !!playername && !!id;
  }

  clear() {
    this.states.clear();
  }
}
