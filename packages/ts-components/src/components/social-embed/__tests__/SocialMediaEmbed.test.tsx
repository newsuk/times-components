import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SocialMediaEmbed } from '../SocialMediaEmbed';
import '@testing-library/jest-dom';
import get from 'lodash.get';

// Mocking external dependencies
jest.mock('@times-components/interactive-wrapper', () =>
  jest.fn(() => <div>InteractiveWrapper</div>)
);
jest.mock('lodash.get');

const mockTcfApi = jest.fn();

describe('SocialMediaEmbed', () => {
  beforeEach(() => {
    mockTcfApi.mockReset();
    window.__tcfapi = mockTcfApi;

    /* tslint:disable:no-empty */
    jest.spyOn(global.console, 'log').mockImplementation(() => {});
    /* tslint:disable:no-empty */
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders Twitter content if consent is given for Twitter', () => {
    mockTcfApi.mockImplementation((_, __, callback) => {
      callback({ consentedVendors: [{ name: 'Twitter' }] }, true);
    });

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';
    const mockSocialEmbed = {
      isSocialEmbedAllowed: true,
      setIsSocialEmbedAllowed: jest.fn(),
      isAllowedOnce: false,
      setIsAllowedOnce: jest.fn()
    };

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
        socialEmbed={mockSocialEmbed}
      />
    );

    // const twitterEmbedElement = document.querySelector('twitter-embed');
    // expect(twitterEmbedElement).toHaveAttribute('url', url);
  });

  it('renders blocked content message if consent for Twitter is not given', () => {
    mockTcfApi.mockImplementation((_, __, callback) => {
      callback({ consentedVendors: [] }, true);
    });

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';
    const mockSocialEmbed = {
      isSocialEmbedAllowed: false,
      setIsSocialEmbedAllowed: jest.fn(),
      isAllowedOnce: false,
      setIsAllowedOnce: jest.fn()
    };

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
        socialEmbed={mockSocialEmbed}
      />
    );

    expect(screen.getByText('X (Twitter) content blocked')).toBeInTheDocument();
    expect(screen.getByText('privacy manager.')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Enable cookies/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Allow cookies once/i })
    ).toBeInTheDocument();
  });

  /* it('enables cookies and unblocks Twitter content', () => {
    mockTcfApi.mockImplementation((_, __, callback) => {
      callback(
        {
          grants: {
            '5fab0c31a22863611c5f8764': { purposeGrants: { '1': true } }
          }
        },
        true
      );
    });

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';
    const mockSocialEmbed = {
      isSocialEmbedAllowed: true,
      setIsSocialEmbedAllowed: jest.fn(),
      isAllowedOnce: false,
      setIsAllowedOnce: jest.fn()
    };

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
        socialEmbed={mockSocialEmbed}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Enable cookies/i }));

    expect(mockTcfApi).toHaveBeenCalledWith(
      'getCustomVendorConsents',
      2,
      expect.any(Function)
    );

    expect(mockTcfApi).toHaveBeenCalledWith(
      'postCustomConsent',
      2,
      expect.any(Function),
      ['5fab0c31a22863611c5f8764'],
      expect.any(Array),
      []
    );
  }); */

  it('opens privacy modal when available', () => {
    const mockLoadPrivacyManagerModal = jest.fn();

    window.__TIMES_CONFIG__ = {
      sourcepoint: {
        gdprMessageId: 'messageIdForGDPR'
      }
    };

    (get as jest.Mock).mockReturnValue(mockLoadPrivacyManagerModal);

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';
    const mockSocialEmbed = {
      isSocialEmbedAllowed: false,
      setIsSocialEmbedAllowed: jest.fn(),
      isAllowedOnce: false,
      setIsAllowedOnce: jest.fn()
    };

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
        socialEmbed={mockSocialEmbed}
      />
    );

    const privacyManagerLink = screen.getByText('privacy manager.');
    fireEvent.click(privacyManagerLink);

    expect(mockLoadPrivacyManagerModal).toHaveBeenCalledWith(
      'messageIdForGDPR'
    );
  });

  it('handles missing privacy modal gracefully', () => {
    (get as jest.Mock).mockReturnValue(undefined);

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';
    const mockSocialEmbed = {
      isSocialEmbedAllowed: false,
      setIsSocialEmbedAllowed: jest.fn(),
      isAllowedOnce: false,
      setIsAllowedOnce: jest.fn()
    };

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
        socialEmbed={mockSocialEmbed}
      />
    );

    const privacyManagerLink = screen.getByText('privacy manager.');
    fireEvent.click(privacyManagerLink);

    expect(global.console.warn).toHaveBeenCalledWith(
      'Sourcepoint LoadPrivacyManagerModal is not available'
    );
  });
});
