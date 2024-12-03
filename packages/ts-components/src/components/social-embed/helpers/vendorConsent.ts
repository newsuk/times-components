import { VendorName } from '../types';

export const checkVendorConsent = (vendorName: VendorName): boolean => {
  let isSocialVendorAllowed = false;

  if (window.__tcfapi) {
    window.__tcfapi(
      'getCustomVendorConsents',
      2,
      (data: any, success: boolean) => {
        if (success && data && data.consentedVendors) {
          isSocialVendorAllowed = data.consentedVendors.some(
            (vendor: { name: string }) =>
              vendor.name.toLowerCase() === vendorName.toLowerCase()
          );
        } else {
          // tslint:disable-next-line:no-console
          console.log(
            `Error fetching consent data or ${vendorName} embed not allowed`
          );
          isSocialVendorAllowed = false;
        }
      }
    );
  }

  // tslint:disable-next-line:no-console
  console.log('isSocialVendorAllowed', isSocialVendorAllowed);

  return isSocialVendorAllowed;
};
