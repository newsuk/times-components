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

  const socialMediaVendors: {
    [key: string]: { id: string; status: string };
  } = {
    twitter: { id: '5fab0c31a22863611c5f8764', status: 'pending' }
  };

  const vendorName = 'twitter';

  const enableCookies = (providerName: string) => {
    const onCustomConsent = (_: any, success: boolean) => {
      if (success) {
        setIsTwitterAllowed(true);
        return {
          ...socialMediaVendors.twitter,
          [vendorName]: {
            ...socialMediaVendors[vendorName],
            status: 'accepted'
          }
        };
      }
      return null;
    };

    const vendorId = socialMediaVendors[providerName].id;

    if (window.__tcfapi && vendorId) {
      window.__tcfapi(
        'getCustomVendorConsents',
        2,
        (data: any, successful: boolean) => {
          if (successful && data && data.grants[vendorId]) {
            (window.__tcfapi as any)(
              'postCustomConsent',
              2,
              onCustomConsent,
              [vendorId],
              Object.keys(data.grants[vendorId].purposeGrants),
              []
            );
          } else {
            // tslint:disable-next-line:no-console
            console.error('Twitter vendor consent not available:', data);
          }
        }
      );
    }
  };

  // tslint:disable-next-line:no-console
  console.log('allowedOnce', allowedOnce);
  // tslint:disable-next-line:no-console
  console.log(
    'allowedOnce || isTwitterAllowed',
    allowedOnce || isTwitterAllowed
  );
  // tslint:disable-next-line:no-console
  console.log(
    'allowedOnce && isTwitterAllowed',
    allowedOnce && isTwitterAllowed
  );

  return isTwitterAllowed ? (
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
      <EnableButton onClick={() => enableCookies(vendorName)}>
        Enable cookies
      </EnableButton>
      <AllowButton onClick={allowCookiesOnce}>Allow cookies once</AllowButton>
    </CardContainer>
  );
};
