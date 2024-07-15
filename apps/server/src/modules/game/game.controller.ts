import { Socket } from "socket.io";
import { MatchModel } from "./game.models";
import { IGameController, IMatch, IPlayer, TSelectHand, TSelectHero } from "./game.interfaces";
import { LogMethodsCalls } from "../../utils/Logger";

// @LogMethodsCalls("GameController")
export class GameController implements IGameController {
  private players: Map<string, IPlayer>;
  private matches: Map<string, IMatch>;

  constructor() {
    this.players = new Map<string, IPlayer>();
    this.matches = new Map<string, IMatch>();
  }

  registerPlayer(socket: Socket, playername: string) {
    const player: IPlayer = {
      id: socket.id,
      playername,
      socket,
    };
    this.players.set(socket.id, player);
  }

  findAndJoinMatch(socket: Socket) {
    const match = this.joinAvailableMatch(socket.id) || this.createNewMatch(socket.id);
    if (match) {
      socket.join(match.id);
      return match
    }
  }

  startMatch(matchId: string) {
    const match = this.matches.get(matchId);
    if (!match) return;
    match.roundTimer = 10;
    match.interfaceStage = "playing";
    this.createRound(match);
  }

  gameLoop(match: IMatch) {
    if (match.roundTimer === 0) {
      const round = match.rounds.find(round => round.status === "playing");

      if (round) {
        round.winner = this.getWinnerHand(round.host, round.challenger);
        round.status = "finished";
      }

      const validRounds = match.rounds.filter(round => round.winner !== "draw");

      if (validRounds.length === 3) {
        if (match.interfaceStage === "playing") {
          match.interfaceStage = "show-hands";
        }

        const hostWins = validRounds.filter(round => round.winner === match.host).length;
        const challengerWins = validRounds.filter(round => round.winner === match.challenger).length;

        if (hostWins > challengerWins) {
          match.winner = match.host;
          match.looser = match.challenger;
        } else {
          match.winner = match.challenger;
          match.looser = match.host;
        }
        setTimeout(() => {
          if (match.interfaceStage === "show-hands") {
            match.interfaceStage = "result-status";
          }
          setTimeout(() => {
            match.status = "finished";
          }, 5000);
        }, 3000);
      } else {
        if (match.interfaceStage === "playing") {
          match.interfaceStage = "show-hands";
        }
        setTimeout(() => {
          if (match.interfaceStage === "show-hands") {
            match.interfaceStage = "result-status";
          }
          setTimeout(() => {
            const round = match.rounds.find(round => round.status === "playing");
            if (!round) {
              match.roundTimer = 10;
              match.interfaceStage = "playing";
              this.createRound(match);
            }
          }, 5000);
        }, 3000);
      }
    }
    if (match.roundTimer > 0) {
      match.roundTimer--
    };
  }

  getMatch(matchId: string) {
    return this.matches.get(matchId);
  }

  getLobbyTimer(matchId: string) {
    const match = this.matches.get(matchId);
    if (!match) return 0;
    return match.lobbyTimer;
  }

  setLobbyTimer(matchId: string, timer: number) {
    const match = this.matches.get(matchId);
    if (!match) return;
    match.lobbyTimer = timer;
    return match.lobbyTimer;
  }

  selectHand(playerId: string, data: TSelectHand) {
    const match = this.matches.get(data.matchId);
    if (!match) return;
    const currentRound = match.rounds.find(round => round.number === match.currentRound);
    if (!currentRound) return;
    if (match.host === playerId) {
      currentRound.host = data.hand;
    } else {
      currentRound.challenger = data.hand;
    }
    return data.hand
  }

  selectHero(playerId: string, data: TSelectHero) {
    const match = this.matches.get(data.matchId);
    if (!match) return;

    if (match.host === playerId) {
      match.hostHero = data.hero;
    } else {
      match.challengerHero = data.hero;
    }
    return {
      id: match.id,
      hostHero: match.hostHero,
      challengerHero: match.challengerHero
    };
  }

  private createNewMatch(socketId: string) {
    const player = this.players.get(socketId);
    if (player) {
      const match = MatchModel(player);
      this.matches.set(match.id, match);
      return match;
    }
  }

  private createRound(match: IMatch) {
    const activeRound = match.rounds.find(round => round.status === "playing");
    if (activeRound) return;
    match.currentRound++;
    match.rounds.push({
      number: match.currentRound,
      host: "scissors",
      challenger: "scissors",
      winner: "",
      status: "playing"
    });
  }

  private joinAvailableMatch(id: string) {
    for (let [_id, match] of this.matches) {
      if (match.challenger === "") {
        match.challenger = id;
        match.status = "ready";
        return match;
      }
    }
    return;
  }

  private getWinnerHand(hostHand: string, challengerHand: string) {
    if (hostHand === challengerHand) return "draw";
    if (
      (hostHand === "rock" && challengerHand === "scissors") ||
      (hostHand === "scissors" && challengerHand === "paper") ||
      (hostHand === "paper" && challengerHand === "rock")
    ) {
      return "host";
    } else {
      return "challenger";
    }
  }

}