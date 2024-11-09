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
  setIsSocialEmbedAllowed: Dispatch<SetStateAction<boolean>>;
};

export const BlockedEmbedMessage: FC<BlockedEmbedMessageProps> = ({
  vendorName,
  setIsSocialEmbedAllowed
}) => {
  // Allow cookies once - custom hook
  const allowCookiesOnce = () => {
    const vendorId = socialMediaVendors[vendorName].id;
    const CONSENT_GRANTED_KEY = `consentGranted_${vendorId}`;

    // Check if consent has already been granted for this vendor
    const consentAlreadyGranted =
      sessionStorage.getItem(CONSENT_GRANTED_KEY) === 'true';

    if (consentAlreadyGranted) {
      setIsSocialEmbedAllowed(true);
    }

    if (!window.__tcfapi) {
      // tslint:disable-next-line:no-console
      console.error('TCF API is not available!');
      setIsSocialEmbedAllowed(false);
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
            sessionStorage.setItem(CONSENT_GRANTED_KEY, 'true');
            setIsSocialEmbedAllowed(true);
          } else {
            if (!window.__tcfapi) {
              // tslint:disable-next-line:no-console
              console.error('TCF API is not available!');
              setIsSocialEmbedAllowed(false);
              return;
            }

            // Request consent via postCustomConsent
            (window.__tcfapi as any)(
              'postCustomConsent',
              2,
              (postConsentData: any, postSuccess: boolean) => {
                if (postSuccess) {
                  sessionStorage.setItem(CONSENT_GRANTED_KEY, 'true');
                  // tslint:disable-next-line:no-console
                  console.log('postConsentData', postConsentData);
                  setIsSocialEmbedAllowed(true);
                } else {
                  // tslint:disable-next-line:no-console
                  console.error(
                    `Failed to obtain consent for vendor: ${vendorId}`
                  );
                  setIsSocialEmbedAllowed(false);
                }
              },
              [vendorId],
              Object.keys(data.grants[vendorId].purposeGrants),
              []
            );
          }
        } else {
          // tslint:disable-next-line:no-console
          console.error(
            `Consent data for vendor ${vendorId} not available or request failed.`
          );
          setIsSocialEmbedAllowed(false);
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
