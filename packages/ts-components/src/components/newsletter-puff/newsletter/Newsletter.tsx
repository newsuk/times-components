import React, { useState } from 'react';

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
};

export const Newsletter = ({
  intersectObserverRef,
  section,
  headline,
  copy,
  code,
  subscribeNewsletter,
  loading,
  error
}: NewsletterProps) => {
  const [justSubscribed, setJustSubscribed] = useState(false);
  const PuffButton = (style: 'link' | 'button') => (
    <InpSignupCTAContainer ref={intersectObserverRef} childStyle={style}>
      <NewsletterPuffButton
        style={style}
        updatingSubscription={loading}
        onPress={() => {
          if (!loading) {
            setJustSubscribed(true);
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
        {!error &&
          justSubscribed && (
            <InpSubscribedContainer>
              <InpCopy>
                You’ve successfully signed up to the{' '}
                <InpSignupHeadline>{`${headline}.`} </InpSignupHeadline>
                <NewsletterPuffLink />
              </InpCopy>
              <InpPreferencesContainer />
            </InpSubscribedContainer>
          )}
        {error && (
          <InpSubscribedContainer>
            <InpCopy>
              An error occurred. Please use the link below.
              <NewsletterPuffLink />
            </InpCopy>
            <InpPreferencesContainer />
          </InpSubscribedContainer>
        )}
        {!justSubscribed &&
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
