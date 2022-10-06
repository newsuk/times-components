import React from 'react';

import { NewsletterPuffButton } from '../newsletter-puff-button/NewsletterPuffButton';
import { NewsletterPuffLink } from '../newsletter-puff-link/NewsletterPuffLink';
import { LoadingOverlay } from '../loading-overlay/LoadingOverlay';

import {
  InpCopy,
  InpPreferencesContainer,
  InpSignupContainer,
  InpSignupCTAContainer,
  InpSignupHeadline,
  InpSubscribedContainer
} from './styles';

import {
    InpContainer,
  } from '../styles';
  
// type InlineNewsletterPuffProps = {};

export const Newsletter = ({
  intersectObserverRef,
  section,
  justSubscribed,
  headline,
  updatingSubscription,
  copy,
  code,
  subscribeNewsletter
}: any) => {
  return (
    <React.Fragment>
      <InpContainer sectionColour={section}>
        {updatingSubscription && <LoadingOverlay />}
        {justSubscribed ? (
          <InpSubscribedContainer>
            <InpCopy>
              You've succesfully signed up to{' '}
              <InpSignupHeadline>{headline}. </InpSignupHeadline>
              <NewsletterPuffLink />
            </InpCopy>
            <InpPreferencesContainer />
          </InpSubscribedContainer>
        ) : (
          <InpSignupContainer>
            <InpCopy>
              <InpSignupHeadline>{headline}: </InpSignupHeadline>
              {copy}
              <NewsletterPuffButton
                style="link"
                updatingSubscription={updatingSubscription}
                onPress={() => {
                  if (!updatingSubscription) {
                    subscribeNewsletter({ variables: { code } });
                  }
                }}
              />
            </InpCopy>
            <InpSignupCTAContainer ref={intersectObserverRef}>
              <NewsletterPuffButton
                style="button"
                updatingSubscription={updatingSubscription}
                onPress={() => {
                  if (!updatingSubscription) {
                    subscribeNewsletter({ variables: { code } });
                  }
                }}
              />
            </InpSignupCTAContainer>
          </InpSignupContainer>
        )}
      </InpContainer>
    </React.Fragment>
  );
};
