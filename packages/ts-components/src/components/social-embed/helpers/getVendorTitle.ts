export const getVendorTitle = (
  title: string,
  socialMediaVendors: any
): string => {
  if (title === 'twitter') {
    return 'X (Twitter)';
  }
  return socialMediaVendors[title];
};
