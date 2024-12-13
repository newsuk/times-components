import { getVendorTitle } from '../getVendorTitle';
import { socialMediaVendors } from '../socialMediaVendors';

describe('getVendorTitle', () => {
  it('should return the correct title for twitter', () => {
    const title = getVendorTitle('twitter', socialMediaVendors);
    expect(title).toBe('X (Twitter)');
  });

  it('should return the correct title for youtube', () => {
    const title = getVendorTitle('youtube', socialMediaVendors);
    expect(title).toBe('Youtube');
  });

  it('should return the correct title for tiktok', () => {
    const title = getVendorTitle('tiktok', socialMediaVendors);
    expect(title).toBe('Tiktok');
  });

  it('should throw an error if the title does not exist in socialMediaVendors', () => {
    expect(() => getVendorTitle('nonexistent', socialMediaVendors)).toThrow();
  });
});
