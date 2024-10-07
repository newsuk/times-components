import React from 'react';
import { render, screen } from '@testing-library/react';
import { TwitterEmbed } from '../TwitterEmbed'; // Adjust the path as necessary
import '@testing-library/jest-dom';

const mockTcfApi = jest.fn();

describe('TwitterEmbed', () => {
  beforeEach(() => {
    mockTcfApi.mockReset();
    window.__tcfapi = mockTcfApi;

    // // Mock console.log to avoid using it directly
    // tslint:disable-next-line:no-console
    jest.spyOn(global.console, 'log').mockImplementation(() => {
      // Intentionally left blank for linting rules
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('logs "TCF API not available" if __tcfapi is not defined', () => {
    delete window.__tcfapi;

    render(<TwitterEmbed sectionColour="blue" />);

    // tslint:disable-next-line:no-console
    expect(console.log).toHaveBeenCalledWith('TCF API not available');
  });

  it('calls __tcfapi and logs the success response', () => {
    mockTcfApi.mockImplementation((command, version, callback) => {
      callback({ vendorConsents: {} }, true);
    });

    render(<TwitterEmbed sectionColour="blue" />);

    expect(mockTcfApi).toHaveBeenCalledWith(
      'getCustomVendorConsents',
      2,
      expect.any(Function)
    );

    // tslint:disable-next-line:no-console
    expect(console.log).toHaveBeenCalledWith('TCF API response:', {
      vendorConsents: {}
    });
  });
});
