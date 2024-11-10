import React, { FC, MouseEvent, Dispatch, SetStateAction } from 'react';
import {
  AllowButton,
  CardContainer,
  CustomIconContainer,
  EnableButton,
  Header,
  LinkPrivacyManager,
  Paragraph,
  Title
} from './styles';
import { InfoIcon } from '../inline-message/InfoIcon';
import { getVendorTitle } from './helpers/getVendorTitle';
import { enableCookies } from './helpers/enableCookies';
import { openPrivacyModal } from './helpers/privacyModal';
import { socialMediaVendors } from './helpers/socialMediaVendors';
import { VendorName } from './types';
import { modalType } from './constants';

export type BlockedEmbedMessageProps = {
  vendorName: VendorName;
  setIsAllowedOnce: Dispatch<SetStateAction<boolean>>;
};

export const BlockedEmbedMessage: FC<BlockedEmbedMessageProps> = ({
  vendorName,
  setIsAllowedOnce
}) => {
  // Allow cookies once - custom hook
  const allowCookiesOnce = () => {
    const vendorId = socialMediaVendors[vendorName].id;

    // Check if consent has already been granted for this vendor
    const consentAlreadyGranted = sessionStorage.getItem(vendorName) === 'true';

    if (consentAlreadyGranted) {
      setIsAllowedOnce(true);
    }

    if (!window.__tcfapi) {
      // tslint:disable-next-line:no-console
      console.error('TCF API is not available!');
      setIsAllowedOnce(false);
      return;
    }

    // Use __tcfapi to check and request consent if now previously granted
    window.__tcfapi(
      'getCustomVendorConsents',
      2,
      (data: any, success: boolean) => {
        if (success && data && data.grants && data.grants[vendorId]) {
          const vendorConsent = data.grants[vendorId].vendorGrant;

          if (vendorConsent) {
            // Store consent status to avoid future prompts during the session
            sessionStorage.setItem(vendorName, 'true');
            setIsAllowedOnce(true);
          }
        } else {
          // tslint:disable-next-line:no-console
          console.error(
            `Consent data for vendor ${vendorId} not available or request failed.`
          );
          setIsAllowedOnce(false);
        }
      }
    );
  };

  const handlePrivacyManagerClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openPrivacyModal(
      modalType.GDPR,
      window.__TIMES_CONFIG__.sourcepoint.gdprMessageId
    );
  };

  return (
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
      <EnableButton onClick={() => enableCookies(vendorName)}>
        Enable cookies
      </EnableButton>
      <AllowButton onClick={() => allowCookiesOnce()}>
        Allow cookies once
      </AllowButton>
    </CardContainer>
  );
};
