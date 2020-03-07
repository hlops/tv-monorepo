import keyFileStorage from "key-file-storage";
import { KeyFileStorage } from "key-file-storage/dist/src/key-file-storage";
import _ from "lodash";
import { XmltvParser } from "./xmltv/XmltvParser";

const STORAGE_PREFIX = "guide/";

export class TvGuideManager {
  constructor(
    private readonly storage: KeyFileStorage = keyFileStorage("node_data", true)
  ) {
    this.storage[STORAGE_PREFIX];
  }

  public importXmltv(stream: NodeJS.ReadableStream): Promise<void> {
    return new XmltvParser().parse(stream).then(channels => {
      return Promise.all(
        _.map(channels, (channel, name) =>
          this.storage(`guide/${name}`, channel)
        )
      ).then();
    });
  }

  public find(): Promise<string[]> {
    return this.storage<string>(STORAGE_PREFIX).then(guides => {
      return _.map(guides, name => name.substr(STORAGE_PREFIX.length));
    });
  }
}
