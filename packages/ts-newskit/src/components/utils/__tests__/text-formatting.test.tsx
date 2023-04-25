import { sanitiseCopy } from '../text-formatting';

describe('sanitiseCopy', () => {
  it('should return a decoded string', () => {
    const text = sanitiseCopy('Spotify&#8217;s most popular songs');
    expect(text).toBe('Spotify’s most popular songs');
  });

  it('should return html content correctly', () => {
    const text = sanitiseCopy(
      '<a href="www.some-url.com">Click here</a> if you want to <b>live</b>',
      { a: ['href'] }
    );
    expect(text).toBe('<a href>Click here</a> if you want to live');
  });
});
