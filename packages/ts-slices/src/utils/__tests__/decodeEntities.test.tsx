import { decodeEntities } from '../decodeEntities';

describe('decodeEntities', () => {
  it('should return a decoded string', () => {
    const img = decodeEntities('Spotify&#8217;s most popular songs');
    expect(img).toBe('Spotify’s most popular songs');
  });
});
