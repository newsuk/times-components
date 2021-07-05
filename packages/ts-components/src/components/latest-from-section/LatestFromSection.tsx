import React, { FC } from 'react';
import RelatedArticles from '@times-components/related-articles';

import { RelatedArticleSliceType } from '../../types/related-article-slice';
import {
  formatLatestFromSection,
  getSectionTitle,
  LatestSection
} from './formatters';

type Props = {
  latestFromSection: LatestSection;
  analyticsStream: (evt: any) => void;
};
export const LatestFromSection: FC<Props> = ({
  analyticsStream,
  latestFromSection
}) => {
  const relatedArticles = formatLatestFromSection(latestFromSection);

  const slice: RelatedArticleSliceType = {
    sliceName: 'StandardSlice',
    items: relatedArticles
      ? relatedArticles.map(article => ({ leadAsset: null, article }))
      : []
  };

  return (
    <RelatedArticles
      heading={`Latest from ${getSectionTitle(latestFromSection)}`}
      analyticsStream={analyticsStream}
      isVisible
      slice={slice}
    />
  );
};
