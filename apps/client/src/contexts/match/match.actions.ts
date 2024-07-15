import { io } from "socket.io-client"
import { playerContext } from "../player/player.context";

import {
  IMatchContextStates,
  IMatchContextActions,
  IMatchContextPrivateStorage,
  TMatchPlayers,
  TRound,
  TMatchManager,
  IMatch,
  TSelectedHeroes
} from "./match.interfaces";
import { HANDS, HEROES_ID } from "../../constants";

enum LISTENERS {
  CONNECT = "connect",
  MESSAGE = "message",
  DISCONNECT = "disconnect",
  ON_SELECT_HAND = "on-select-hand",
  MATCH_MANAGER = "match-manager",
  ON_SELECT_HERO = "on-select-hero",
  MATCH = "match",
  LOBBY_TIMER = "lobby-timer",
  MATCH_READY = "match-ready"
}

enum EMITTERS {
  SELECT_HAND = "select-hand",
  SELECT_HERO = "select-hero",
  FIND_MATCH = "find-match",
  FIND_AND_JOIN_MATCH = "find-and-join-match",
  LOBBY_START = "lobby-start",
  REGISTER_PLAYER = "register-player",
  START_MATCH = "start-match"
}

/**
 * Actions Layer 
 * ps.: 🪧 Avoid handle the DOM on this layer
 * @class MatchActions
 * @description Handle the actions of the match context
 * @implements IMatchContextActions
 * @param states
 * @param storage
 * @returns void
 */
export class MatchActions implements IMatchContextActions {
  states: IMatchContextStates;
  private storage: IMatchContextPrivateStorage;

  constructor(
    states: IMatchContextStates,
    storage: IMatchContextPrivateStorage
  ) {
    this.states = states;
    this.storage = storage;
  };

  /**
   * 👂 LISTENER: On Connect
   * @description Connect to the socket and register the player
   * @param callback
   * @returns void
   */
  onConnect(playername: string, callback: () => void) {
    const socket = this.storage.socket;
    socket.on(LISTENERS.CONNECT, () => {
      if (socket.id) {
        playerContext.states.setPlayer({
          id: socket.id,
          playername
        });
        callback();
      }
    });
    socket.emit(EMITTERS.REGISTER_PLAYER, playername);
    socket.connect();
  };

  /**
     * 👂 LISTENER: On Message
     * @description Listen to the message event and call the callback
     * @param callback
     * @returns void
     */
  onMessage(callback: (message: string) => void) {
    this.storage.socket.on(LISTENERS.MESSAGE, (message) => {
      callback(message);
    });
  };

  /**
   * 👂 LISTENER: On Disconnect
   * @description Listen to the disconnect event and call the callback
   * @param callback
   * @returns void
   */
  onDisconnect(callback: () => void) {
    this.storage.socket?.on(LISTENERS.DISCONNECT, () => {
      callback();
    });
  };

  /**
   * 👂 LISTENER: On Select Hand
   * @description Listen to the on-select-hand event, set the hand state and call the callback
   * @param callback 
   * @returns void
   */
  onSelectHand(callback: (hand: HANDS) => void) {
    this.storage.socket.on(LISTENERS.ON_SELECT_HAND, (hand: HANDS) => {
      this.states.setHand(hand);
      callback(hand);
    });
  };

  /**
   * 👂 LISTENER: On Round Result
   * @description Listen to the round-result event, add the round to the state and call the callback
   * @param callback 
   * @returns void
   */
  matchManager(callback: (match: IMatch) => void) {
    this.storage.socket.on(LISTENERS.MATCH_MANAGER, (match: IMatch) => {
      callback(match);
    });
    const matchId = this.states.getMatchId();
    this.storage.socket.emit(EMITTERS.START_MATCH, matchId);
  }

  /**
   * 👂 LISTENER: On Select Hero
   * @description Listen to the on-select-hero event, set the players state and call the callback
   * @param callback
   * @returns void
   */
  onSelectHero(callback: (heroes: TSelectedHeroes) => void) {
    this.storage.socket.on(LISTENERS.ON_SELECT_HERO, (heroes: TSelectedHeroes) => {
      this.states.setHeroes(heroes);
      callback(heroes);
    });
  };

  /**
   * 📤 EMITTER: Select Hero
   * @description Emit select-hero event to the server
   * @param hero
   * @returns void
   */
  emitSelectHero(hero: HEROES_ID) {
    const matchId = this.states.getMatchId();
    this.storage.socket.emit(EMITTERS.SELECT_HERO, {
      matchId,
      hero
    });
  };

  /**
   * 📤 EMITTER: Select Hand
   * @description Emit select-hand event
   * @param hand
   * @returns void
   */
  emitSelectHand(hand: HANDS) {
    const matchId = this.states.getMatchId();
    this.storage.socket.emit(EMITTERS.SELECT_HAND, {
      matchId,
      hand
    });
  }

  /**
   * 👋 HANDLER: Find and Join Match
   * @description Emits find a match method and listen to the match event, then set the room state and call the callback
   * @param callback
   * @returns void
   */
  findAndJoinMatch(callback: (match: IMatch) => void) {
    this.storage.socket.emit(EMITTERS.FIND_AND_JOIN_MATCH);
    this.storage.socket.on(LISTENERS.MATCH_READY, (match: IMatch) => {
      this.states.setMatch(match);
      callback(match);
    })
  };

  /**
   * 👋 HANDLER: Lobby Countdown
   * @description Emit lobby-start event and listen to lobby-timer event, then call the callback
   * @param callback
   * @returns void
   */
  lobbyTimer(callback: (time: number) => void) {
    this.storage.socket.emit(EMITTERS.LOBBY_START, this.states.getMatchId());
    this.storage.socket.on(LISTENERS.LOBBY_TIMER, (time) => {
      callback(time);
    });
  };

  /**
   * 👋 HANDLER: Clear
   * @description Clear the states and close the socket connection
   * @returns void
   */
  clear() {
    this.states.clear();
    this.storage.socket.disconnect();
    this.storage.socket.removeAllListeners();
  };
}