import { enableCookies } from '../enableCookies';

jest.mock('../socialMediaVendors', () => ({
  socialMediaVendors: {
    facebook: { id: 'facebookId' },
    twitter: { id: 'twitterId' }
  }
}));

describe('enableCookies', () => {
  const mockVendorId = 'facebookId';
  const setIsSocialEmbedAllowed = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (window as any).__tcfapi = jest.fn();
  });

  it('should call __tcfapi with "getCustomVendorConsents" for the vendor', () => {
    (window as any).__tcfapi = jest.fn((command, version, callback) => {
      // tslint:disable-next-line:no-console
      console.log('command, version', command, version);
      callback(
        {
          grants: { [mockVendorId]: { purposeGrants: { 1: true } } }
        },
        true
      );
    });

    enableCookies('facebook', setIsSocialEmbedAllowed);
    expect(window.__tcfapi).toHaveBeenCalledWith(
      'getCustomVendorConsents',
      2,
      expect.any(Function)
    );
  });

  it('should call postCustomConsent if consent data and grants are available', () => {
    const purposeGrants = { 1: true };
    (window as any).__tcfapi = jest.fn((command, version, callback) => {
      // tslint:disable-next-line:no-console
      console.log('command, version', command, version);
      if (command === 'getCustomVendorConsents') {
        callback(
          {
            grants: { [mockVendorId]: { purposeGrants } }
          },
          true
        );
      }
    });

    enableCookies('facebook', setIsSocialEmbedAllowed);

    expect(window.__tcfapi).toHaveBeenCalledWith(
      'postCustomConsent',
      2,
      expect.any(Function),
      [mockVendorId],
      Object.keys(purposeGrants),
      []
    );
  });

  it('should not call __tcfapi if __tcfapi is not defined', () => {
    delete (window as any).__tcfapi;

    enableCookies('facebook', setIsSocialEmbedAllowed);

    expect(window.__tcfapi).toBeUndefined();
  });
});
