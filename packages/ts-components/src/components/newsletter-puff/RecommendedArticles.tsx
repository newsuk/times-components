import React from 'react';
import { Mutation } from 'react-apollo';

import { recommendations as recommendationsMutation } from '@times-components/provider-queries';
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
  copy: string;
  headline: string;
  imageUri: string;
  label?: string;
};

export const RecommendedArticles = ({
  copy,
  headline,
  imageUri,
  label
}: recommendationsProps) => {

  return (
    <Mutation
      mutation={recommendationsMutation}
    >
      {() => (
        <InpContainer>
          <InpImageContainer>
            <Image aspectRatio={1.42} uri={imageUri} />
          </InpImageContainer>
          <InpSubscribedContainer>
            <InpSignupLabel>{label}</InpSignupLabel>
            <InpSignupHeadline>{headline}</InpSignupHeadline>
            <InpCopy>{copy}</InpCopy>
            <InpSignupCTAContainer>
              <NewsletterPuffButton />
            </InpSignupCTAContainer>
          </InpSubscribedContainer>
        </InpContainer>
      )}
    </Mutation>
  );
};
