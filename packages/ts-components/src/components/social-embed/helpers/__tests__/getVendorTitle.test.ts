import { getVendorTitle } from '../getVendorTitle';

describe('getVendorTitle', () => {
  const mockSocialMediaVendors = {
    facebook: { id: 'FacebookID' },
    instagram: { id: 'InstagramID' }
  };

  it('should return "X (Twitter)" if the title is "twitter"', () => {
    const result = getVendorTitle('twitter', mockSocialMediaVendors);
    expect(result).toBe('X (Twitter)');
  });

  it('should return the id from socialMediaVendors if the title exists', () => {
    const result = getVendorTitle('facebook', mockSocialMediaVendors);
    expect(result).toBe('FacebookID');
  });

  it('should return the title if it does not exist in socialMediaVendors', () => {
    const result = getVendorTitle('linkedin', mockSocialMediaVendors);
    expect(result).toBe('linkedin');
  });

  it('should return the title if socialMediaVendors has no id for the given title', () => {
    const mockVendorsWithoutId = { pinterest: {} };
    const result = getVendorTitle('pinterest', mockVendorsWithoutId);
    expect(result).toBe('pinterest');
  });
});
