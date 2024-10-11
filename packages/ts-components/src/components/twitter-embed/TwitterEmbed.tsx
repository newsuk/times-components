import React, { useEffect } from 'react';
import { AllowButton, CardContainer, EnableButton, LinkPrivacyManager, Paragraph, Title, CustomIconContainer, Header } from "./styles";
import get from "lodash.get";
import { InfoIcon } from "../inline-message/InfoIcon";

declare global {
  interface Window {
    __tcfapi?: (
      command: string,
      version: number,
      callback: (data: any, success: boolean) => void
    ) => void;
  }
}

export const TwitterEmbed = () => {

  useEffect(() => {
    /* if (window.__tcfapi) {
      window.__tcfapi('getCustomVendorConsents', 2, (data, success) => {
        if (success) {
          // tslint:disable-next-line:no-console
          console.log('TCF API response:', data);
        } else {
          // tslint:disable-next-line:no-console
          console.log('Error fetching TCF API data');
        }
      });
    } else {
      // tslint:disable-next-line:no-console
      console.log('TCF API not available');
    } */
  console.log('window', window);
  }, []);

  enum ModalType {
    GDPR = 'gdpr',
    CCPA = 'ccpa',
}

  const openPrivacyModal = (type: ModalType, messageId: string) => {
    if (typeof window === 'undefined') return;

    const loadModal = get(window, `_sp_.${type}.loadPrivacyManagerModal`);

    if (loadModal) {
        loadModal(messageId);
    } else {
        console.warn('Sourcepoint LoadPrivacyManagerModal is not available');
    }
};

  const handlePrivacyManagerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    openPrivacyModal(ModalType.GDPR, 'messageIdForGDPR'); 
  };

  return (
    <CardContainer>
    <Header>
    <CustomIconContainer>
      <InfoIcon />
    </CustomIconContainer>
    <Title>X (Twitter) content blocked</Title>
    </Header>
    <Paragraph>Please enable cookies and other technologies to view this content. You can update your cookies preferences any time using <LinkPrivacyManager  href="#" onClick={handlePrivacyManagerClick}>privacy manager.</LinkPrivacyManager></Paragraph>
    <EnableButton>Enable cookies</EnableButton>
    <AllowButton>Allow cookies once</AllowButton>
  </CardContainer>
  );
};
