import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TwitterEmbed } from '../TwitterEmbed'; 
import '@testing-library/jest-dom';
import get from 'lodash.get';

// Mocking external dependencies
jest.mock('@times-components/interactive-wrapper', () => jest.fn(() => <div>InteractiveWrapper</div>));
jest.mock('lodash.get');

const mockTcfApi = jest.fn();

describe('TwitterEmbed', () => {
  beforeEach(() => {
    mockTcfApi.mockReset();
    window.__tcfapi = mockTcfApi;

    jest.spyOn(global.console, 'log').mockImplementation(() => {});
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders Twitter content if consent is given for Twitter', () => {
    // tslint:disable-next-line:no-unused-variable
    mockTcfApi.mockImplementation((command, version, callback) => {
      callback({ consentedVendors: [{ name: 'Twitter' }] }, true);
    });

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed',
    };
    const url = 'https://twitter.com';

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Assert that InteractiveWrapper is rendered
    expect(screen.getByText('InteractiveWrapper')).toBeInTheDocument();
  });

  it('renders blocked content message if consent for Twitter is not given', () => {
    // tslint:disable-next-line:no-unused-variable
    mockTcfApi.mockImplementation((command, version, callback) => {
      callback({ consentedVendors: [] }, true);
    });

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed',
    };
    const url = 'https://twitter.com';

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Assert that the blocked content message is rendered
    expect(screen.getByText('X (Twitter) content blocked')).toBeInTheDocument();
    expect(screen.getByText('privacy manager.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enable cookies/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Allow cookies once/i })).toBeInTheDocument();
  });

  it('handles privacy manager link click', () => {
    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed',
    };
    const url = 'https://twitter.com';

    render(<TwitterEmbed element={mockElement} url={url} />);

    const privacyManagerLink = screen.getByText('privacy manager.');
    fireEvent.click(privacyManagerLink);

    // Ensure that the privacy modal load function was attempted
    expect(global.console.warn).toHaveBeenCalledWith('Sourcepoint LoadPrivacyManagerModal is not available');
  });

  it('calls __tcfapi and logs an error if consent data is unavailable', () => {
    // tslint:disable-next-line:no-unused-variable
    mockTcfApi.mockImplementation((command, version, callback) => {
      callback(null, false);
    });

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed',
    };
    const url = 'https://twitter.com';

    render(<TwitterEmbed element={mockElement} url={url} />);

    expect(global.console.log).toHaveBeenCalledWith('Error fetching consent data or Twitter not allowed');
  });

  it('warns when privacy modal cannot be loaded', () => {
    (get as jest.Mock).mockReturnValue(null);

    const mockElement = {
      attributes: {},
      value: 'Twitter content',
      key: 'twitter-embed',
    };
    const url = 'https://twitter.com';

    render(<TwitterEmbed element={mockElement} url={url} />);

    // Simulate user clicking the privacy manager link
    const privacyManagerLink = screen.getByText('privacy manager.');
    fireEvent.click(privacyManagerLink);

    expect(global.console.warn).toHaveBeenCalledWith('Sourcepoint LoadPrivacyManagerModal is not available');
  });
});
