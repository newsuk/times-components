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
  url?: string;
  vendorName: string;
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
  vendorName
}) => {
  const [allowedOnce, setAllowedOnce] = useState(false);
  const [isSocialAllowed, setIsSocialAllowed] = useState(false);

  useEffect(
    () => {
      // tslint:disable-next-line:no-console
      console.log('useEffect enterred', element);
      checkVendorConsent(vendorName, setIsSocialAllowed);
    },
    [vendorName, allowedOnce, isSocialAllowed]
  );

  useEffect(
    () => {
      let socialEmbedContainer = document.getElementsByClassName('social-embed')[0];

      if (socialEmbedContainer) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://platform.twitter.com/widgets.js';
  
        socialEmbedContainer.appendChild(script);
      }
    },
    [isSocialAllowed, allowedOnce]
  );

  const allowCookiesOnce = () => {
    setAllowedOnce(true);
    setIsSocialAllowed(true);
  };

  const handlePrivacyManagerClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    openPrivacyModal(
      ModalType.GDPR,
      window.__TIMES_CONFIG__.sourcepoint.gdprMessageId
    );
  };
  // tslint:disable-next-line:no-console
  console.log('allowedOnce', allowedOnce);
  // tslint:disable-next-line:no-console
  console.log('allowedOnce || isSocialAllowed', allowedOnce || isSocialAllowed);
  // tslint:disable-next-line:no-console
  console.log('allowedOnce && isSocialAllowed', allowedOnce && isSocialAllowed);

  return isSocialAllowed || allowedOnce ? (
    <div className="social-embed">
      <blockquote className="twitter-tweet">
        <a href={`${element.attributes.url}?ref_src=twsrc%5Etfw`}></a>
      </blockquote>
    </div>
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
