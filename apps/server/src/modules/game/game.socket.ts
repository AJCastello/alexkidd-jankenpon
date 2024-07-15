import { Server, Socket } from "socket.io";
import { GameController } from "./game.controller";
import { LogMethodsCalls } from "../../utils/Logger";
import { IPlayer, TSelectHand, TSelectHero } from "./game.interfaces";

enum LISTENERS {
  CONNECTION = "connection",
  REGISTER_PLAYER = "register-player",
  FIND_AND_JOIN_MATCH = "find-and-join-match",
  SELECT_HERO = "select-hero",
  SELECT_HAND = "select-hand",
  LOBBY_START = "lobby-start",
  START_MATCH = "start-match"
}

enum EMITTERS {
  MATCH_READY = "match-ready",
  MATCH_MANAGER = "match-manager",
  ON_SELECT_HERO = "on-select-hero",
  ON_SELECT_HAND = "on-select-hand",
  LOBBY_TIMER = "lobby-timer"
}

// @LogMethodsCalls("GameSocket")
export class GameSocket {
  private io: Server;
  private controller: GameController;

  constructor(io: Server, controller: GameController) {
    this.io = io;
    this.controller = controller;
    this.initializeSocketEvents();
  }

  private initializeSocketEvents() {
    this.io.on(LISTENERS.CONNECTION, (socket) => {
      socket.on(LISTENERS.REGISTER_PLAYER, (playername: string) => this.registerPlayer(socket, playername));
      socket.on(LISTENERS.FIND_AND_JOIN_MATCH, () => this.findAndJoinMatch(socket));
      socket.on(LISTENERS.SELECT_HERO, (data: TSelectHero) => this.selectHero(socket, data));
      socket.on(LISTENERS.LOBBY_START, (matchId: string) => this.lobbyStart(matchId));
      socket.on(LISTENERS.SELECT_HAND, (data: TSelectHand) => this.selectHand(socket, data));
      socket.on(LISTENERS.START_MATCH, (matchId: string) => this.matchStart(socket, matchId));
      
    });
  }

  private registerPlayer(socket: Socket, playername: string) {
    this.controller.registerPlayer(socket, playername);
  }

  private findAndJoinMatch(socket: Socket) {
    const match = this.controller.findAndJoinMatch(socket);
    if (match && match.status === "ready") {
      this.io
        .in(match.id)
        .emit(EMITTERS.MATCH_READY, match);
    };
  }

  private selectHero(socket: Socket, data: TSelectHero) {
    const match = this.controller.selectHero(socket.id, data);
    if (match) {
      this.io
        .in(match.id)
        .emit(EMITTERS.ON_SELECT_HERO, match);
    };
  }

  private selectHand(socket: Socket, data: TSelectHand) {
    const hand = this.controller.selectHand(socket.id, data);
    socket.emit(EMITTERS.ON_SELECT_HAND, hand);
  }

  private matchStart(socket: Socket, matchId: string) {
    const match = this.controller.getMatch(matchId);
    if(!match) return;     
    if (match.roundTimer > 0) return;
    this.controller.startMatch(matchId);

    const gameLoop = setInterval(() => {
      this.controller.gameLoop(match);
      if (match.status === "finished") {
        clearInterval(gameLoop);
      }
      this.io
        .in(matchId)
        .emit(EMITTERS.MATCH_MANAGER, match);
    }, 1000)
  }

  private lobbyStart(matchId: string) {
    let timer = this.controller.getLobbyTimer(matchId);
    if (timer > 0) return;
    timer = 10;
    this.controller.setLobbyTimer(matchId, timer);
    const interval = setInterval(() => {
      timer -= 1;
      this.io
        .in(matchId)
        .emit(EMITTERS.LOBBY_TIMER, timer);
      if (timer === 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
}
