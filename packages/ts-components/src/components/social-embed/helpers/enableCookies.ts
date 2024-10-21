export const enableCookies = (
  vendorName: string,
  // socialMediaVendors: any,
  setIsSocialAllowed: (allowed: boolean) => void
) => {
  const onCustomConsent = (_: any, success: boolean) => {
    if (success) {
      setIsSocialAllowed(true);
    }
    return null;
  };

  const socialMediaVendors: {
    [key: string]: { id: string; status: string };
  } = {
    twitter: { id: '5fab0c31a22863611c5f8764', status: 'pending' },
    youtube: { id: '5e7ac3fae30e7d1bc1ebf5e8', status: 'pending' }
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
