import { checkVendorConsent } from '../vendorConsent';
import { VendorName } from '../../types';

describe('checkVendorConsent', () => {
  let setIsSocialEmbedAllowed: jest.Mock;

  beforeEach(() => {
    setIsSocialEmbedAllowed = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('calls setIsSocialEmbedAllowed with true if vendor consent is found', () => {
    const mockVendorName: VendorName = 'twitter';
    // Mock window.__tcfapi function
    (window as any).__tcfapi = jest.fn((command, version, callback) => {
      callback(
        { consentedVendors: [{ name: 'twitter' }] },
        true // success
      );
    });

    checkVendorConsent(mockVendorName, setIsSocialEmbedAllowed);

    expect(setIsSocialEmbedAllowed).toHaveBeenCalledWith(true);
    expect((window as any).__tcfapi).toHaveBeenCalledWith(
      'getCustomVendorConsents',
      2,
      expect.any(Function)
    );
  });

  it('calls setIsSocialEmbedAllowed with false if vendor consent is not found', () => {
    const mockVendorName: VendorName = 'twitter';
    (window as any).__tcfapi = jest.fn((command, version, callback) => {
      callback(
        { consentedVendors: [{ name: 'Other Vendor' }] },
        true
      );
    });

    checkVendorConsent(mockVendorName, setIsSocialEmbedAllowed);

    expect(setIsSocialEmbedAllowed).toHaveBeenCalledWith(false);
  });

  it('logs an error message if fetching consent data fails', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const mockVendorName: VendorName = 'twitter';
    (window as any).__tcfapi = jest.fn((command, version, callback) => {
      callback(null, false); // indicate failure
    });

    checkVendorConsent(mockVendorName, setIsSocialEmbedAllowed);

    expect(setIsSocialEmbedAllowed).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      `Error fetching consent data or ${mockVendorName} embed not allowed`
    );

    consoleSpy.mockRestore();
  });

  it('does nothing if window.__tcfapi is undefined', () => {
    delete (window as any).__tcfapi;
    const mockVendorName: VendorName = 'twitter';

    checkVendorConsent(mockVendorName, setIsSocialEmbedAllowed);

    expect(setIsSocialEmbedAllowed).not.toHaveBeenCalled();
  });
});
