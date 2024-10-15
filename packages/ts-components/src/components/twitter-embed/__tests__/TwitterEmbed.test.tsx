import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TwitterEmbed } from '../TwitterEmbed';
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

    render(<TwitterEmbed element={mockElement} url={url} />);

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

    render(<TwitterEmbed element={mockElement} url={url} />);

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

  it('calls __tcfapi and logs an error if consent data is unavailable', () => {
    mockTcfApi.mockImplementation((_, __, callback) => {
      callback(null, false);
    });

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    render(<TwitterEmbed element={mockElement} url={url} />);

    expect(global.console.log).toHaveBeenCalledWith(
      'Error fetching consent data or Twitter not allowed'
    );
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

    render(<TwitterEmbed element={mockElement} url={url} />);

    fireEvent.click(screen.getByRole('button', { name: /Enable cookies/i }));

    // Ensure that the __tcfapi function is called with the correct arguments
    expect(mockTcfApi).toHaveBeenCalledWith(
      'getCustomVendorConsents',
      2,
      expect.any(Function)
    );

    mockTcfApi.mock.calls[0][2](
      {
        grants: { '5fab0c31a22863611c5f8764': { purposeGrants: { '1': true } } }
      },
      true
    );

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

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Click the "Allow cookies once" button
    fireEvent.click(
      screen.getByRole('button', { name: /Allow cookies once/i })
    );

    // Ensure that Twitter content is unblocked temporarily (InteractiveWrapper is rendered)
    expect(screen.getByText('InteractiveWrapper')).toBeInTheDocument();

    // Mock that cookies are not permanently set, and content should be blocked again after refresh
    // Here, we just verify that consent was not permanently stored
    mockTcfApi.mockReset(); // Reset the mock to simulate a new page load without consent

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Ensure that the blocked content message is rendered again after refresh
    expect(screen.getByText('X (Twitter) content blocked')).toBeInTheDocument();
  });

  it('handles missing __tcfapi gracefully', () => {
    // Ensure __tcfapi is undefined
    delete window.__tcfapi;

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Ensure that the blocked content message is rendered
    expect(screen.getByText('X (Twitter) content blocked')).toBeInTheDocument();
    expect(global.console.log).toHaveBeenCalledWith('window', window);
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

    render(<TwitterEmbed element={mockElement} url={url} />);

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

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Simulate user clicking the privacy manager link
    const privacyManagerLink = screen.getByText('privacy manager.');
    fireEvent.click(privacyManagerLink);

    // Ensure that the console.warn is triggered
    expect(global.console.warn).toHaveBeenCalledWith(
      'Sourcepoint LoadPrivacyManagerModal is not available'
    );
  });

  it('allows cookies once for Twitter', () => {
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

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Click the "Allow cookies once" button
    fireEvent.click(
      screen.getByRole('button', { name: /Allow cookies once/i })
    );

    // Ensure that the Twitter content is rendered after allowing cookies once
    expect(screen.getByText('InteractiveWrapper')).toBeInTheDocument();
  });

  it('renders Twitter content when isTwitterAllowed is initially true', () => {
    // Mock implementation to set consent for Twitter from the start
    mockTcfApi.mockImplementation((_, __, callback) => {
      callback({ consentedVendors: [{ name: 'Twitter' }] }, true);
    });

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    // Initially set isTwitterAllowed to true
    render(<TwitterEmbed element={mockElement} url={url} />);

    // Ensure Twitter content is immediately displayed
    expect(screen.getByText('InteractiveWrapper')).toBeInTheDocument();
  });

  it('handles when __tcfapi is not available on window', () => {
    // Ensure __tcfapi is undefined
    delete window.__tcfapi;

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Ensure that blocked content message is rendered when __tcfapi is not available
    expect(screen.getByText('X (Twitter) content blocked')).toBeInTheDocument();

    // Ensure that console.log is called since __tcfapi is not available
    expect(global.console.log).toHaveBeenCalledWith('window', window);
  });

  it('handles when __tcfapi is a stub', () => {
    // Define __tcfapi as a stub (noop)
    window.__tcfapi = jest.fn();

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Ensure that blocked content message is rendered since the stub does nothing
    expect(screen.getByText('X (Twitter) content blocked')).toBeInTheDocument();

    // Ensure __tcfapi was called, even though it is a stub
    expect(window.__tcfapi).toHaveBeenCalledWith(
      'getCustomVendorConsents',
      2,
      expect.any(Function)
    );
  });

  it('allows cookies once when the Allow cookies once button is clicked', () => {
    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Click the "Allow cookies once" button
    fireEvent.click(
      screen.getByRole('button', { name: /Allow cookies once/i })
    );

    // Ensure that Twitter content is unblocked temporarily (InteractiveWrapper is rendered)
    expect(screen.getByText('InteractiveWrapper')).toBeInTheDocument();
  });

  it('calls enableCookies and logs an error when vendor consent data is not found', () => {
    const consoleErrorMock = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    window.__tcfapi = jest.fn((_, __, callback) => {
      callback(null, true); // Simulate the case where the vendor consent data is missing
    });

    render(<TwitterEmbed element={mockElement} url={url} />);

    fireEvent.click(screen.getByRole('button', { name: /Enable cookies/i }));

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Twitter vendor consent not available:',
      null
    );

    consoleErrorMock.mockRestore();
  });

  it('calls openPrivacyModal and warns when no modal is available', () => {
    const consoleWarnMock = jest
      .spyOn(global.console, 'warn')
      .mockImplementation(() => {});

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Simulate clicking the privacy manager link
    const privacyManagerLink = screen.getByText('privacy manager.');
    fireEvent.click(privacyManagerLink);

    // Expect the console warning to be called
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Sourcepoint LoadPrivacyManagerModal is not available'
    );

    consoleWarnMock.mockRestore();
  });

  it('logs error when consent setting fails', () => {
    const consoleErrorMock = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    window.__tcfapi = jest.fn((_, __, callback) => {
      callback(
        {
          grants: {
            '5fab0c31a22863611c5f8764': { purposeGrants: { '1': true } }
          }
        },
        false
      ); // Simulate failure
    });

    render(<TwitterEmbed element={mockElement} url={url} />);

    fireEvent.click(screen.getByRole('button', { name: /Enable cookies/i }));

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Twitter vendor consent not available:',
      {
        grants: { '5fab0c31a22863611c5f8764': { purposeGrants: { '1': true } } }
      }
    );

    consoleErrorMock.mockRestore();
  });

  it('calls enableCookies and logs a console error when TCF API is not available', () => {
    const consoleErrorMock = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    // Simulate missing __tcfapi
    delete window.__tcfapi;

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Simulate clicking the "Enable cookies" button
    fireEvent.click(screen.getByRole('button', { name: /Enable cookies/i }));

    // Expect a console error
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'TCF API is not available or Twitter vendor ID is missing.'
    );

    consoleErrorMock.mockRestore();
  });

  it('calls enableCookies and logs a console error when TCF API is not available', () => {
    const consoleErrorMock = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    delete window.__tcfapi;

    render(<TwitterEmbed element={mockElement} url={url} />);

    fireEvent.click(screen.getByRole('button', { name: /Enable cookies/i }));

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'TCF API is not available or Twitter vendor ID is missing.'
    );

    consoleErrorMock.mockRestore();
  });
  it('calls enableCookies and logs a console error when TCF API is not available', () => {
    const consoleErrorMock = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    delete window.__tcfapi;

    render(<TwitterEmbed element={mockElement} url={url} />);

    fireEvent.click(screen.getByRole('button', { name: /Enable cookies/i }));

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'TCF API is not available or Twitter vendor ID is missing.'
    );

    consoleErrorMock.mockRestore();
  });

  it('logs a warning when the privacy modal is unavailable', () => {
    const consoleWarnMock = jest
      .spyOn(global.console, 'warn')
      .mockImplementation(() => {});

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed'
    };
    const url = 'https://twitter.com';

    (get as jest.Mock).mockReturnValue(undefined);

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Simulate clicking the privacy manager link
    fireEvent.click(screen.getByText('privacy manager.'));

    // Expect the warning to be logged
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Sourcepoint LoadPrivacyManagerModal is not available'
    );

    consoleWarnMock.mockRestore();
  });
});
