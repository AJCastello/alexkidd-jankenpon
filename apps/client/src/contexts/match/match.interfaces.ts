import { StateType } from "@jay-js/system";
import { Socket } from "socket.io-client";
import { HANDS, HEROES_ID } from "../../constants";

export type TMatchPlayers = {
  id: string;
  playername: string;
  hero: HEROES_ID;
};

export type TSelectedHeroes = {
  id: string;
  hostHero: HEROES_ID;
  challengerHero: HEROES_ID;
};

export interface TRound {
  number: number;
  status: "playing" | "finished";
  host: string;
  challenger: string;
  winner: string;
}

export interface IMatch {
  id: string;
  lobbyTimer: number;
  roundTimer: number;
  currentRound: number;
  currentHand: HANDS;
  interfaceStage: "playing" | "show-hands" | "result-status";
  status: "queue" | "ready" | "playing" | "finished";
  winner: string;
  looser: string;
  host: string;
  hostHero: HEROES_ID;
  challenger: string;
  challengerHero: HEROES_ID;
  rounds: TRound[];
  createdAt: Date;
}

export type TMatchManager = {
  timer: number;
  round?: TRound;
  matchResult?: string;
}

export interface IMatchContextPrivateStates {
  match: StateType<IMatch>;
};

export interface IMatchContextStates {
  getMatchId: () => string;
  getMatch: () => IMatch;
  setHeroes: (heroes: TSelectedHeroes) => void;
  setMatch: (match: IMatch) => void;
  setHand: (hand: HANDS) => void;
  addRound: (round: TRound) => void
  getCurrentHand: () => string;
  clear: () => void;
};

export interface IMatchContextActions {
  onConnect: (playername: string, callback: () => void) => void;
  onMessage: (callback: (message: string) => void) => void;
  onDisconnect: (callback: () => void) => void;
  onSelectHand: (callback: (hand: HANDS) => void) => void;
  matchManager: (callback: (match: IMatch) => void) => void;
  onSelectHero: (callback: (players: TSelectedHeroes) => void) => void;
  emitSelectHand: (hand: HANDS) => void;
  emitSelectHero: (hero: HEROES_ID) => void;
  findAndJoinMatch: (callback: (match: IMatch) => void) => void;
  lobbyTimer: (callback: (time: number) => void) => void;
  clear: () => void;
};

export interface IMatchContextPrivateStorage {
  socket: Socket;
};

export interface IMatchContext {
  states: IMatchContextStates;
  actions: IMatchContextActions;
};
