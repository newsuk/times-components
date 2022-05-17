import React from 'react';

import { RecommendedArticles as GetRecommendedArticles } from '@times-components/provider';

/*import { Mutation } from 'react-apollo';

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
} from './styles';*/

type recommendationsProps = {
  feedbackId?: string;
  summary: string;
  headline: string;
  imageUri: string;
  label?: string;
};

export const RecommendedArticles = ({
  recomArgs
}: {
  recomArgs: recommendationsProps;
}) => {
  return (
    <GetRecommendedArticles
      publisher={'TIMES'}
      recomArgs={recomArgs}
      ssr={false}
      debounceTimeMs={0}
    >
      {({ isLoading, error, data }: any) => {
        // tslint:disable-next-line:no-console
        console.log(isLoading, error, data);
        return null;
      }}
    </GetRecommendedArticles>
  );
};
