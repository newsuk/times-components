import React from 'react';

import { RecommendedArticles as GetRecommendedArticles } from '@times-components/provider';
import RelatedArticles from '@times-components/related-articles';
import { relatedArticleSlice } from '../related-article-slice/RelatedArticleSlice.stories';
// import { RelatedArticleSliceType } from '../../types/related-article-slice';
import {
  getSectionTitle,
  LatestSection
} from '../latest-from-section/formatters';

import { Placeholder } from '@times-components/image';

export type recommendationsProps = {
  userId: string;
  articleId: string;
};

export const RecommendedArticles = ({
  analyticsStream,
  latestFromSection,
  recomArgs
}: {
  latestFromSection: LatestSection;
  analyticsStream: (evt: any) => void;
  recomArgs: recommendationsProps;
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

        // const slice: RelatedArticleSliceType = {
        //   sliceName: 'StandardSlice',
        //   items: recommendations
        //     ? recommendations.articles.map((recArticle: any) => ({ articles: recArticle }))
        //     : []
        // };

        return (
          <RelatedArticles
            heading={`Today's ${getSectionTitle(latestFromSection)}`}
            analyticsStream={analyticsStream}
            isVisible
            slice={relatedArticleSlice}
            // slice={slice}
          />
        );
      }};
    </GetRecommendedArticles>
  );
};

        // return (
        //   <div className='container'>
        //     {recommendations.articles.map((recArticle: any) => {
        //       return (
        //         <a href={recArticle.url}>
        //           <div id={recArticle.id}>
        //             <img src={recArticle.media.Image} />
        //             <p className="headline">
        //               {recArticle.headline}
        //             </p>
        //             <p className="summary">
        //               {recArticle.summary.ArticleParagraph}
        //             </p>
        //           </div>
        //         </a>
        //       );
        //     })}
        //   </div>
        // );
      // }}