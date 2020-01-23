import { FastifyInstance } from "fastify";
import * as fs from "fs";
import { IncomingMessage, Server, ServerResponse } from "http";
import { Readable } from "stream";
import {QueryParams} from "../../logic/common/QueryParams";
import { PlayListManager } from "../../logic/playlist/PlayListManager";

export default (
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) => {
  server.route({
    url: "/playlist",
    method: ["GET", "HEAD"],
    handler: async (request, reply) => {
      return new PlayListManager()
        .findPlayLists(new QueryParams(request.query))
        .then(channels => reply.send({ channels }));
    }
  });

  server.post("/playlist", {
    handler: (request, reply) => {
      new PlayListManager()
        .importPlayList(fs.createReadStream(request.body.file.tempFileName))
        .then(() => {
          reply.send();
        });
    }
  });

  next();
};
