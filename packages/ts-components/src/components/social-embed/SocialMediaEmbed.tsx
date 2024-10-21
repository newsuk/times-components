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
  vendorName
}) => {
  const [allowedOnce, setAllowedOnce] = useState(false);
  const [isSocialAllowed, setIsSocialAllowed] = useState(false);

  useEffect(
    () => {
      // tslint:disable-next-line:no-console
      console.log('useEffect enterred');
      checkVendorConsent(vendorName, setIsSocialAllowed);
    },
    [vendorName, allowedOnce, isSocialAllowed]
  );

  useEffect(
    () => {
      if (isSocialAllowed || allowedOnce) {
        const script = document.createElement('link');
        script.href =
          'https://components.timesdev.tools/lib2/twitter-embed-1.0.0/twitter-embed.html';
        script.rel = 'import';
        document.body.appendChild(script);
      }

      const wrapper = document.getElementById('interactiveWrapper');
      if (wrapper) {
        const twitterEmbed = document.createElement('twitter-embed');
        twitterEmbed.setAttribute('url', url);
        wrapper.appendChild(twitterEmbed);
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
