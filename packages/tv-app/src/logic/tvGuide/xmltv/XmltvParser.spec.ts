import fs from 'fs';
import _ from "lodash";
import { XmltvParser } from './XmltvParser';

describe('XmltvParser', () => {
	it('parse() can parse xmltv file from resources', done => {
		new XmltvParser()
			.parse(fs.createReadStream('./samples/xmltv-small.xml', 'utf8'))
			.then(channels => {
                expect(channels).toMatchSnapshot();
				done();
			});
	});
});
