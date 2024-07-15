import Fastify from "fastify";
import fastifyWebsocket from "fastify-socket.io";
import fastifyCors from "@fastify/cors";
import { GameSocket } from "../modules/game/game.socket";
import { GameController } from "../modules/game/game.controller";

export const app = Fastify({ logger: true });

export async function main() {
  await app.register(fastifyWebsocket, {
    cors: {
      origin: "*"
    }
  });

  await app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST"]
  });

  const gameController = new GameController();
  const gameSocket = new GameSocket(app.io, gameController);

  app.listen({
    host: "0.0.0.0",
    port: 3000
  }, err => {
    if (err) {
      process.exit(1)
    }
  });
};