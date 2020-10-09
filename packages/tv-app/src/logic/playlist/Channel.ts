import crypto from "crypto";
import _ from "lodash";
import { Channel, ChannelOptions } from "tv-common";

export class ChannelHelper {
  public static getHash(url: string): string {
    const md5sum = crypto.createHash("md5");
    return md5sum.update(url).digest("hex");
  }

  static find(channel: Channel, query: string): Channel | null {
    const lowerQuery = _.toLower(query);
    const searchValues = [channel.title, channel.options[ChannelOptions.group]];
    return !lowerQuery ||
      _.some(searchValues, value => {
        return !value || _.toLower(value).includes(lowerQuery);
      })
      ? channel
      : null;
  }
}
