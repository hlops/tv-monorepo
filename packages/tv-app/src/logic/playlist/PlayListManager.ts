import keyFileStorage from 'key-file-storage';
import { KeyFileStorage } from 'key-file-storage/dist/src/key-file-storage';
import _ from 'lodash';
import { ChannelHelper } from './Channel';
import { M3uParser } from './m3u/M3uParser';

export class PlayListManager {
	constructor(private readonly storage: KeyFileStorage = keyFileStorage('node_data', true)) {
		this.storage = storage;
	}

	public importPlayList(stream: NodeJS.ReadableStream): Promise<void> {
		return new M3uParser().parse(stream).then(channels => {
			return Promise.all(
				_.map(
					channels,
					channel =>
						this.storage(`channels/${ChannelHelper.getHash(channel.url)}`, channel)
				)
			).then();
		});
	}
}
