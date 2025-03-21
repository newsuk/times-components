import React from 'react';
import { Twitter } from './components/TwitterComponent';
import { Youtube } from './components/YoutubeComponent';
import { TikTok } from './components/TiktokComponent';
import { Instagram } from './components/InstagramComponent';

const vendors = {
  twitter: Twitter,
  youtube: Youtube,
  tiktok: TikTok,
  instagram: Instagram
};

export type VendorName = keyof typeof vendors;

export const Vendor = ({
  vendorName,
  url
}: {
  vendorName: VendorName;
  url: string;
}) => {
  const Component = vendors[vendorName];
  return <Component url={url} />;
};
