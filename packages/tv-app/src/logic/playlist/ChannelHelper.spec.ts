import { ChannelHelper } from './Channel';

describe('ChannelHelper', () => {
	it('getHash() returns expected value', () => {
		expect(ChannelHelper.getHash('aaa')).toBe('47bce5c74f589f4867dbd57e9ca9f808');
	});
});
