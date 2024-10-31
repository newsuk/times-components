import React, { useEffect, useState } from 'react';
import {
  AllowButton,
  CardContainer,
  EnableButton,
  LinkPrivacyManager,
  Paragraph,
  Title,
  CustomIconContainer,
  Header
} from './styles';
import { InfoIcon } from '../inline-message/InfoIcon';
import { openPrivacyModal, ModalType } from './helpers/privacyModal';
// @ts-ignore
import InteractiveWrapper from '@times-components/interactive-wrapper';
import { checkVendorConsent } from './helpers/vendorConsent';
import { getVendorTitle } from './helpers/getVendorTitle';
import { enableCookies } from './helpers/enableCookies';
import { socialMediaVendors } from './helpers/socialMediaVendors';

export declare type SocialEmbedProps = {
  element: any;
  url: string;
  vendorName: string;
  id: string;
};

declare global {
  interface Window {
    __tcfapi?: (
      command: string,
      version: number,
      callback: (data: any, success: boolean) => void
    ) => void;
  }
}

export const SocialMediaEmbed: React.FC<SocialEmbedProps> = ({
  element,
  url,
  vendorName,
  id
}) => {
  const [allowedOnce, setAllowedOnce] = useState(false);
  const [isSocialAllowed, setIsSocialAllowed] = useState(false);

  useEffect(() => {
    checkVendorConsent(vendorName, setIsSocialAllowed);
  }, [vendorName, allowedOnce, isSocialAllowed]);

  useEffect(() => {
    const wrapperId = `interactiveWrapper-${id}`;
    const interactiveWrapper = document.getElementById(wrapperId);
    const isBestSellingHolidays = element?.attributes?.src?.includes("best-selling-holidays");

    if (isSocialAllowed || allowedOnce) {
      if (isBestSellingHolidays) {
        const travelOffersLink = document.createElement('link');
        travelOffersLink.href = 'https://components.timesdev.tools/lib2/times-travel-offers-new-1.0.0/times-travel-offers-new.html';
        travelOffersLink.rel = 'import';
        document.head.appendChild(travelOffersLink);

        const travelOffersComponent = document.createElement('times-travel-offers-new');
        travelOffersComponent.setAttribute("src", "https://components.timesdev.tools/lib2/times-travel-offers-new-1.0.0/times-travel-offers-new.html");
        travelOffersComponent.setAttribute("offers", "bsh");
        travelOffersComponent.setAttribute("title", "You might also like");
        travelOffersComponent.setAttribute("description", "Brought to you by Times Travel.");
        travelOffersComponent.setAttribute("selectdata", '[{"ID":35659,"title":"Angkor to the Bay"}]');
        if (interactiveWrapper) {
          interactiveWrapper.innerHTML = '';
          interactiveWrapper.appendChild(travelOffersComponent);
        }
      } else {
        const twitterScript = document.createElement('link');
        twitterScript.href = 'https://components.timesdev.tools/lib2/twitter-embed-1.0.0/twitter-embed.html';
        twitterScript.rel = 'import';
        document.body.appendChild(twitterScript);

        const twitterEmbed = document.createElement('twitter-embed');
        twitterEmbed.setAttribute('url', url);

        if (interactiveWrapper) {
          interactiveWrapper.innerHTML = '';
          interactiveWrapper.appendChild(twitterEmbed);
        }
      }
    }
  }, [isSocialAllowed, allowedOnce]);

  const allowCookiesOnce = () => {
    setAllowedOnce(true);
    setIsSocialAllowed(true);
  };

  const handlePrivacyManagerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openPrivacyModal(
      ModalType.GDPR,
      window.__TIMES_CONFIG__.sourcepoint.gdprMessageId
    );
  };

  return isSocialAllowed || allowedOnce ? (
    <div id="interactiveWrapper" />
  ) : (
    <CardContainer>
      <Header>
        <CustomIconContainer>
          <InfoIcon />
        </CustomIconContainer>
        <Title>
          {getVendorTitle(vendorName, socialMediaVendors)} content blocked
        </Title>
      </Header>
      <Paragraph>
        Please enable cookies and other technologies to view this content. You
        can update your cookies preferences any time using{' '}
        <LinkPrivacyManager href="#" onClick={handlePrivacyManagerClick}>
          privacy manager.
        </LinkPrivacyManager>
      </Paragraph>
      <EnableButton
        onClick={() => enableCookies(vendorName, setIsSocialAllowed)}
      >
        Enable cookies
      </EnableButton>
      <AllowButton onClick={allowCookiesOnce}>Allow cookies once</AllowButton>
    </CardContainer>
  );
};
