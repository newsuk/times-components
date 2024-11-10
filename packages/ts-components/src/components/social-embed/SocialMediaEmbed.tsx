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
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export type SocialMediaEmbedProps = {
  element?: any;
  url: string;
  vendorName: VendorName;
  id: string;
};

export const SocialMediaEmbed: FC<SocialMediaEmbedProps> = ({
  id,
  url,
  vendorName
}) => {
  const [isSocialEmbedAllowed, setIsSocialEmbedAllowed] = useState(false);
  const [data, setData] = useState<TcData | null>(null);
  const [isAllowedOnce, setIsAllowedOnce] = useState(false);

  useEffect(
    () => {
      if (window.__tcfapi) {
        window.__tcfapi('addEventListener', 2, (tcData, success) => {
          if (success && tcData.eventStatus === eventStatus.tcLoaded) {
            setData({
              cmpStatus: tcData.cmpStatus,
              eventStatus: tcData.eventStatus,
              listenerId: tcData.listenerId
            });

            setIsSocialEmbedAllowed(checkVendorConsent(vendorName));
          }
          if (
            success &&
            tcData.eventStatus === eventStatus.userActionComplete
          ) {
            setData({
              cmpStatus: tcData.cmpStatus,
              eventStatus: tcData.eventStatus,
              listenerId: tcData.listenerId
            });

            setIsSocialEmbedAllowed(checkVendorConsent(vendorName));
          }
        });
      }

      // Trigger Twitter embed load when isSocialEmbedAllowed switches to true
      if (isSocialEmbedAllowed && window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
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
    },
    [isSocialEmbedAllowed]
  );

  useEffect(
    () => {
      window.addEventListener('storage', e => {
        // tslint:disable-next-line:no-console
        console.log('event', e);
        if (e.key === vendorName && e.newValue === 'true') {
          setIsSocialEmbedAllowed(true);
        } else {
          setIsSocialEmbedAllowed(false);
        }
      });
    },
    [isAllowedOnce]
  );

  return isSocialEmbedAllowed ? (
    <div id={id}>
      <blockquote className="twitter-tweet">
        <a href={url} />
      </blockquote>
    </div>
  ) : (
    <BlockedEmbedMessage
      vendorName={vendorName}
      setIsAllowedOnce={setIsAllowedOnce}
    />
  );
};
