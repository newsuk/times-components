import { socialMediaVendors } from './socialMediaVendors';

export const enableCookies = (vendorName: string) => {
  const onCustomConsent = (_: any, success: boolean) => {
    if (success) {
      return true;
    }
    return null;
  };

  const vendorId = socialMediaVendors[vendorName].id;

  if (window.__tcfapi && vendorId) {
    window.__tcfapi(
      'getCustomVendorConsents',
      2,
      (data: any, successful: boolean) => {
        if (successful && data && data.grants[vendorId]) {
          (window.__tcfapi as any)(
            'postCustomConsent',
            2,
            onCustomConsent,
            [vendorId],
            Object.keys(data.grants[vendorId].purposeGrants),
            []
          );
        } else {
          // tslint:disable-next-line:no-console
          console.error(`${vendorName} vendor consent not available:`, data);
        }
      }
    );
  }
};
