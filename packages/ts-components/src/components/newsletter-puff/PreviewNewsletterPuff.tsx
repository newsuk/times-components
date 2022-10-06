import {
  InpContainer,
  InpCopy,
  InpSignupContainer,
  InpSignupCTAContainer,
  InpSignupHeadline,
} from './styles';
import { NewsletterPuffButton } from './NewsletterPuffButton';
import React from 'react';

type PreviewNewsletterPuffProps = {
  copy: string;
  headline: string;
};

export const PreviewNewsletterPuff = ({
  copy,
  headline,
}: PreviewNewsletterPuffProps) => (
  <InpContainer>
    <InpSignupContainer>
      <InpSignupHeadline>{headline}</InpSignupHeadline>
      <InpCopy>{copy}</InpCopy>
      <InpSignupCTAContainer>
        <NewsletterPuffButton style='button'/>
      </InpSignupCTAContainer>
    </InpSignupContainer>
  </InpContainer>
);
