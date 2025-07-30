import { Dispatch, SetStateAction } from 'react';
import { socialMediaVendors } from './socialMediaVendors';

export const enableCookies = (
  vendorName: string,
  setIsSocialEmbedAllowed: Dispatch<SetStateAction<Record<string, boolean>>>
) => {
  const onCustomConsent = (_: any, success: boolean) => {
    if (success) {
      setIsSocialEmbedAllowed(prev => ({
        ...prev,
        [vendorName]: true
      }));
      return true;
    }
    setIsSocialEmbedAllowed(prev => ({
      ...prev,
      [vendorName]: false
    }));
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
          setIsSocialEmbedAllowed(prev => ({
            ...prev,
            [vendorName]: false
          }));
        }
      }
    );
  }
};
