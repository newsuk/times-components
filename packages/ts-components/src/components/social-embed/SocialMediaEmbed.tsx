import React, { FC, useEffect, useState } from 'react';
import { BlockedEmbedMessage } from './BlockedEmbedMessage';
import { checkVendorConsent } from './helpers/vendorConsent';
import { eventStatus } from './constants';
import { TcData, VendorName } from './types';

declare global {
  interface Window {
    __tcfapi?: (
      command: string,
      version: number,
      callback: (data: TcData, success: boolean) => void,
      listenerId?: number
    ) => void;
  }
}

export type SocialMediaEmbedProps = {
  element?: any;
  url?: string;
  vendorName: VendorName;
  id: string;
};

export const SocialMediaEmbed: FC<SocialMediaEmbedProps> = ({ vendorName }) => {
  const [isSocialEmbedAllowed, setIsSocialEmbedAllowed] = useState(false);
  const [data, setData] = useState<TcData | null>(null);

  useEffect(() => {
    if (window.__tcfapi) {
      window.__tcfapi('addEventListener', 2, (tcData, success) => {
        if (success && tcData.eventStatus === eventStatus.tcLoaded) {
          setData({
            cmpStatus: tcData.cmpStatus,
            eventStatus: tcData.eventStatus,
            listenerId: tcData.listenerId
          });
        }
        if (success && tcData.eventStatus === eventStatus.userActionComplete) {
          setData({
            cmpStatus: tcData.cmpStatus,
            eventStatus: tcData.eventStatus,
            listenerId: tcData.listenerId
          });

          checkVendorConsent(vendorName, setIsSocialEmbedAllowed);
        }
      });
    }

    return () => {
      if (window.__tcfapi && data && data.listenerId) {
        window.__tcfapi(
          'removeEventListener',
          2,
          success => {
            if (success) {
              // tslint:disable-next-line:no-console
              console.log(success);
            }
          },
          data.listenerId
        );
      }
    };
  }, []);

  useEffect(
    () => {
      let socialEmbedContainer = document.getElementsByClassName(
        'social-embed'
      )[0];

      if (socialEmbedContainer) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://platform.twitter.com/widgets.js';

        socialEmbedContainer.appendChild(script);
      }
    },
    [isSocialEmbedAllowed]
  );

  // tslint:disable-next-line:no-console
  console.log('tcData', data);
  // tslint:disable-next-line:no-console
  console.log('isSocialEmbedAllowed', isSocialEmbedAllowed);

  return isSocialEmbedAllowed ? (
    <div className="social-embed" />
  ) : (
    <BlockedEmbedMessage
      vendorName={vendorName}
      setIsSocialEmbedAllowed={setIsSocialEmbedAllowed}
    />
  );
};
