import React, { FC } from 'react';
import RelatedArticles from '@times-components/related-articles';

import { RelatedArticleSliceType } from '../../types/related-article-slice';
import {
  formatTodaysSection,
  TodaysSection,
  getSectionTitle
} from './formatters';

type Props = {
  todaysSection: TodaysSection;
  analyticsStream: (evt: any) => void;
};
export const TodaysSectionRail: FC<Props> = ({
  analyticsStream,
  todaysSection
}) => {
  const relatedArticles = formatTodaysSection(todaysSection);

  const slice: RelatedArticleSliceType = {
    sliceName: 'StandardSlice',
    items: relatedArticles
      ? relatedArticles.map(article => ({ leadAsset: null, article }))
      : []
  };

  const isFeatureFlag = window.sessionStorage.getItem('showTodaysArticleRail');

  if (!isFeatureFlag) {
    return null;
  }

  return (
    <RelatedArticles
      heading={`Today's ${getSectionTitle(todaysSection)}`}
      analyticsStream={analyticsStream}
      isVisible
      slice={slice}
      imageAndHeadlineOnly
    />
  );
};
