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
    (window as any).__tcfapi.mockImplementation(
      (command, version, callback) => {
        if (command === 'getCustomVendorConsents') {
          callback(
            {
              grants: { [mockVendorId]: { purposeGrants: { 1: true } } }
            },
            true
          );
        } else if (command === 'postCustomConsent') {
          callback(true, true);
        }
      }
    );

    enableCookies('facebook', setIsSocialEmbedAllowed);

    expect(window.__tcfapi).toHaveBeenCalledTimes(2);
    expect(window.__tcfapi).toHaveBeenNthCalledWith(
      1,
      'getCustomVendorConsents',
      2,
      expect.any(Function)
    );
    expect(window.__tcfapi).toHaveBeenNthCalledWith(
      2,
      'postCustomConsent',
      2,
      expect.any(Function),
      [mockVendorId],
      Object.keys({ 1: true }),
      []
    );

    expect(setIsSocialEmbedAllowed).toHaveBeenCalledTimes(1);
    expect(setIsSocialEmbedAllowed).toHaveBeenCalledWith(expect.any(Function));

    const setterFunction = setIsSocialEmbedAllowed.mock.calls[0][0];
    const prevState = {};
    const newState = setterFunction(prevState);
    expect(newState).toEqual({
      facebook: true
    });
  });

  it('should call __tcfapi with "postCustomConsent" if consent data and grants are available', () => {
    const purposeGrants = { 1: true };

    (window as any).__tcfapi
      .mockImplementationOnce((command, version, callback) => {
        if (command === 'getCustomVendorConsents') {
          callback(
            {
              grants: { [mockVendorId]: { purposeGrants } }
            },
            true
          );
        }
      })
      .mockImplementationOnce(
        (command, version, callback, vendors, purposes, specialPurposes) => {
          if (command === 'postCustomConsent') {
            callback(true, true);
          }
        }
      );

    enableCookies('facebook', setIsSocialEmbedAllowed);

    expect(window.__tcfapi).toHaveBeenCalledTimes(2);
    expect(window.__tcfapi).toHaveBeenNthCalledWith(
      1,
      'getCustomVendorConsents',
      2,
      expect.any(Function)
    );
    expect(window.__tcfapi).toHaveBeenNthCalledWith(
      2,
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
    expect(setIsSocialEmbedAllowed).not.toHaveBeenCalled();
  });

  it('should set isSocialEmbedAllowed to false if getCustomVendorConsents is unsuccessful', () => {
    (window as any).__tcfapi.mockImplementation(
      (command, version, callback) => {
        if (command === 'getCustomVendorConsents') {
          callback(null, false);
        }
      }
    );

    enableCookies('facebook', setIsSocialEmbedAllowed);

    expect(setIsSocialEmbedAllowed).toHaveBeenCalledTimes(1);
    expect(setIsSocialEmbedAllowed).toHaveBeenCalledWith(expect.any(Function));

    const setterFunction = setIsSocialEmbedAllowed.mock.calls[0][0];
    const prevState = {};
    const newState = setterFunction(prevState);
    expect(newState).toEqual({
      facebook: false
    });
  });

  it('should set isSocialEmbedAllowed to true when postCustomConsent is successful', () => {
    const purposeGrants = { 1: true };

    (window as any).__tcfapi
      .mockImplementationOnce((command, version, callback) => {
        if (command === 'getCustomVendorConsents') {
          callback(
            {
              grants: { [mockVendorId]: { purposeGrants } }
            },
            true
          );
        }
      })
      .mockImplementationOnce(
        (command, version, callback, vendors, purposes, specialPurposes) => {
          if (command === 'postCustomConsent') {
            callback(true, true);
          }
        }
      );

    enableCookies('facebook', setIsSocialEmbedAllowed);

    expect(window.__tcfapi).toHaveBeenCalledTimes(2);
    expect(window.__tcfapi).toHaveBeenNthCalledWith(
      1,
      'getCustomVendorConsents',
      2,
      expect.any(Function)
    );
    expect(window.__tcfapi).toHaveBeenNthCalledWith(
      2,
      'postCustomConsent',
      2,
      expect.any(Function),
      [mockVendorId],
      Object.keys(purposeGrants),
      []
    );

    expect(setIsSocialEmbedAllowed).toHaveBeenCalledTimes(1);
    expect(setIsSocialEmbedAllowed).toHaveBeenCalledWith(expect.any(Function));

    const setterFunction = setIsSocialEmbedAllowed.mock.calls[0][0];
    const prevState = {};
    const newState = setterFunction(prevState);
    expect(newState).toEqual({
      facebook: true
    });
  });

  it('should set isSocialEmbedAllowed to false when postCustomConsent is unsuccessful', () => {
    const purposeGrants = { 1: true };

    (window as any).__tcfapi
      .mockImplementationOnce((command, version, callback) => {
        if (command === 'getCustomVendorConsents') {
          callback(
            {
              grants: { [mockVendorId]: { purposeGrants } }
            },
            true
          );
        }
      })
      .mockImplementationOnce(
        (command, version, callback, vendors, purposes, specialPurposes) => {
          if (command === 'postCustomConsent') {
            callback(false, false);
          }
        }
      );

    enableCookies('facebook', setIsSocialEmbedAllowed);

    expect(window.__tcfapi).toHaveBeenCalledTimes(2);
    expect(window.__tcfapi).toHaveBeenNthCalledWith(
      1,
      'getCustomVendorConsents',
      2,
      expect.any(Function)
    );
    expect(window.__tcfapi).toHaveBeenNthCalledWith(
      2,
      'postCustomConsent',
      2,
      expect.any(Function),
      [mockVendorId],
      Object.keys(purposeGrants),
      []
    );

    expect(setIsSocialEmbedAllowed).toHaveBeenCalledTimes(1);
    expect(setIsSocialEmbedAllowed).toHaveBeenCalledWith(expect.any(Function));

    const setterFunction = setIsSocialEmbedAllowed.mock.calls[0][0];
    const prevState = {};
    const newState = setterFunction(prevState);
    expect(newState).toEqual({
      facebook: false
    });
  });
});
