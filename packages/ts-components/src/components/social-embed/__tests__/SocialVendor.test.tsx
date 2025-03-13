import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VendorName } from '../types';
import { Vendor } from '../SocialVendor';

// Mock components
jest.mock('../components/TwitterComponent', () => ({
  Twitter: jest.fn(() => (
    <div data-testid="twitter-component">Twitter Component</div>
  ))
}));

jest.mock('../components/YoutubeComponent', () => ({
  Youtube: jest.fn(() => (
    <div data-testid="youtube-component">Youtube Component</div>
  ))
}));

jest.mock('../components/TiktokComponent', () => ({
  TikTok: jest.fn(() => (
    <div data-testid="tiktok-component">TikTok Component</div>
  ))
}));

jest.mock('../components/InstagramComponent', () => ({
  Instagram: jest.fn(() => (
    <div data-testid="instagram-component">Instagram Component</div>
  ))
}));

describe('Vendor Component', () => {
  const renderVendor = (vendorName: VendorName, url: string) =>
    render(<Vendor vendorName={vendorName} url={url} />);

  it('renders the Twitter component when vendorName is "twitter"', () => {
    renderVendor('twitter' as VendorName, 'https://twitter.com/some/tweet');
    expect(screen.getByTestId('twitter-component')).toBeInTheDocument();
  });

  it('renders the Youtube component when vendorName is "youtube"', () => {
    renderVendor('youtube' as VendorName, 'https://youtube.com/some/video');
    expect(screen.getByTestId('youtube-component')).toBeInTheDocument();
  });

  it('renders the TikTok component when vendorName is "tiktok"', () => {
    renderVendor(
      'tiktok' as VendorName,
      'https://www.tiktok.com/@user/video/1234567890'
    );
    expect(screen.getByTestId('tiktok-component')).toBeInTheDocument();
  });

  it('renders the Instagram component when vendorName is "instagram"', () => {
    renderVendor('instagram' as VendorName, 'https://instagram.com/some/video');
    expect(screen.getByTestId('instagram-component')).toBeInTheDocument();
  });

  it('throws an error if an invalid vendorName is provided', () => {
    const renderInvalidVendor = () =>
      render(
        <Vendor
          vendorName={'invalid' as VendorName}
          url="https://example.com"
        />
      );
    expect(renderInvalidVendor).toThrowError();
  });
});
