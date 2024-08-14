import mockDate from 'mockdate';
import getActiveFlags from '../getActiveFlags';

describe('get active flags function', () => {
  //  GMT: Thursday, 14 March 2019 16:22:54
  beforeEach(() => {
    mockDate.set(1552580574000);
  });

  afterEach(() => {
    mockDate.reset();
  });

  it('returns only active flags', () => {
    const flags = [
      { expiryTime: '2020-03-13T12:00:00.000Z', type: 'UPDATED' },
      { expiryTime: '2019-03-14T12:00:00.000Z', type: 'EXCLUSIVE' }
    ];
    expect(getActiveFlags(flags)).toEqual([flags[0]]);
  });
  it('returns no flags when all have expired', () => {
    const flags = [
      { expiryTime: '2019-03-14T16:22:54.000Z', type: 'UPDATED' },
      { expiryTime: '2019-03-14T12:00:00.000Z', type: 'EXCLUSIVE' }
    ];
    expect(getActiveFlags(flags)).toEqual([]);
  });
  it('returns flags when expiry time is null', () => {
    const flags = [
      { expiryTime: null, type: 'UPDATED' },
      { expiryTime: null, type: 'EXCLUSIVE' }
    ];
    expect(getActiveFlags(flags)).toEqual(flags);
  });
  it('returns no flags when no flags are provided', () => {
    expect(getActiveFlags([])).toEqual([]);
  });
});
