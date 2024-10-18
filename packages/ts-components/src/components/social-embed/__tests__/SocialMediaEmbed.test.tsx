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

describe('TwitterEmbed', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockTcfApi.mockReset();
    window.__tcfapi = mockTcfApi;

    /* tslint:disable:no-empty */
    jest.spyOn(global.console, 'log').mockImplementation(() => {});
    /* tslint:disable:no-empty */
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore mocks after each test
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
      />
    );

    // Assert that InteractiveWrapper is rendered
    expect(screen.getByText('InteractiveWrapper')).toBeInTheDocument();
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
      />
    );

    // Assert that the blocked content message is rendered
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
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Enable cookies/i }));

    // Ensure that the __tcfapi function is called with the correct arguments
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

    // Assert that InteractiveWrapper is rendered
    expect(screen.getByText('InteractiveWrapper')).toBeInTheDocument();
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
      />
    );

    // Click the "Allow cookies once" button
    fireEvent.click(
      screen.getByRole('button', { name: /Allow cookies once/i })
    );

    // Ensure that Twitter content is unblocked temporarily (InteractiveWrapper is rendered)
    expect(screen.getByText('InteractiveWrapper')).toBeInTheDocument();

    // Mock that cookies are not permanently set, and content should be blocked again after refresh
    // Here, we just verify that consent was not permanently stored
    mockTcfApi.mockReset(); // Reset the mock to simulate a new page load without consent

    render(
      <SocialMediaEmbed
        element={mockElement}
        url={url}
        vendorName={'twitter'}
      />
    );

    // Ensure that the blocked content message is rendered again after refresh
    expect(screen.getByText('X (Twitter) content blocked')).toBeInTheDocument();
  });

  it('opens privacy modal when available', () => {
    const mockLoadPrivacyManagerModal = jest.fn();

    // Mock the sourcepoint configuration
    window.__TIMES_CONFIG__ = {
      sourcepoint: {
        gdprMessageId: 'messageIdForGDPR'
      }
    };

    // Mock get to return loadPrivacyManagerModal function
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
      />
    );

    // Simulate user clicking the privacy manager link
    const privacyManagerLink = screen.getByText('privacy manager.');
    fireEvent.click(privacyManagerLink);

    // Ensure that the privacy modal load function is called with the correct message ID
    expect(mockLoadPrivacyManagerModal).toHaveBeenCalledWith(
      'messageIdForGDPR'
    );
  });

  it('handles missing privacy modal gracefully', () => {
    // Mock get to return undefined (no privacy modal available)
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
      />
    );

    // Simulate user clicking the privacy manager link
    const privacyManagerLink = screen.getByText('privacy manager.');
    fireEvent.click(privacyManagerLink);

    // Ensure that the console.warn is triggered
    expect(global.console.warn).toHaveBeenCalledWith(
      'Sourcepoint LoadPrivacyManagerModal is not available'
    );
  });
});
