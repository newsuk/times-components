import React, { FC, MouseEvent } from 'react';
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
import { useSocialEmbedsContext } from '../../contexts/SocialEmbedsProvider';

export type BlockedEmbedMessageProps = {
  vendorName: VendorName;
};

export const BlockedEmbedMessage: FC<BlockedEmbedMessageProps> = ({
  vendorName
}) => {
  // eslint-disable-next-line no-console
  console.log('lol vendorName', vendorName);

  const {
    setIsSocialEmbedAllowed,
    setIsAllowedOnce
  } = useSocialEmbedsContext();

  const allowCookiesOnce = () => {
    setIsAllowedOnce(prev => ({
      ...prev,
      [vendorName]: true
    }));
    // eslint-disable-next-line no-console
    console.log('lol setIsAllowedOnce', vendorName);
  };

  const handleEnableCookies = () => {
    // eslint-disable-next-line no-console
    console.log('lol handleEnableCookies', vendorName);
    enableCookies(vendorName, setIsSocialEmbedAllowed);
  };

  const handlePrivacyManagerClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openPrivacyModal(
      modalType.GDPR,
      window.__TIMES_CONFIG__.sourcepoint.gdprMessageId
    );
    // eslint-disable-next-line no-console
    console.log('lol handlePrivacyManagerClick', modalType.GDPR);
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
      <EnableButton onClick={handleEnableCookies}>Enable cookies</EnableButton>
      <AllowButton onClick={() => allowCookiesOnce()}>
        Allow cookies once
      </AllowButton>
    </CardContainer>
  );
};
