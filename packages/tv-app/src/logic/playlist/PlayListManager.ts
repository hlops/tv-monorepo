import keyFileStorage from "key-file-storage";
import { KeyFileStorage } from "key-file-storage/dist/src/key-file-storage";
import _ from "lodash";
import { QueryParams } from "../common/QueryParams";
import { Channel, ChannelHelper } from "./Channel";
import { M3uParser } from "./m3u/M3uParser";

const STORAGE_PREFIX = "channels/";

export class PlayListManager {
  constructor(
    private readonly storage: KeyFileStorage = keyFileStorage("node_data", true)
  ) {
    this.storage[STORAGE_PREFIX];
  }

  public import(stream: NodeJS.ReadableStream): Promise<void> {
    return new M3uParser().parse(stream).then(channels => {
      return Promise.all(
        _.map(channels, channel =>
          this.storage(
            `${STORAGE_PREFIX}${ChannelHelper.getHash(channel.url)}`,
            channel
          )
        )
      ).then();
    });
  }

  public find(params: QueryParams): Promise<Channel[]> {
    const first = params.page * params.pageSize;
    return this.storage(STORAGE_PREFIX)
      .then(ids =>
        Promise.all(
          _.map(ids, id =>
            this.storage(id).then(channel =>
              ChannelHelper.find(channel, params.query)
            )
          )
        )
      )
      .then(channels =>
        _.compact(channels || []).slice(first, first + params.pageSize)
      );
  }
}
