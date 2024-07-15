import { StateType } from "@jay-js/system";

import {
  IPlayerContextPrivateStates,
  IPlayerContextStates,
  IPlayer,
} from "./player.interfaces";

export class PlayerStates implements IPlayerContextStates {
  private playerData: StateType<IPlayer>;

  constructor(privateStates: IPlayerContextPrivateStates) {
    this.playerData = privateStates.playerData;
  } 

  getPlayer() {
    return this.playerData.get();
  }

  setPlayer(player: IPlayer) {
    this.playerData.set(player);
  }

  clear() {
    this.playerData.clear({} as IPlayer);
  }
}