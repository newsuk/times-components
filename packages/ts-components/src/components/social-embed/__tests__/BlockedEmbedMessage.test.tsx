import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  BlockedEmbedMessage,
  BlockedEmbedMessageProps
} from '../BlockedEmbedMessage';
import { enableCookies } from '../helpers/enableCookies';
import { VendorName } from '../types';

// Mock dependencies
jest.mock('../helpers/enableCookies');
jest.mock('../helpers/privacyModal');
jest.mock('../helpers/getVendorTitle', () => ({
  getVendorTitle: jest.fn(() => 'Vendor Title')
}));

describe('BlockedEmbedMessage', () => {
  const vendorName = 'facebook' as VendorName;
  const setIsAllowedOnce = jest.fn();
  const setIsSocialEmbedAllowed = jest.fn();

  const defaultProps: BlockedEmbedMessageProps = {
    vendorName,
    setIsAllowedOnce,
    setIsSocialEmbedAllowed
  };

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('calls enableCookies when Enable cookies button is clicked', () => {
    render(<BlockedEmbedMessage {...defaultProps} />);
    const enableButton = screen.getByText('Enable cookies');
    fireEvent.click(enableButton);
    expect(enableCookies).toHaveBeenCalledWith(
      vendorName,
      setIsSocialEmbedAllowed
    );
  });

  it('calls allowCookiesOnce when Allow cookies once button is clicked and updates session storage', () => {
    render(<BlockedEmbedMessage {...defaultProps} />);
    const allowButton = screen.getByText('Allow cookies once');
    fireEvent.click(allowButton);
    expect(setIsAllowedOnce).toHaveBeenCalledWith(true);
    expect(sessionStorage.getItem('consentedVendors')).toBe(
      `['${vendorName}']`
    );
  });

  it('grants consent if vendor is already in session storage', () => {
    sessionStorage.setItem('consentedVendors', `['${vendorName}']`);
    render(<BlockedEmbedMessage {...defaultProps} />);
    const allowButton = screen.getByText('Allow cookies once');
    fireEvent.click(allowButton);
    expect(setIsAllowedOnce).toHaveBeenCalledWith(true);
  });
});
