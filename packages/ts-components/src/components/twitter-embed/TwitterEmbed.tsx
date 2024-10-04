import React, { useEffect } from 'react';

declare global {
  interface Window {
    __tcfapi: (
      command: string,
      version: number,
      callback: (data: any, success: boolean) => void
    ) => void;
  }
}

export const TwitterEmbed: React.FC<{
  sectionColour: string;
}> = () => {
  // tslint:disable-next-line:no-console
  console.log('window', window);

  useEffect(() => {
    if (window.__tcfapi) {
      window.__tcfapi('getCustomVendorConsents', 2, (data, success) => {
        if (success) {
          // tslint:disable-next-line:no-console
          console.log('TCF API response:', data);
        } else {
          // tslint:disable-next-line:no-console
          console.log('Error fetching TCF API data');
        }
      });
    } else {
      // tslint:disable-next-line:no-console
      console.log('TCF API not available');
    }
  }, []);

  // tslint:disable-next-line:no-console
  console.log('window.__tcfapi', window.__tcfapi);

  return <h1>Test</h1>;
};
