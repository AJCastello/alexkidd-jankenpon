import { State } from "@jay-js/system";

// interfaces
import {
  IMatchContext,
  IMatchContextPrivateStates,
  IMatchContextStates,
  IMatchContextActions,
  IMatchContextPrivateStorage,
  IMatch
} from "./match.interfaces";

// dependencies
import { MatchStates } from "./match.states";
import { MatchActions } from "./match.actions";
import { HANDS, HEROES_ID } from "../../constants";
import { io } from "socket.io-client";

class MatchContext implements IMatchContext {
  private privateStates: IMatchContextPrivateStates;
  private storage: IMatchContextPrivateStorage;
  states: IMatchContextStates;
  actions: IMatchContextActions

  constructor() {
    this.privateStates = {
      match: State<IMatch>({
        id: "",
        lobbyTimer: 0,
        roundTimer: 0,
        currentRound: 0,
        currentHand: HANDS.SCISSORS,
        interfaceStage: "playing",
        status: "queue",
        winner: "",
        looser: "",
        host: "",
        hostHero: HEROES_ID.ALEXKIDD,
        challenger: "",
        challengerHero: HEROES_ID.ALEXKIDD,
        rounds: [],
        createdAt: new Date()
      })
    };

    this.storage = {
      socket: io(import.meta.env.VITE_SOCKET_URL, { autoConnect: false }),
    };

    this.states = new MatchStates(this.privateStates);
    this.actions = new MatchActions(this.states, this.storage);
  }
}

export const matchContext = new MatchContext();
