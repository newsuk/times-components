/* eslint-disable no-console */
import React, { FC, MouseEvent, useEffect } from 'react';
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
  const {
    setIsSocialEmbedAllowed,
    setIsAllowedOnce,
    isSocialEmbedAllowed,
    isAllowedOnce
  } = useSocialEmbedsContext();

  useEffect(
    () => {
      // tslint:disable-next-line:no-console
      console.log('isSocialEmbedAllowed updated:', isSocialEmbedAllowed);
    },
    [isSocialEmbedAllowed]
  );

  const allowCookiesOnce = () => {
    // tslint:disable-next-line:no-console
    console.log('entered allowCookiesOnce', vendorName);
    setIsAllowedOnce(prev => ({
      ...prev,
      [vendorName]: true
    }));
    // tslint:disable-next-line:no-console
    console.log(
      'entered allowCookiesOnce cookies enabled',
      vendorName,
      isAllowedOnce
    );
  };

  const handleEnableCookies = () => {
    // tslint:disable-next-line:no-console
    console.log('entered handleEnableCookies', vendorName);
    enableCookies(vendorName, setIsSocialEmbedAllowed);
    // tslint:disable-next-line:no-console
    console.log(
      'entered handleEnableCookies cookies enabled',
      vendorName,
      isSocialEmbedAllowed
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
      <EnableButton onClick={handleEnableCookies}>Enable cookies</EnableButton>
      <AllowButton onClick={() => allowCookiesOnce()}>
        Allow cookies once
      </AllowButton>
    </CardContainer>
  );
};
