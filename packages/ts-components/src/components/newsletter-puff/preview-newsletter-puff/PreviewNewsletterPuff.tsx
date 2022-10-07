import { InpSignupCTAContainer, InpContainer } from '../styles';

import {
  InpCopy,
  InpSignupContainer,
  InpSignupHeadline
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
      <InpSignupHeadline>{headline}</InpSignupHeadline>
      <InpCopy>{copy}</InpCopy>
      <InpSignupCTAContainer>
        <NewsletterPuffButton style="button" />
      </InpSignupCTAContainer>
    </InpSignupContainer>
  </InpContainer>
);
