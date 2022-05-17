import React from 'react';
import { Mutation } from 'react-apollo';

import { recommendations } from '@times-components/provider-queries';
import Image from '@times-components/image';
import { NewsletterPuffButton } from './NewsletterPuffButton';

import {
  InpContainer,
  InpCopy,
  InpImageContainer,
  InpSignupCTAContainer,
  InpSignupHeadline,
  InpSignupLabel,
  InpSubscribedContainer
} from './styles';

type recommendationsProps = {
  feedbackId?: string;
  summary: string;
  headline: string;
  imageUri: string;
  label?: string;
};

export const RecommendedArticles = ({
  summary,
  headline,
  imageUri,
  label
}: recommendationsProps) => {
  return (
    <InpContainer>
      <InpImageContainer>
        <Image aspectRatio={1.42} uri={imageUri} />
      </InpImageContainer>
      <InpSubscribedContainer>
        <InpSignupLabel>{label}</InpSignupLabel>
        <InpSignupHeadline>{headline}</InpSignupHeadline>
        <InpCopy>{summary}</InpCopy>
        <InpSignupCTAContainer>
          <NewsletterPuffButton />
        </InpSignupCTAContainer>
      </InpSubscribedContainer>
    </InpContainer>
  );
};