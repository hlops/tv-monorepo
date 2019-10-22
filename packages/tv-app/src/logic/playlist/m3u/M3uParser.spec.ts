import { M3uParser } from './M3uParser';
import fs from 'fs';

describe('M3uParser', () => {
	it('parse() can parse m3u playlist from resources', done => {
		new M3uParser().parse(fs.createReadStream('./samples/playlist.m3u', 'utf8')).then(list => {
			expect(list).toMatchSnapshot();
			done();
		});
	});
});
