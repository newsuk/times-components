import { getSlice } from '../getSlice';

describe('getSlice()', () => {
  it('should return a slice', () => {
    const result = getSlice('LEAD_1');
    expect(result.children[0].article!.headline).toBe;
  });

  it('should not return a slice', () => {
    const result = getSlice('LEAD_10038033');
    expect(result).toEqual({ children: [], name: 'UNDEFINED' });
  });
});
