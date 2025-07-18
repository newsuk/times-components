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
      console.log('lol enable cookies', vendorName);
      return true;
    }
    setIsSocialEmbedAllowed(prev => ({
      ...prev,
      [vendorName]: false
    }));
    console.log('lol dont enable cookies', vendorName);
    return null;
  };

  const vendorId = socialMediaVendors[vendorName].id;
  console.log('lol vendorId', vendorId);

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
          console.log('lol successful', successful);
          console.log('lol data', data);
          console.log('lol data.grants[vendorId]', data.grants[vendorId]);
        } else {
          setIsSocialEmbedAllowed(prev => ({
            ...prev,
            [vendorName]: false
          }));
          console.log('lol socialMedia not allowed', vendorName);
        }
      }
    );
  }
};
