import fs from 'fs';
import keyFileStorage from 'key-file-storage';
import { KeyFileStorage } from 'key-file-storage/dist/src/key-file-storage';
import { PlayListManager } from './PlayListManager';

let storage: KeyFileStorage;

describe('PlayListManager', () => {
	beforeAll(() => {
		storage = keyFileStorage('node_data/test', true);
	});

    afterAll(() => {
        delete storage['*'];
    });

    beforeEach(() => {
		delete storage['*'];
	});

    it('importPlayList() can successfully import channels', done => {
		new PlayListManager(storage)
			.importPlayList(fs.createReadStream('./samples/playlist.m3u', 'utf8'))
			.then(() => {
				expect(storage['channels/']).toMatchSnapshot();
				done();
			});
	});
});
