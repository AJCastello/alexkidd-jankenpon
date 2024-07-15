import { HEROES_ID } from "../constants";


export type THero = {
  id: HEROES_ID;
  name: string;
  img: string;
  avatar: string;
  width: number;
  height: number;
  scale: number;
}

export interface IPlayernameFormValues {
  playername: string;
}