import React, { FC } from 'react';
import RelatedArticles from '@times-components/related-articles';

import { RelatedArticleSliceType } from '../../types/related-article-slice';
import {
  formatLatestFromSection,
  LatestSection
} from './formatters';
 
type Props = {
  latestFromSection: LatestSection;
  analyticsStream: (evt: any) => void;
};
export const TodaysArticleRail: FC<Props> = ({
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
  const url = window.location.href

  const isFeatureFlag = url.includes('TodaysArticleRail')

  return (
    <RelatedArticles
      heading="Today's News"
      analyticsStream={analyticsStream}
      isVisible
      slice={slice}
      imageAndHeadlineOnly
    />
  );
};
