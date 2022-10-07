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
  justSubscribed: boolean;
  headline: string;
  updatingSubscription: boolean;
  copy: string;
  code: string;
  subscribeNewsletter: ({}) => {};
};

export const Newsletter = ({
  intersectObserverRef,
  section,
  justSubscribed,
  headline,
  updatingSubscription,
  copy,
  code,
  subscribeNewsletter
}: NewsletterProps) => {
  const PuffButton = (style: 'link' | 'button') => (
    <InpSignupCTAContainer ref={intersectObserverRef} childStyle={style}>
      <NewsletterPuffButton
        style={style}
        updatingSubscription={updatingSubscription}
        onPress={() => {
          if (!updatingSubscription) {
            subscribeNewsletter({ variables: { code } });
          }
        }}
      />
    </InpSignupCTAContainer>
  );

  const formatSectionName = (sectionName?: string) => {
    if (!sectionName) { return; }

    const firstLetter = sectionName.charAt(0);
    const restOfString = sectionName.split(firstLetter);
    return `${firstLetter.toUpperCase()}${restOfString[1]}`;
  };

  const formattedSectionName = formatSectionName(section);

  return (
    <React.Fragment>
      <InpContainer section={formattedSectionName}>
        {updatingSubscription && <LoadingOverlay />}
        {justSubscribed ? (
          <InpSubscribedContainer>
            <InpCopy>
              You've succesfully signed up to{' '}
              <InpSignupHeadline>{`${headline}.`} </InpSignupHeadline>
              <NewsletterPuffLink />
            </InpCopy>
            <InpPreferencesContainer />
          </InpSubscribedContainer>
        ) : (
          <InpSignupContainer>
            <InpCopy>
              <InpSignupHeadline>{headline}: </InpSignupHeadline>
              {copy}
              {PuffButton('link')}
            </InpCopy>
            {PuffButton('button')}
          </InpSignupContainer>
        )}
      </InpContainer>
    </React.Fragment>
  );
};
