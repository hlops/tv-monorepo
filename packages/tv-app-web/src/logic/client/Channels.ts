import * as _ from "lodash-es";
import * as rxjs from "rxjs";
import * as rxjsOperators from "rxjs/operators";
import { writable } from "svelte/store";

interface Dictionary<T> {
  [index: string]: T;
}

enum UpdateModifier {
  UPDATE,
  ADD,
  DELETE
}

interface Channel {
  id: string;
  title: string;
  url: string;
  group: string;
}

interface ModifiedChannel {
  channel: Channel;
  modifier: UpdateModifier;
}

export const channels = writable<Channel[] | undefined>(undefined);
export const channelGroups = writable<string[]>([]);

const modifiedChannels = new rxjs.Subject<ModifiedChannel>();

export function modifyChannel(channel: Channel): void {
  modifiedChannels.next({ channel, modifier: UpdateModifier.UPDATE });
}

export function deleteChannel(channel: Channel): void {
  modifiedChannels.next({ channel, modifier: UpdateModifier.DELETE });
}

function loadChannels(): void {
  fetch("//localhost:3000/playlist")
    .then(response => response.json())
    .then(json =>
      channels.set(
        _.map<Channel, Channel>(json.channels, (channel, index) => {
          channel.id = "" + index;
          return channel;
        })
      )
    );
}

loadChannels();

abstract class Tracker {
  private readonly subscriptions: rxjs.Unsubscribable[] = [];

  public subscribe(subscription: rxjs.Unsubscribable): void {
    this.subscriptions.push(subscription);
  }

  public subscribeStore(unsubscribe: () => void): void {
    this.subscriptions.push({ unsubscribe });
  }

  public onDestroy(): void {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }
}

const DEBOUNCE_TIME = 3000;

export class ModifiedChannelsTracker extends Tracker {
  constructor() {
    super();
    this.subscribe(
      modifiedChannels
        .pipe(
          rxjsOperators.buffer(modifiedChannels.pipe(rxjsOperators.debounceTime(DEBOUNCE_TIME)))
        )
        .subscribe(value => {
          console.log("value changed", value);
        })
    );
  }
}

export class ChannelsGroupsTracker extends Tracker {
  constructor() {
    super();
    this.subscribeStore(
      channels.subscribe(value => {
        const map = _.reduce<Channel, Dictionary<true>>(
          value,
          (result, channel) => {
            result[channel.group] = true;
            return result;
          },
          {}
        );
        channelGroups.set(_.keys(map));
      })
    );
    this.subscribe(
      modifiedChannels.subscribe(modifiedCahnnel => {
        channelGroups.update(groups => {
          const group = modifiedCahnnel.channel.group;
          if (!groups.includes(group)) {
            groups.unshift(group);
          }
          return groups;
        });
      })
    );
  }
}
