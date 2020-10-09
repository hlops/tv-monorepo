interface Dictionary<T> {
  [index: string]: T;
}

export enum ActionType {
  PLAYLIST = 'playlist',
  GUIDE = 'guide'
}

export interface Action {
  id: string;
  title: string;
  cron?: string;
  history: string[];
  type: string;
  url: string;
}

export enum ChannelOptions {
  group = "group-title"
}

export interface Channel {
  title: string;
  url: string;
  options: Dictionary<string>;
}
