import { checkVendorConsent } from '../vendorConsent';
import { VendorName } from '../../types';

describe('checkVendorConsent', () => {
  const mockVendorName: VendorName = 'twitter';

  beforeEach(() => {
    // Reset the __tcfapi mock before each test
    delete (window as any).__tcfapi;
  });

  it('returns true if the vendor has given consent', () => {
    // Mock __tcfapi to simulate vendor consent
    (window as any).__tcfapi = jest.fn((command, version, callback) => {
      // tslint:disable-next-line:no-console
      console.log(version);
      if (command === 'getCustomVendorConsents') {
        callback({ consentedVendors: [{ name: mockVendorName }] }, true);
      }
    });

    const result = checkVendorConsent(mockVendorName);
    expect(result).toBe(true);
  });

  it('returns false if the vendor has not given consent', () => {
    // Mock __tcfapi to simulate no consent given by vendor
    (window as any).__tcfapi = jest.fn((command, version, callback) => {
      // tslint:disable-next-line:no-console
      console.log(version);
      if (command === 'getCustomVendorConsents') {
        callback({ consentedVendors: [{ name: 'otherVendor' }] }, true);
      }
    });

    const result = checkVendorConsent(mockVendorName);
    expect(result).toBe(false);
  });

  it('returns false if __tcfapi is not available', () => {
    const result = checkVendorConsent(mockVendorName);
    expect(result).toBe(false);
  });

  it('logs an error and returns false on callback failure', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    (window as any).__tcfapi = jest.fn((command, version, callback) => {
      // tslint:disable-next-line:no-console
      console.log(command, version);
      callback(null, false);
    });

    const result = checkVendorConsent(mockVendorName);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Error fetching consent data or ${mockVendorName} embed not allowed`
    );
    expect(result).toBe(false);

    consoleSpy.mockRestore();
  });
});
