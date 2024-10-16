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

  useEffect(() => {
    if (window.__tcfapi) {
      window.__tcfapi('getCustomVendorConsents', 2, (data, success) => {
        if (success && data && data.consentedVendors) {
          const isSocialVendorAllowed = data.consentedVendors.some(
            (vendor: { name: string }) => vendor.name === 'Twitter'
          );
          setIsSocialAllowed(isSocialVendorAllowed);
        } else {
          // tslint:disable-next-line:no-console
          console.log(
            `Error fetching consent data or ${vendorName} embed not allowed`
          );
        }
      });
    }
    // tslint:disable-next-line:no-console
    console.log('window', window);
  }, []);

  useEffect(
    () => {
      if (allowedOnce || isSocialAllowed) {
        setIsSocialAllowed(true);
      }
    },
    [allowedOnce, isSocialAllowed]
  );

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

  const socialMediaVendors: {
    [key: string]: { id: string; status: string };
  } = {
    twitter: { id: '5fab0c31a22863611c5f8764', status: 'pending' },
    facebook: { id: 'fb_vendor_id', status: 'pending' },
    instagram: { id: 'insta_vendor_id', status: 'pending' }
  };

  const getVendorTitle = (title: string): string => {
    if (title === 'twitter') {
      return 'X (Twitter)';
    }
    return socialMediaVendors[title].id || title;
  };

  const enableCookies = (providerName: string) => {
    const onCustomConsent = (_: any, success: boolean) => {
      if (success) {
        setIsSocialAllowed(true);
        return {
          ...socialMediaVendors.vendorName,
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
            console.error(`${vendorName} vendor consent not available:`, data);
          }
        }
      );
    }
  };

  // tslint:disable-next-line:no-console
  console.log('allowedOnce', allowedOnce);
  // tslint:disable-next-line:no-console
  console.log('allowedOnce || isSocialAllowed', allowedOnce || isSocialAllowed);
  // tslint:disable-next-line:no-console
  console.log('allowedOnce && isSocialAllowed', allowedOnce && isSocialAllowed);

  return isSocialAllowed ? (
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
        <Title>{getVendorTitle(vendorName)} content blocked</Title>
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
