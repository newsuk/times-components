import {
  InpContainer,
  InpCopy,
  InpSignupContainer,
  InpSignupCTAContainer,
  InpSignupHeadline,
  InpSignupLabel
} from './styles';
import { NewsletterPuffButton } from './NewsletterPuffButton';
import React from 'react';

type PreviewNewsletterPuffProps = {
  copy: string;
  headline: string;
  label?: string;
};

export const PreviewNewsletterPuff = ({
  copy,
  headline,
  label
}: PreviewNewsletterPuffProps) => (
  <InpContainer>
    <InpSignupContainer>
      <InpSignupLabel>{label}</InpSignupLabel>
      <InpSignupHeadline>{headline}</InpSignupHeadline>
      <InpCopy>{copy}</InpCopy>
      <InpSignupCTAContainer>
        <NewsletterPuffButton />
      </InpSignupCTAContainer>
    </InpSignupContainer>
  </InpContainer>
);
