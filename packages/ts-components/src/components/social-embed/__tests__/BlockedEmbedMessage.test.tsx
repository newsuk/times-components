import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  BlockedEmbedMessage,
  BlockedEmbedMessageProps,
} from '../BlockedEmbedMessage';
import { enableCookies } from '../helpers/enableCookies';
import { openPrivacyModal } from '../helpers/privacyModal';
import { VendorName } from '../types';
import '@testing-library/jest-dom/extend-expect';
import { useSocialEmbedsContext } from '../../../contexts/SocialEmbedsProvider';

// Mock dependencies
jest.mock('../helpers/enableCookies', () => ({
  enableCookies: jest.fn(),
}));

jest.mock('../helpers/privacyModal', () => ({
  openPrivacyModal: jest.fn(),
}));

jest.mock('../../../contexts/SocialEmbedsProvider', () => ({
  useSocialEmbedsContext: jest.fn(),
}));

jest.mock('../helpers/getVendorTitle', () => ({
  getVendorTitle: jest.fn(() => 'Vendor Title'),
}));

describe('BlockedEmbedMessage Component', () => {
  const vendorName: VendorName = 'twitter';

  const defaultProps: BlockedEmbedMessageProps = {
    vendorName,
  };

  const mockContext = {
    setIsSocialEmbedAllowed: jest.fn(),
    setIsAllowedOnce: jest.fn(),
    isSocialEmbedAllowed: { twitter: false, facebook: false },
    isAllowedOnce: { twitter: false, facebook: false },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSocialEmbedsContext as jest.Mock).mockReturnValue(mockContext);

    (window as any).__TIMES_CONFIG__ = {
      sourcepoint: {
        gdprMessageId: 'mockMessageId',
      },
    };
  });

  afterEach(() => {
    delete (window as any).__TIMES_CONFIG__;
  });

  it('renders the component with correct content', () => {
    render(<BlockedEmbedMessage {...defaultProps} />);

    expect(
      screen.getByText('Vendor Title content blocked')
    ).toBeInTheDocument();
    expect(screen.getByText('Enable cookies')).toBeInTheDocument();
    expect(screen.getByText('Allow cookies once')).toBeInTheDocument();
    expect(screen.getByText('privacy manager.')).toBeInTheDocument();
  });

  it('calls enableCookies when the Enable cookies button is clicked', () => {
    render(<BlockedEmbedMessage {...defaultProps} />);
    const enableButton = screen.getByText('Enable cookies');
    fireEvent.click(enableButton);

    expect(enableCookies).toHaveBeenCalledWith(
      vendorName,
      mockContext.setIsSocialEmbedAllowed
    );
  });

  it('calls setIsAllowedOnce when Allow cookies once button is clicked', () => {
    render(<BlockedEmbedMessage {...defaultProps} />);
    const allowButton = screen.getByText('Allow cookies once');
    fireEvent.click(allowButton);

    expect(mockContext.setIsAllowedOnce).toHaveBeenCalledWith(
      expect.any(Function)
    );
  });

  it('calls openPrivacyModal when the privacy manager link is clicked', () => {
    render(<BlockedEmbedMessage {...defaultProps} />);
    const privacyLink = screen.getByText('privacy manager.');
    fireEvent.click(privacyLink);

    expect(openPrivacyModal).toHaveBeenCalledWith('gdpr', 'mockMessageId');
  });
});
