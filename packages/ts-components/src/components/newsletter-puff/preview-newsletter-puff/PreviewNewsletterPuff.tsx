import { InpContainer } from '../styles';

import {
  InpCopy,
  InpSignupContainer,
  InpSignupHeadline,
  InpSignupCTAContainer
} from '../newsletter/styles';

import { NewsletterPuffButton } from '../newsletter-puff-button/NewsletterPuffButton';
import React from 'react';

type PreviewNewsletterPuffProps = {
  copy: string;
  headline: string;
  section: string;
};

export const PreviewNewsletterPuff = ({
  copy,
  headline,
  section
}: PreviewNewsletterPuffProps) => (
  <InpContainer section={section}>
    <InpSignupContainer>
      <InpCopy>
        <InpSignupHeadline>{headline} </InpSignupHeadline>
        {copy}
        <InpSignupCTAContainer childStyle="link">
          <NewsletterPuffButton style="link" />
        </InpSignupCTAContainer>
      </InpCopy>
      <InpSignupCTAContainer childStyle="button">
        <NewsletterPuffButton style="button" />
      </InpSignupCTAContainer>
    </InpSignupContainer>
  </InpContainer>
);
