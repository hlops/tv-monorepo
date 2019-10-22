import fs from 'fs';
import keyFileStorage from 'key-file-storage';
import { KeyFileStorage } from 'key-file-storage/dist/src/key-file-storage';
import { PlayListManager } from '../playlist/PlayListManager';
import { TvGuideManager } from './TvGuideManager';

let storage: KeyFileStorage;

describe('TvGuideManager', () => {
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
		new TvGuideManager(storage)
			.importXmltv(fs.createReadStream('./samples/xmltv-small.xml', 'utf8'))
			.then(() => {
				expect(storage['guide/']).toMatchSnapshot();
                expect(storage['guide/CBS Affiliate']).toMatchSnapshot();
				done();
			});
	});
});
