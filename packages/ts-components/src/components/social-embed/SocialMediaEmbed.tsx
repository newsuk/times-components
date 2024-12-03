import React, { FC, useEffect } from 'react';
import { BlockedEmbedMessage } from './BlockedEmbedMessage';
import { checkVendorConsent } from './helpers/vendorConsent';
import { eventStatus } from './constants';
import { TcData, VendorName } from './types';
import { useSocialEmbedsContext } from '../../contexts/SocialEmbedsProvider';
import { Vendor } from './SocialVendor';

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
  const {
    setIsSocialEmbedAllowed,
    isAllowedOnce,
    isSocialEmbedAllowed
  } = useSocialEmbedsContext();

  useEffect(
    () => {
      if (window.__tcfapi) {
        window.__tcfapi('addEventListener', 2, (tcData, success) => {
          // tslint:disable-next-line:no-console
          console.log('success, tcData', success, tcData);
          if (
            success &&
            (tcData.eventStatus === eventStatus.tcLoaded ||
              tcData.eventStatus === eventStatus.userActionComplete)
          ) {
            // tslint:disable-next-line:no-console
            console.log('PROSLO DO setIsSocialEmbedAllowed');
            const consent = checkVendorConsent(vendorName);
            setIsSocialEmbedAllowed(prev => ({
              ...prev,
              [vendorName]: consent
            }));
          }
        });
      }
    },
    [vendorName, setIsSocialEmbedAllowed]
  );

  // tslint:disable-next-line:no-console
  console.log('isSocialEmbedAllowed', isSocialEmbedAllowed);
  // tslint:disable-next-line:no-console
  console.log('isAllowedOnce', isAllowedOnce);

  return isSocialEmbedAllowed[vendorName] || isAllowedOnce[vendorName] ? (
    <div id={id}>
      <Vendor vendorName={vendorName} url={url} />
    </div>
  ) : (
    <BlockedEmbedMessage vendorName={vendorName} />
  );
};
