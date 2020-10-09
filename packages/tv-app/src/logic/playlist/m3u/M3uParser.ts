import readline from 'readline';
import _ from 'lodash';
import { Channel, ChannelOptions } from "tv-common";

export class M3uParser {
	public parse(input: NodeJS.ReadableStream): Promise<Channel[]> {
		const channels: Channel[] = [];
		let currentChannel: Channel | undefined;

		const rl = readline.createInterface({ input });

		return new Promise((resolve, reject) => {
			rl.on('line', (line: string) => {
				if (line.startsWith('#EXTM3U')) {
					this.parseEXTM3U(line);
				} else if (line.startsWith('#EXTINF')) {
					currentChannel = this.parseEXTINF(line);
				} else if (line && currentChannel) {
					channels.push(currentChannel);
					currentChannel.url = line;
					currentChannel = undefined;
				}
			});

			rl.on('close', () => {
				this.brushUp(channels);
				resolve(channels);
			});
			rl.on('SIGINT', () => {
				reject();
			});
		});
	}

	protected parseEXTM3U(line: string): _.Dictionary<string> {
		return _.transform<string, _.Dictionary<string>>(line.split(' '), (result, value) => {
			let attr = value.split('=');
			if (attr.length === 2) {
				result[this.trimQuotes(attr[0])] = this.trimQuotes(attr[1]);
			}
		});
	}

	protected parseEXTINF(line: string): Channel {
		let lines = line.split(',');
		if (lines.length < 2) {
			throw 'no comma in ' + line;
		}

		const options = _.transform<string, _.Dictionary<string>>(
			lines[0].split(' '),
			(result, value: string) => {
				let attr = value.split('=');
				if (attr.length === 2) {
					result[this.trimQuotes(attr[0])] = this.trimQuotes(attr[1]);
				}
			},
			{}
		);

		return { title: lines[1], url: '', options };
	}

	protected brushUp(channels: Channel[]): void {
		let group: string | undefined;
		_.forEach(channels, channel => {
			if (channel.options[ChannelOptions.group]) {
				group = channel.options[ChannelOptions.group];
			} else if (group) {
				channel.options[ChannelOptions.group] = group;
			}
		});
	}

	// noinspection JSMethodCanBeStatic
	protected trimQuotes(text: string = ''): string {
		return text.replace(/[\'\"]*(.*?)[\'\"]*/g, '$1');
	}
}
