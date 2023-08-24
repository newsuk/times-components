import { getActiveArticleFlags } from '../getActiveArticleFlag';

describe('Data helper', () => {
  const active = '2050-03-13T13:00:00.000Z';
  const expired = '2000-03-13T13:00:00.000Z';

  describe('getActiveArticleFlags', () => {
    it('Returns the value of the flag if the expiry time is not set -- null', () => {
      const flags = [
        {
          type: 'LIVE',
          expiryTime: null
        }
      ];
      expect(getActiveArticleFlags(flags)).toEqual('LIVE');
    });
    it('Returns the lower case value of a flag is a flag is active', () => {
      const flags = [
        {
          type: 'BREAKING',
          expiryTime: active
        }
      ];
      expect(getActiveArticleFlags(flags)).toEqual('BREAKING');
    });
    it('Returns undefined if the flag has expired', () => {
      const flags = [
        {
          type: 'BREAKING',
          expiryTime: expired
        }
      ];
      expect(getActiveArticleFlags(flags)).toEqual(undefined);
    });
  });
});
