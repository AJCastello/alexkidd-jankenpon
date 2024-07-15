import { Server } from "socket.io";
import { Game } from "../modules/game/game.controller";

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
    game: any,
  };  
}