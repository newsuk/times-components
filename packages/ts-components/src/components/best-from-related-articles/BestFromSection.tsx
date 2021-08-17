import React, { FC } from 'react';
import RelatedArticles from '@times-components/related-articles';
import { formatNewskitData } from './formatters';

type Props = {
  analyticsStream: (evt: any) => void;
};
export const BestOfRelatedArticles: FC<Props> = ({
  analyticsStream,
  slice
}) => {
  const relatedArticles = formatNewskitData(slice);

  const BestOfRelatedArticlesSlice = {
    sliceName: 'StandardSlice',
    items: relatedArticles
      ? relatedArticles.map(article => ({ leadAsset: null, article }))
      : []
  };
  return (
    <RelatedArticles
      heading={`Best From NewskitAPI`}
      analyticsStream={analyticsStream}
      isVisible
      slice={BestOfRelatedArticlesSlice}
    />
  );
};
