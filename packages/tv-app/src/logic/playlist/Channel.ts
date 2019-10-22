import crypto from 'crypto';

export enum ChannelOptions {
	group = 'group-title'
}

export interface Channel {
	title: string;
	url: string;
	options: _.Dictionary<string>;
}

export class ChannelHelper {
	public static getHash(url: string): string {
		const md5sum = crypto.createHash('md5');
		return md5sum.update(url).digest('hex');
	}
}
