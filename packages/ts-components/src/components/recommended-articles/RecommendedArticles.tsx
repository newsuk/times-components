import React from 'react';

import { Placeholder } from '@times-components/image';
import RelatedArticles from '@times-components/related-articles';

import { useFetch } from '../../helpers/fetch/FetchProvider';
import { getRelatedArticlesSlice } from './formatters';

import { PlaceholderContainer } from '../common-styles';
import { RecommendedArticlesContainer } from './styles';

export const RecommendedArticles: React.FC<{
  section: string;
  isVisible?: boolean;
  analyticsStream?: (evt: any) => void;
}> = ({ section, isVisible, analyticsStream }) => {
  const { loading, error, data } = useFetch<any>();

  if (loading) {
    return (
      <PlaceholderContainer>
        <Placeholder />
      </PlaceholderContainer>
    );
  }

  if (error || data === undefined) {
    return null;
  }

  return (
    <RecommendedArticlesContainer isVisible={isVisible}>
      <RelatedArticles
        heading={`Today's ${section}`}
        slice={getRelatedArticlesSlice(data.recommendations)}
        isVisible
        analyticsStream={analyticsStream}
      />
    </RecommendedArticlesContainer>
  );
};
