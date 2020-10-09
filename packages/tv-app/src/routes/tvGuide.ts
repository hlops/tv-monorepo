import { FastifyInstance } from "fastify";
import * as fs from "fs";
import { TvGuideManager } from "../logic/tvGuide/TvGuideManager";

export default (
  server: FastifyInstance,
  opts: { prefix: string },
  next: (err?: Error) => void
) => {
  server.route({
    url: "/tvGuide",
    method: ["GET"],
    handler: async (request, reply) => {
      console.log(request, opts);
      return new TvGuideManager()
        .find()
        .then(guides =>
          reply.send({
            names: guides
          })
        );
    }
  });

  server.post("/tvGuide", {
    handler: (request, reply) => {
      new TvGuideManager()
        .importXmltv(fs.createReadStream(request.body.file.tempFileName))
        .then(() => {
          reply.send();
        });
    }
  });

  next();
};
