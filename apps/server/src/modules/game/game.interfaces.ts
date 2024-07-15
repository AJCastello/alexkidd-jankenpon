import { Socket } from "socket.io";

export interface IPlayer {
  id: string;
  playername: string;
  socket: Socket;
}

export interface IMatch {
  id: string;
  lobbyTimer: number;
  roundTimer: number;
  currentRound: number;
  interfaceStage: "playing" | "show-hands" | "result-status";
  status: "queue" | "ready" | "playing" | "finished";
  winner: string;
  looser: string;
  host: string;
  hostHero: string;
  challenger: string;
  challengerHero: string;
  rounds: TRound[];
  createdAt: Date;
}

export interface TRound {
  number: number;
  host: string;
  challenger: string;
  winner: string;
  status: "playing" | "finished";
}

// params
export type TSelectHero = {
  matchId: string,
  hero: string
}

export type TSelectHand = {
  matchId: string,
  hand: string
}


export interface IGameController {
  registerPlayer(socket: Socket, playername: string): void;
  findAndJoinMatch(socket: Socket): IMatch | undefined;
}