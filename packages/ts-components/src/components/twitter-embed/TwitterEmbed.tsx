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
import get from 'lodash.get';
import { InfoIcon } from '../inline-message/InfoIcon';
// @ts-ignore
import InteractiveWrapper from '@times-components/interactive-wrapper';

export declare type TwitterEmbedProps = {
  element: any;
  url: string;
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

export const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ element, url }) => {
  const [allowedOnce, setAllowedOnce] = useState(false);
  const [isTwitterAllowed, setIsTwitterAllowed] = useState(false);

  useEffect(() => {
    if (window.__tcfapi) {
      window.__tcfapi('getCustomVendorConsents', 2, (data, success) => {
        if (success && data && data.consentedVendors) {
          const isTwitterVendorAllowed = data.consentedVendors.some(
            (vendor: { name: string }) => vendor.name === 'Twitter'
          );
          setIsTwitterAllowed(isTwitterVendorAllowed);
        } else {
          // tslint:disable-next-line:no-console
          console.log('Error fetching consent data or Twitter not allowed');
        }
      });
    }
    // tslint:disable-next-line:no-console
    console.log('window', window);
  }, []);

  enum ModalType {
    GDPR = 'gdpr',
    CCPA = 'ccpa'
  }

  const openPrivacyModal = (type: ModalType, messageId: string) => {
    const loadModal = get(window, `_sp_.${type}.loadPrivacyManagerModal`);

    if (loadModal) {
      loadModal(messageId);
    } else {
      // tslint:disable-next-line:no-console
      console.warn('Sourcepoint LoadPrivacyManagerModal is not available');
    }
  };

  const allowCookiesOnce = () => {
    setAllowedOnce(true);
    setIsTwitterAllowed(true);
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

  const socialMediaVendors = {
    twitter: { id: '5fab0c31a22863611c5f8764', status: 'pending' }
  };

  const enableCookies = () => {
    const onCustomConsent = (data: any, success: boolean) => {
      if (success) {
        // tslint:disable-next-line:no-console
        console.log('Consent successfully updated', data);
        setIsTwitterAllowed(true);
      } else {
        // tslint:disable-next-line:no-console
        console.error('Failed to set consent for Twitter.', data);
      }
    };

    const twitterVendorId = socialMediaVendors.twitter.id;

    if (window.__tcfapi && twitterVendorId) {
      window.__tcfapi(
        'getCustomVendorConsents',
        2,
        (data: any, successful: boolean) => {
          if (successful && data && data.grants[twitterVendorId]) {
            // const purposeGrants = Object.keys(data.grants[twitterVendorId].purposeGrants).join(',');

            (window.__tcfapi as any)(
              'postCustomConsent',
              2,
              onCustomConsent,
              twitterVendorId,
              Object.keys(data.grants[twitterVendorId].purposeGrants),
              ''
            );
          } else {
            // tslint:disable-next-line:no-console
            console.error('Twitter vendor consent not available:', data);
          }
        }
      );
    } else {
      // tslint:disable-next-line:no-console
      console.error(
        'TCF API is not available or Twitter vendor ID is missing.'
      );
    }
  };

  return isTwitterAllowed || allowedOnce ? (
    <InteractiveWrapper
      attributes={element.attributes}
      element={element.value}
      key={element.key}
      source={url}
    />
  ) : (
    <CardContainer>
      <Header>
        <CustomIconContainer>
          <InfoIcon />
        </CustomIconContainer>
        <Title>X (Twitter) content blocked</Title>
      </Header>
      <Paragraph>
        Please enable cookies and other technologies to view this content. You
        can update your cookies preferences any time using{' '}
        <LinkPrivacyManager href="#" onClick={handlePrivacyManagerClick}>
          privacy manager.
        </LinkPrivacyManager>
      </Paragraph>
      <EnableButton onClick={enableCookies}>Enable cookies</EnableButton>
      <AllowButton onClick={allowCookiesOnce}>Allow cookies once</AllowButton>
    </CardContainer>
  );
};
