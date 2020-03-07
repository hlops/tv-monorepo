import { FastifyInstance } from "fastify";
import * as fs from "fs";
import * as _ from "lodash";
import { QueryParams } from "../../logic/common/QueryParams";
import {
  Channel,
  ChannelHelper,
  ChannelOptions
} from "../../logic/playlist/Channel";
import { PlayListManager } from "../../logic/playlist/PlayListManager";

function createChannelDto(channel: Channel) {
  return {
    id: ChannelHelper.getHash(channel.url),
    title: channel.title,
    url: channel.url,
    group: channel.options[ChannelOptions.group]
  };
}

export default (
  server: FastifyInstance,
  opts: { prefix: string },
  next: (err?: Error) => void
) => {
  server.route({
    url: "/playlist",
    method: ["GET"],
    handler: async (request, reply) => {
      return new PlayListManager()
        .find(new QueryParams(request.query))
        .then(channels =>
          reply.send({
            channels: _.map(channels, channel => createChannelDto(channel))
          })
        );
    }
  });

  server.post("/playlist", {
    handler: (request, reply) => {
      new PlayListManager()
        .import(fs.createReadStream(request.body.file.tempFileName))
        .then(() => {
          reply.send();
        });
    }
  });

  next();
};
