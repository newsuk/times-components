import React from 'react';

import { Placeholder } from '@times-components/image';
import RelatedArticles from '@times-components/related-articles';

import { useFetch } from '../../helpers/fetch/FetchProvider';
import { getRelatedArticlesSlice } from './formatters';

import { PlaceholderContainer } from '../common-styles';

export const RecommendedArticles: React.FC<{
  section: string;
  analyticsStream?: (evt: any) => void;
}> = ({ section, analyticsStream }) => {
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
    <RelatedArticles
      heading={`Today's ${section}`}
      slice={getRelatedArticlesSlice(data.recommendations)}
      isVisible
      analyticsStream={analyticsStream}
    />
  );
};
