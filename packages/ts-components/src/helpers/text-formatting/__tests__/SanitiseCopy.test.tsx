import { sanitiseCopy } from '../SanitiseCopy';

describe('SanitiseCopy', () => {
  it('sanitise html entities', async () => {
    const copy = sanitiseCopy('Spotify&#8217;s most popular songs');
    expect(copy).toBe('Spotify’s most popular songs');
  });

  it('sanitise html tags', async () => {
    const copy = sanitiseCopy(
      '<div><span>Spotify’s most popular songs</span></div>'
    );
    expect(copy).toBe('Spotify’s most popular songs');
  });

  it('sanitise with allowed tags', async () => {
    const copy = sanitiseCopy(
      '<p><b>Spotify’s</b> most <i>popular</i> songs<br/><br/></p>',
      { br: {}, b: {}, i: {} }
    );
    expect(copy).toBe('<b>Spotify’s</b> most <i>popular</i> songs<br /><br />');
  });
});
