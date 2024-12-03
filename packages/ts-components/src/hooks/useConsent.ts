import { useState, useEffect } from 'react';

export const useConsent = () => {
  const [isSocialEmbedAllowed, setIsSocialEmbedAllowed] = useState(false);
  const [isAllowedOnce, setIsAllowedOnce] = useState(false);
  const [consentedVendors, setConsentedVendors] = useState(null);

  useEffect(() => {
    const handleSessionStorageItem = () => {
      const consentedVendorsList = sessionStorage.getItem('consentedVendors');

      if (consentedVendorsList) {
        setConsentedVendors(JSON.parse(consentedVendorsList));
        // tslint:disable-next-line:no-console
        console.log('consentedVendors', consentedVendors);
        if (consentedVendors) {
          setIsAllowedOnce(true);
          return;
        }
      }

      setIsAllowedOnce(false);
    };

    window.addEventListener('storage', handleSessionStorageItem);

    return () => {
      window.removeEventListener('storage', handleSessionStorageItem);
    };
  }, []);

  return [
    isSocialEmbedAllowed,
    setIsSocialEmbedAllowed,
    isAllowedOnce,
    setIsAllowedOnce
  ];
};
