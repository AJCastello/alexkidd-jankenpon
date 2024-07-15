import { IMatch, IPlayer } from "./game.interfaces";

export function MatchModel(
  player: IPlayer
): IMatch {
  return {
    id: `room-${Date.now()}-${player.socket.id}`,
    lobbyTimer: 0,
    roundTimer: 0,
    currentRound: 0,
    status: "queue",
    winner: "",
    looser: "",
    interfaceStage: "playing",
    host: player.socket.id,
    hostHero: "",
    challenger: "",
    challengerHero: "",
    rounds: [],
    createdAt: new Date(),
  };
}
