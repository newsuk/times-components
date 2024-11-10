import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  BlockedEmbedMessage,
  BlockedEmbedMessageProps
} from '../BlockedEmbedMessage';
import { enableCookies } from '../helpers/enableCookies';

jest.mock('../helpers/enableCookies', () => ({
  enableCookies: jest.fn()
}));

jest.mock('../helpers/privacyModal', () => ({
  openPrivacyModal: jest.fn()
}));

jest.mock('../helpers/socialMediaVendors', () => ({
  socialMediaVendors: {
    twitter: { id: 'twitterId' }
  }
}));

describe('BlockedEmbedMessage', () => {
  const mockSetIsAllowedOnce = jest.fn();

  const defaultProps: BlockedEmbedMessageProps = {
    vendorName: 'twitter',
    setIsAllowedOnce: mockSetIsAllowedOnce
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (window as any).__tcfapi = jest.fn();
    sessionStorage.clear();
  });

  it('should call enableCookies when "Enable cookies" button is clicked', () => {
    render(<BlockedEmbedMessage {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /Enable cookies/i }));

    expect(enableCookies).toHaveBeenCalledWith('twitter');
  });

  it('should call allowCookiesOnce when "Allow cookies once" button is clicked', () => {
    render(<BlockedEmbedMessage {...defaultProps} />);

    fireEvent.click(
      screen.getByRole('button', { name: /Allow cookies once/i })
    );

    expect(window.__tcfapi).toHaveBeenCalledWith(
      'getCustomVendorConsents',
      2,
      expect.any(Function)
    );
  });

  it('should set consentGranted in session storage and allow embed if consent is granted', () => {
    (window as any).__tcfapi = jest.fn((command, version, callback) => {
      // tslint:disable-next-line:no-console
      console.log('version', version);
      if (command === 'getCustomVendorConsents') {
        callback(
          {
            grants: {
              twitterId: { vendorGrant: true, purposeGrants: { 1: true } }
            }
          },
          true
        );
      }
    });

    render(<BlockedEmbedMessage {...defaultProps} />);

    fireEvent.click(
      screen.getByRole('button', { name: /Allow cookies once/i })
    );

    expect(sessionStorage.getItem('twitter')).toBe('true');
    expect(mockSetIsAllowedOnce).toHaveBeenCalledWith(true);
  });

  it('should handle missing consent data gracefully and not allow embed', () => {
    (window as any).__tcfapi = jest.fn((command, version, callback) => {
      // tslint:disable-next-line:no-console
      console.log('command, version', command, version);
      callback(null, false); // Simulate unsuccessful consent request
    });

    render(<BlockedEmbedMessage {...defaultProps} />);

    fireEvent.click(
      screen.getByRole('button', { name: /Allow cookies once/i })
    );

    expect(sessionStorage.getItem('twitter')).toBeNull();
    expect(mockSetIsAllowedOnce).toHaveBeenCalledWith(false);
  });

  /*   it('should handle postCustomConsent and allow embed if consent is successfully granted', () => {
    (window as any).__tcfapi = jest.fn((command, version, callback) => {
      // tslint:disable-next-line:no-console
      console.log('version', version);
      if (command === 'getCustomVendorConsents') {
        callback(
          {
            grants: {
              twitterId: { vendorGrant: false, purposeGrants: { 1: true } }
            }
          },
          true
        );
      }
      if (command === 'postCustomConsent') {
        callback({}, true);
      }
    });

    render(<BlockedEmbedMessage {...defaultProps} />);

    fireEvent.click(
      screen.getByRole('button', { name: /Allow cookies once/i })
    );

    expect(sessionStorage.getItem('twitter')).toBe('true');
    expect(mockSetIsAllowedOnce).toHaveBeenCalledWith(true);
  }); */

  it('should log an error if __tcfapi is not available and not allow embed', () => {
    // tslint:disable-next-line:no-console
    console.error = jest.fn();
    delete (window as any).__tcfapi;

    render(<BlockedEmbedMessage {...defaultProps} />);

    fireEvent.click(
      screen.getByRole('button', { name: /Allow cookies once/i })
    );

    // tslint:disable-next-line:no-console
    expect(console.error).toHaveBeenCalledWith('TCF API is not available!');
    expect(mockSetIsAllowedOnce).toHaveBeenCalledWith(false);
  });
});
