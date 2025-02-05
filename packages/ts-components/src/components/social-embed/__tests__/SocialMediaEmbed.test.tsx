import React from 'react';
import { render, screen } from '@testing-library/react';
import { SocialMediaEmbed, SocialMediaEmbedProps } from '../SocialMediaEmbed';
import { BlockedEmbedMessage } from '../BlockedEmbedMessage';
import { Vendor } from '../SocialVendor';
import { checkVendorConsent } from '../helpers/vendorConsent';
import { eventStatus } from '../constants';
import '@testing-library/jest-dom/extend-expect';
import { useSocialEmbedsContext } from '../../../contexts/SocialEmbedsProvider';

jest.mock('../../../contexts/SocialEmbedsProvider', () => ({
  useSocialEmbedsContext: jest.fn(),
}));

jest.mock('../BlockedEmbedMessage', () => ({
  BlockedEmbedMessage: jest.fn(() => <div>Blocked Embed Message</div>),
}));

jest.mock('../SocialVendor', () => ({
  Vendor: jest.fn(() => <div>Vendor Component</div>),
}));

jest.mock('../helpers/vendorConsent', () => ({
  checkVendorConsent: jest.fn(() => true),
}));

describe('SocialMediaEmbed Component', () => {
  const vendorName = 'twitter';
  const defaultProps: SocialMediaEmbedProps = {
    id: 'test-id',
    url: 'https://twitter.com/test/status/12345',
    vendorName,
  };

  const mockContext = {
    setIsSocialEmbedAllowed: jest.fn(),
    isAllowedOnce: { twitter: false },
    isSocialEmbedAllowed: { twitter: false },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSocialEmbedsContext as jest.Mock).mockReturnValue(mockContext);

    // Mock __tcfapi
    (window as any).__tcfapi = jest.fn();
  });

  afterEach(() => {
    delete (window as any).__tcfapi;
  });

  it('renders BlockedEmbedMessage when social embed is not allowed', () => {
    render(<SocialMediaEmbed {...defaultProps} />);

    expect(screen.getByText('Blocked Embed Message')).toBeInTheDocument();
    expect(BlockedEmbedMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        vendorName: defaultProps.vendorName,
      }),
      {}
    );
  });

  it('renders Vendor component when social embed is allowed', () => {
    (useSocialEmbedsContext as jest.Mock).mockReturnValue({
      ...mockContext,
      isSocialEmbedAllowed: { twitter: true },
    });

    render(<SocialMediaEmbed {...defaultProps} />);

    expect(screen.getByText('Vendor Component')).toBeInTheDocument();
    expect(Vendor).toHaveBeenCalledWith(
      expect.objectContaining({
        vendorName: defaultProps.vendorName,
        url: defaultProps.url,
      }),
      {}
    );
  });

  it('calls checkVendorConsent and updates context state when __tcfapi is available', () => {
    const tcData = { eventStatus: eventStatus.tcLoaded };
    const updatedProps = {
      ...defaultProps,
    };

    render(<SocialMediaEmbed {...updatedProps} />);

    const [command, version, callback] = (window.__tcfapi as jest.Mock).mock
      .calls[0];

    expect(command).toBe('addEventListener');
    expect(version).toBe(2);

    // Simulate the callback
    callback(tcData, true);

    expect(checkVendorConsent).toHaveBeenCalledWith(vendorName);
    expect(mockContext.setIsSocialEmbedAllowed).toHaveBeenCalledWith(
      expect.any(Function)
    );

    // Verify the updated state
    const updateFunction = mockContext.setIsSocialEmbedAllowed.mock.calls[0][0];
    const updatedState = updateFunction({ twitter: false });
    expect(updatedState).toEqual({ twitter: true });
  });

  it('does not render Twitter widget if __tcfapi is unavailable', () => {
    delete (window as any).__tcfapi;

    render(<SocialMediaEmbed {...defaultProps} />);

    expect(screen.getByText('Blocked Embed Message')).toBeInTheDocument();
    expect(BlockedEmbedMessage).toHaveBeenCalled();
  });

  it('renders Vendor component if isAllowedOnce for the vendor is true', () => {
    (useSocialEmbedsContext as jest.Mock).mockReturnValue({
      ...mockContext,
      isAllowedOnce: { twitter: true },
    });

    render(<SocialMediaEmbed {...defaultProps} />);

    expect(screen.getByText('Vendor Component')).toBeInTheDocument();
    expect(Vendor).toHaveBeenCalledWith(
      expect.objectContaining({
        vendorName: defaultProps.vendorName,
        url: defaultProps.url,
      }),
      {}
    );
  });
});
