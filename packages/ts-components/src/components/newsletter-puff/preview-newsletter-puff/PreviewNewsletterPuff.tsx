import { InpContainer } from '../styles';

import {
  InpCopy,
  InpSignupContainer,
  InpSignupHeadline
} from '../newsletter/styles';

import {
  InpSignupCTAContainer,
} from '../styles';

import { NewsletterPuffButton } from '../newsletter-puff-button/NewsletterPuffButton';
import React from 'react';

type PreviewNewsletterPuffProps = {
  copy: string;
  headline: string;
};

export const PreviewNewsletterPuff = ({
  copy,
  headline
}: PreviewNewsletterPuffProps) => (
  <InpContainer>
    <InpSignupContainer>
      <InpSignupHeadline>{headline}</InpSignupHeadline>
      <InpCopy>{copy}</InpCopy>
      <InpSignupCTAContainer>
        <NewsletterPuffButton style="button" />
      </InpSignupCTAContainer>
    </InpSignupContainer>
  </InpContainer>
);
