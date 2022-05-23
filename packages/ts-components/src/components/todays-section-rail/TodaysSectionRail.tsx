import React, { FC } from 'react';
import { RecommendedArticles as GetRecommendedArticles } from '@times-components/provider';
import RelatedArticles from '@times-components/related-articles';
import { RelatedArticleSliceType } from '../../types/related-article-slice';
import { Placeholder } from '@times-components/image';
import {
  formatTodaysSection,
  TodaysSection,
  getSectionTitle
} from './formatters';

export type recommendationsProps = {
  userId: string;
  articleId: string;
};

type Props = {
  todaysSection: TodaysSection;
  analyticsStream: (evt: any) => void;
  recomArgs:  {
    userId: string;
    articleId: string;
  };
};



export const TodaysSectionRail: FC<Props> = ({
  analyticsStream,
  todaysSection,
  recomArgs
}) => {
  return (
    <GetRecommendedArticles
      publisher={'TIMES'}
      recomArgs={recomArgs}
      ssr={false}
      debounceTimeMs={0}
    >
      {({ isLoading, error, recommendations }: any) => {
        if (error) {
          return null;
        }

        if (isLoading) {
          return (
            <div className="placeholder">
              <Placeholder />
            </div>
          );
        }


  const relatedArticles = formatTodaysSection(recommendations.articles);

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
  }}
</GetRecommendedArticles>
  );
};
