import { State } from "@jay-js/system";

// interfaces
import {
  IPlayerContext,
  IPlayerContextPrivateStates,
  IPlayerContextStates,
  IPlayerContextActions,
  IPlayer,
} from "./player.interfaces";

// dependencies
import { PlayerStates } from "./player.states";
import { PlayerActions } from "./player.actions";

class PlayerContext implements IPlayerContext {
  private privateStates: IPlayerContextPrivateStates;
  states: IPlayerContextStates;
  actions: IPlayerContextActions

  constructor() {
    this.privateStates = {
      playerData: State<IPlayer>({
        id: "",
        playername: ""
      })
    };
    
    this.states = new PlayerStates(this.privateStates);
    this.actions = new PlayerActions(this.states);
  }
}

export const playerContext = new PlayerContext();
