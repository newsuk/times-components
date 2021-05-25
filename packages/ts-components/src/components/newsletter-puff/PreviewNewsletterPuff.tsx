import {
  InpContainer,
  InpCopy,
  InpImageContainer,
  InpSignupContainer,
  InpSignupCTAContainer,
  InpSignupHeadline,
  InpSignupLabel
} from './styles';
import Image from '@times-components/image';
import { NewsletterPuffButton } from './NewsletterPuffButton';
import React from 'react';

type PreviewNewsletterPuffProps = {
  copy: string;
  headline: string;
  imageUri: string;
  label?: string;
};

export const PreviewNewsletterPuff = ({
  copy,
  headline,
  imageUri,
  label
}: PreviewNewsletterPuffProps) => (
  <InpContainer>
    <InpImageContainer>
      <Image aspectRatio={1.42} uri={imageUri} />
    </InpImageContainer>
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
