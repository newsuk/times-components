import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { SocialMediaEmbed, SocialMediaEmbedProps } from '../SocialMediaEmbed';
import { BlockedEmbedMessage } from '../BlockedEmbedMessage';
import { eventStatus } from '../constants';
import { checkVendorConsent } from '../helpers/vendorConsent';
import { TcData } from '../types';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../BlockedEmbedMessage', () => ({
  BlockedEmbedMessage: jest.fn(() => <div>Blocked Embed Message</div>)
}));

jest.mock('../helpers/vendorConsent', () => ({
  checkVendorConsent: jest.fn()
}));

describe('SocialMediaEmbed component', () => {
  const defaultProps: SocialMediaEmbedProps = {
    id: 'test-embed',
    url: 'https://twitter.com/test/status/123',
    vendorName: 'twitter',
    socialEmbed: {
      isSocialEmbedAllowed: false,
      setIsSocialEmbedAllowed: jest.fn(),
      isAllowedOnce: false,
      setIsAllowedOnce: jest.fn()
    }
  };

  beforeEach(() => {
    (window as any).__tcfapi = jest.fn();
    (window as any).twttr = {
      widgets: {
        load: jest.fn()
      }
    };
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    delete (window as any).__tcfapi;
    delete (window as any).twttr;
  });

  it('renders BlockedEmbedMessage when social embed is not allowed', () => {
    render(<SocialMediaEmbed {...defaultProps} />);

    expect(screen.getByText('Blocked Embed Message')).toBeInTheDocument();
    expect(BlockedEmbedMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        vendorName: defaultProps.vendorName,
        setIsAllowedOnce: defaultProps.socialEmbed.setIsAllowedOnce
      }),
      {}
    );
  });

  it('renders the Twitter embed when social embed is allowed', () => {
    const allowedProps = {
      ...defaultProps,
      socialEmbed: {
        ...defaultProps.socialEmbed,
        isSocialEmbedAllowed: true
      }
    };

    render(<SocialMediaEmbed {...allowedProps} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', defaultProps.url);
  });

  it('calls checkVendorConsent and sets consent on tcLoaded event', () => {
    const tcData: TcData = {
      cmpStatus: 'loaded',
      eventStatus: eventStatus.tcLoaded,
      listenerId: 1
    };
    const setIsSocialEmbedAllowed = jest.fn();
    const updatedProps = {
      ...defaultProps,
      socialEmbed: {
        ...defaultProps.socialEmbed,
        setIsSocialEmbedAllowed
      }
    };
    (checkVendorConsent as jest.Mock).mockReturnValue(true);

    render(<SocialMediaEmbed {...updatedProps} />);

    const [callback] = (window.__tcfapi as jest.Mock).mock.calls[0].slice(2);
    callback(tcData, true);

    expect(checkVendorConsent).toHaveBeenCalledWith(defaultProps.vendorName);
    expect(setIsSocialEmbedAllowed).toHaveBeenCalledWith(true);
  });

  it('does not trigger Twitter widget load if twttr is undefined', () => {
    delete (window as any).twttr;

    render(<SocialMediaEmbed {...defaultProps} />);

    expect(window.twttr).toBeUndefined();
  });
});
