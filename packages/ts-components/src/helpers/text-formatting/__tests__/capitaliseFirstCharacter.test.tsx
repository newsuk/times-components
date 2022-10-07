import { capitaliseFirstCharacter } from '../CapitaliseFirstCharacter';

describe('capitaliseFirstCharacter()', () => {
  it('capitalizes the first character of a string', async () => {
    const copy = capitaliseFirstCharacter('sport');
    expect(copy).toBe('Sport');
  });

  it('returns early when a string is not passed as a parameter', async () => {
    const copy = capitaliseFirstCharacter();
    expect(copy).toBe(undefined);
  });
});
