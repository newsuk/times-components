import React, { useEffect, useState } from 'react';

import RelatedArticles from '@times-components/related-articles';
import { GetRecommendedArticles } from '@times-components/provider';

import { RelatedArticleSliceType } from '../../types/related-article-slice';

import { Placeholder } from '@times-components/image';

import { RecommendedArticlesContainer } from './styles';

type RecommendedArticlesProps = {
  articleId: string;
  section: string;
  isVisible?: boolean;
  analyticsStream?: (evt: any) => void;
};

export const RecommendedArticles = ({
  articleId,
  section,
  isVisible,
  analyticsStream
}: RecommendedArticlesProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <RecommendedArticlesContainer isVisible={isVisible}>
      <GetRecommendedArticles
        publisher={'TIMES'}
        recomArgs={{ userId: '1234', articleId }}
        ssr={false}
        debounceTimeMs={0}
      >
        {({ isLoading, error, recommendations }: any) => {
          if (error) {
            return null;
          }

          if (isLoading || !recommendations) {
            return (
              <div className="placeholder">
                <Placeholder />
              </div>
            );
          }

          const slice: RelatedArticleSliceType = {
            sliceName: 'StandardSlice',
            items: recommendations
              ? recommendations.articles.map((article: any) => ({ article }))
              : []
          };

          return (
            <RelatedArticles
              heading={`Today's ${section}`}
              slice={slice}
              isVisible
              analyticsStream={analyticsStream}
            />
          );
        }}
      </GetRecommendedArticles>
    </RecommendedArticlesContainer>
  );
};
