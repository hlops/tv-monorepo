import _ from 'lodash';
import moment from 'moment';
import {QualifiedTag, Tag} from "sax";
import * as sax from 'sax';
import { SAXStream } from 'sax';
import stream from 'stream';
import Readable from 'stream';
import zlib = require('zlib');

type Node = Tag;

export interface Programme {
	start: Date;
	stop: Date;
	title: string;
	categories?: [];
	desc?: string;
}

export class XmltvParser extends stream.Writable {
	private _currentNode?: Node;
	private _parentNodes: Node[] = [];
	private _xmlParser: SAXStream;

	constructor() {
		super();

		const channels: _.Dictionary<string> = {};

		this._xmlParser = sax.createStream(true, {
			trim: true,
			position: false
		});

		this.on('finish', () => {
			this._xmlParser.end();
		});

		this._xmlParser.on('end', () => {
			this.emit('end');
		});

		this._xmlParser.on('error', error => {
			this.emit('error', error);
		});

		this._xmlParser.on('opentag', (node: Node) => {
			this._currentNode = node;
			if (!_.get(_.last(this._parentNodes), 'isSelfClosing')) {
				this._parentNodes.push(node);
			}
		});

		this._xmlParser.on('closetag', (tagName: string) => {
			if (tagName === 'programme') {
				let node = this._parentNodes[this._parentNodes.length - 1];
				this.emit('programme', channels[node.attributes.channel], {
					start: XmltvParser.parseDate(node.attributes.start),
					stop: XmltvParser.parseDate(node.attributes.stop),
					title: node.attributes.title,
					categories: node.attributes.categories,
					desc: node.attributes.desc
				});
			}
			this._parentNodes.pop();
		});

		this._xmlParser.on('text', text => {
            const node = this._parentNodes[this._parentNodes.length - 2];
			if (node && this._currentNode) {
				switch (this._currentNode.name) {
					case 'display-name': {
						if (node.name === 'channel') {
							channels[node.attributes.id] = text;
						}
						break;
					}
					case 'category': {
						if (node.name === 'programme') {
							if (!node.attributes.categories) {
								_.set(node.attributes, 'categories',  []);
							}
							const categories = node.attributes.categories as unknown;
                            (categories as string[]).push(text);
						}
						break;
					}
					case 'title':
					case 'desc': {
						if (node && node.name === 'programme') {
							node.attributes[this._currentNode.name] = text;
						}
					}
				}

				const nodeName = this._currentNode.name;
				if (nodeName === 'display-name') {
				} else if (nodeName === 'display-name') {
				} else if (['title', 'desc'].indexOf(nodeName) >= 0) {
				}
			}
		});
	}

	static parseDate(date: string): Date {
		const parsed = moment(date, 'YYYYMMDDHHmmss Z', true);
		return parsed.toDate();
	}

	_write(chunk: any, encoding: string, callback: Function): void {
		this._xmlParser.write(chunk, encoding);
		callback();
	}

	public parseGzip(input: Readable): Promise<_.Dictionary<Programme[]>> {
		return this.parse(input.pipe(zlib.createGunzip()));
	}

	public parse(input: Readable): Promise<_.Dictionary<Programme[]>> {
		const parser = new XmltvParser();
		input.pipe(parser);
		const channels: _.Dictionary<Programme[]> = {};

		return new Promise((resolve, reject) => {
			parser.on('programme', (channel: string, programme: Programme) => {
				if (!channels[channel]) {
					channels[channel] = [];
				}
				channels[channel].push(programme);
			});

			parser.on('end', () => {
				resolve(channels);
			});

			parser.on('error', error => {
				reject(error);
			});
		});
	}
}
