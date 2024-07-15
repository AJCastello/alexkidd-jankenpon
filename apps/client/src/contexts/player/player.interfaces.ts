import { StateType } from "@jay-js/system";

export interface IPlayer {
  id: string;
  playername: string;
};

export interface IPlayerContextPrivateStates {
  playerData: StateType<IPlayer>;
}

export interface IPlayerContextStates {
  getPlayer: () => IPlayer;
  setPlayer: (player: IPlayer) => void;
  clear: () => void;
}

export interface IPlayerContextActions {
  hasPlayer: () => boolean;
  clear: () => void;
}

export interface IPlayerContext {
  states: IPlayerContextStates;
  actions: IPlayerContextActions;
}
