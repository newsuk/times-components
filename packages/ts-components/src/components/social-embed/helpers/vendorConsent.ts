import { VendorName } from '../types';

export const checkVendorConsent = (
  vendorName: VendorName,
  setIsSocialEmbedAllowed: (isSocialVendorAllowed: boolean) => void
) => {
  if (window.__tcfapi) {
    window.__tcfapi(
      'getCustomVendorConsents',
      2,
      (data: any, success: boolean) => {
        if (success && data && data.consentedVendors) {
          const isSocialVendorAllowed = data.consentedVendors.some(
            (vendor: { name: string }) =>
              vendor.name.toLowerCase() === vendorName.toLowerCase()
          );
          setIsSocialEmbedAllowed(isSocialVendorAllowed);
        } else {
          // tslint:disable-next-line:no-console
          console.log(
            `Error fetching consent data or ${vendorName} embed not allowed`
          );
        }
      }
    );
  }
};
