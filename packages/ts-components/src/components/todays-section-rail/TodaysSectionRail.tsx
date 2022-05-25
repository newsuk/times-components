import React, { FC } from 'react';
import { RecommendedArticles as GetRecommendedArticles } from '@times-components/provider';
import RelatedArticles from '@times-components/related-articles';
import { RelatedArticleSliceType } from '../../types/related-article-slice';
import { Placeholder } from '@times-components/image';
import {
  formatTodaysSection,
 // TodaysSection,
} from './formatters';
// getCPN getArticleID
export type recommendationsProps = {
  userId: string;
  articleId: string;
};

type Props = {
  analyticsStream: (evt: any) => void;
  recomArgs: {
    userId: string;
    articleId: string;
  };
};
//add tracking
//add to article extras
export const TodaysSectionRail: FC<Props> = ({
  analyticsStream,
  recomArgs
}) => {
  const section = 'Sport'
  return (
    <GetRecommendedArticles
      publisher={'TIMES'}
      recomArgs={recomArgs}
      ssr={false}
      debounceTimeMs={0}
    >
      {({ isLoading, error, recommendations }: any) => {
        console.log('XXXXXXXXX', recommendations, isLoading, error);
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

        const relatedArticles = formatTodaysSection(recommendations);

        const slice: RelatedArticleSliceType = {
          sliceName: 'StandardSlice',
          items: relatedArticles
            ? relatedArticles.map(article => ({ leadAsset: null, article }))
            : []
        };

        const isFeatureFlag = window.sessionStorage.getItem(
          'showTodaysArticleRail'
        );

        if (!isFeatureFlag) {
          return null;
        }

        return (
          <RelatedArticles
            heading={`Today's ${section}`}
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
