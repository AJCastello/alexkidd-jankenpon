// heros
import AlexKidd from "../assets/images/alexkidd.webp";
import Gooseka from "../assets/images/gooseka.webp";
import Chokkina from "../assets/images/chokkina.webp";
import Paparlin from "../assets/images/paparlin.webp";
import Janken from "../assets/images/janken.webp";

// avatars
import AlexKiddAvt from "../assets/images/alexkidd_avt.webp";
import GoosekaAvt from "../assets/images/gooseka_avt.webp";
import ChokkinaAvt from "../assets/images/chokkina_avt.webp";
import PaparlinAvt from "../assets/images/parpalin_avt.webp";
import JankenAvt from "../assets/images/janken_avt.webp";

import { THero } from "../types";

export enum ANIMATE {
  BOUNCE_IN_FADE_IN = "bounceInFadeIn",
  BOUNCE_IN_TOP_FADE_IN = "bounceInTopFadeIn",
  JELLY_BOUNCE_IN_RIGHT_FADE_IN = "jellyBounceInRightFadeIn",
  JELLY_BOUNCE_OUT_LEFT_FADE_OUT = "jellyBounceOutLeftFadeOut",
  JELLY_BOUNCE_OUT_TOP_FADE_OUT = "jellyBounceOutTopFadeOut",
  JELLY_BOUNCING = "jellyBouncing"
}

export enum HANDS {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors"
}

export enum HEROES_ID {
  ALEXKIDD = "alexkidd",
  PAPARLIN = "paparlin",
  GOOSEKA = "gooseka",
  CHOKKINA = "chokkina",
  JANKEN = "janken",
}

export enum HERO_STATUS {
  WIN = "win",
  LOSE = "lost",
  DEFAULT = "default",
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors"
}

export const HEROES: THero[] = [
  {
    id: HEROES_ID.ALEXKIDD,
    name: "Alex Kidd",
    img: AlexKidd,
    avatar: AlexKiddAvt,
    width: 410,
    height: 450,
    scale: 0.75
  },
  {
    id: HEROES_ID.PAPARLIN,
    name: "Paparlin",
    img: Paparlin,
    avatar: PaparlinAvt,
    width: 647,
    height: 467,
    scale: 0.75
  },
  {
    id: HEROES_ID.GOOSEKA,
    name: "Gooseka",
    img: Gooseka,
    avatar: GoosekaAvt,
    width: 475,
    height: 400,
    scale: 0.75
  },
  {
    id: HEROES_ID.CHOKKINA,
    name: "Chokkina",
    img: Chokkina,
    avatar: ChokkinaAvt,
    width: 450,
    height: 518,
    scale: 0.75
  },
  {
    id: HEROES_ID.JANKEN,
    name: "Janken",
    img: Janken,
    avatar: JankenAvt,
    width: 1000,
    height: 825,
    scale: 0.50
  }
];

export const HERO_POSITIONS = {
  default: 0,
  win: 0,
  lost: 1,
  rock: 2,
  scissors: 3,
  paper: 4,
}

export const HAND_OPTIONS = {
  scissors: 0,
  paper: 1,
  rock: 2,
  w: (180 * 0.6),
  h: (165 * 0.6)
}
