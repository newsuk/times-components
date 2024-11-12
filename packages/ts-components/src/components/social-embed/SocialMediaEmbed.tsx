import React, { FC, useEffect, Dispatch, SetStateAction } from 'react';
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
  socialEmbed: {
    isSocialEmbedAllowed: boolean;
    setIsSocialEmbedAllowed: Dispatch<SetStateAction<boolean>>;
    isAllowedOnce: boolean;
    setIsAllowedOnce: Dispatch<SetStateAction<boolean>>;
  };
};

export const SocialMediaEmbed: FC<SocialMediaEmbedProps> = ({
  id,
  url,
  vendorName,
  socialEmbed
}) => {
  const {
    isSocialEmbedAllowed,
    setIsSocialEmbedAllowed,
    isAllowedOnce,
    setIsAllowedOnce
  } = socialEmbed;

  useEffect(
    () => {
      if (window.__tcfapi) {
        window.__tcfapi('addEventListener', 2, (tcData, success) => {
          if (
            success &&
            (tcData.eventStatus === eventStatus.tcLoaded ||
              tcData.eventStatus === eventStatus.userActionComplete)
          ) {
            setIsSocialEmbedAllowed(checkVendorConsent(vendorName));
          }
        });
      }

      /* return () => {
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
      }; */
    },
    [isSocialEmbedAllowed]
  );

  useEffect(
    () => {
      // Trigger Twitter embed load when isSocialEmbedAllowed switches to true
      if (
        (isSocialEmbedAllowed || isAllowedOnce) &&
        window.twttr &&
        window.twttr.widgets
      ) {
        window.twttr.widgets.load();
      }
    },
    [isSocialEmbedAllowed, isAllowedOnce]
  );

  return isSocialEmbedAllowed || isAllowedOnce ? (
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
