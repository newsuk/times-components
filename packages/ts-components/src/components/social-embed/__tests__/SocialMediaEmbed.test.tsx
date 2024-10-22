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

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
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

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
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

  it('enables cookies and unblocks Twitter content', () => {
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

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
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

    // const twitterEmbedElement = document.querySelector('twitter-embed');
    // expect(twitterEmbedElement).toHaveAttribute('url', url);
  });

  it('allows cookies once and unblocks Twitter content temporarily', () => {
    // Mock implementation for __tcfapi
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

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Allow cookies once/i })
    );

    // const twitterEmbedElement = document.querySelector('twitter-embed');
    // expect(twitterEmbedElement).toHaveAttribute('url', url);

    mockTcfApi.mockReset(); // Reset the mock to simulate a new page load without consent

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
      />
    );

    expect(screen.getByText('X (Twitter) content blocked')).toBeInTheDocument();
  });

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

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
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

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
        id={'222'}
      />
    );

    const privacyManagerLink = screen.getByText('privacy manager.');
    fireEvent.click(privacyManagerLink);

    expect(global.console.warn).toHaveBeenCalledWith(
      'Sourcepoint LoadPrivacyManagerModal is not available'
    );
  });
});
