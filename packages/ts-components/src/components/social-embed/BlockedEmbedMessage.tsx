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
    /* const vendorId = socialMediaVendors[vendorName].id; */

    // Check if consent has already been granted for this vendor
    const consentAlreadyGranted = sessionStorage.getItem('consentedVendors');

    if (consentAlreadyGranted) {
      setIsAllowedOnce(true);
    }

    // Store consent status to avoid future prompts during the session
    sessionStorage.setItem('consentedVendors', `['${vendorName}']`);
    setIsAllowedOnce(true);
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
