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

import { InpContainer } from '../styles';

type NewsletterProps = {
  intersectObserverRef: (ref: HTMLElement | null) => void;
  section?: string;
  headline: string;
  copy: string;
  code: string;
  subscribeNewsletter: any;
  loading?: boolean;
  error?: string;
  data?: { isSubscribed: boolean };
};

export const Newsletter = ({
  intersectObserverRef,
  section,
  headline,
  copy,
  code,
  subscribeNewsletter,
  loading,
  error,
  data
}: NewsletterProps) => {
  const PuffButton = (style: 'link' | 'button') => (
    <InpSignupCTAContainer ref={intersectObserverRef} childStyle={style}>
      <NewsletterPuffButton
        style={style}
        updatingSubscription={loading}
        onPress={() => {
          if (!loading) {
            subscribeNewsletter(`/api/subscribe-newsletter/${code}`);
          }
        }}
      />
    </InpSignupCTAContainer>
  );

  return (
    <React.Fragment>
      <InpContainer section={section}>
        {loading && <LoadingOverlay />}
        {data &&
          data.isSubscribed && (
            <InpSubscribedContainer>
              <InpCopy>
                You've succesfully signed up to{' '}
                <InpSignupHeadline>{`${headline}.`} </InpSignupHeadline>
                <NewsletterPuffLink />
              </InpCopy>
              <InpPreferencesContainer />
            </InpSubscribedContainer>
          )}
        {error && (
          <InpSubscribedContainer>
            <InpCopy>
              Ann error occurred. Please use the link below.
              <NewsletterPuffLink />
            </InpCopy>
            <InpPreferencesContainer />
          </InpSubscribedContainer>
        )}
        {data &&
          !data.isSubscribed &&
          !error && (
            <InpSignupContainer>
              <InpCopy>
                <InpSignupHeadline>{headline} </InpSignupHeadline>
                {`${copy} `}
                {PuffButton('link')}
              </InpCopy>
              {PuffButton('button')}
            </InpSignupContainer>
          )}
      </InpContainer>
    </React.Fragment>
  );
};
