import React from 'react';
import { Hidden, Visible } from 'newskit';
import { LeadArticleProps } from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import { ClickHandlerType } from '../types';
import { LeadStory4Desktop } from './desktop';
import { LeadStory4Mobile } from './mobile';

export interface LeadStory4Props {
  leadArticle: LeadArticleProps;
  articlesRight: ArticleProps[];
  articlesBelowMainImage: ArticleProps[];
  clickHandler: ClickHandlerType;
  isSummaryEnabled?: boolean;
}

export const LeadStory4 = ({
  leadArticle,
  articlesRight,
  articlesBelowMainImage,
  clickHandler,
  isSummaryEnabled
}: LeadStory4Props) => {
  const modifiedLeadArticle = {
    ...leadArticle,
    hasTopBorder: false,
    imageTop: true,
    isLeadImage: true,
    headlineTypographyPreset: 'editorialHeadline040'
  };

  const articlesRightWithIsSummaryEnabledProp = articlesRight.map(
    articleRight => ({
      ...articleRight,
      isSummaryEnabled
    })
  );

  const articlesBelowMainImageWithIsSummaryEnabledProp = articlesBelowMainImage.map(
    articleBelowMainImage => ({
      ...articleBelowMainImage,
      isSummaryEnabled
    })
  );

  const article2and3 =
    articlesRightWithIsSummaryEnabledProp &&
    articlesRightWithIsSummaryEnabledProp.slice(0, 2);
  const article4and5 =
    articlesRightWithIsSummaryEnabledProp &&
    articlesRightWithIsSummaryEnabledProp.slice(2, 4);
  const articleMediumBreakPoint = articlesBelowMainImageWithIsSummaryEnabledProp && [
    ...article4and5,
    ...articlesBelowMainImageWithIsSummaryEnabledProp
  ];
  const articlesTop =
    articleMediumBreakPoint && articleMediumBreakPoint.slice(0, 3);
  const articlesBottom =
    articleMediumBreakPoint && articleMediumBreakPoint.slice(3);
  const modifiedArticle2and3 =
    article2and3 &&
    article2and3.map((article, index) => ({
      ...article,
      hasTopBorder: index === 1
    }));
  const modifiedArticleRight =
    articlesRightWithIsSummaryEnabledProp &&
    articlesRightWithIsSummaryEnabledProp.map((article, index) => ({
      ...article,
      hasTopBorder: index > 1
    }));

  const articlesFrom5To9 =
    articleMediumBreakPoint && articleMediumBreakPoint.slice(1);
  const article4 =
    articleMediumBreakPoint && articleMediumBreakPoint.slice(0, 1);
  const article234 = article4 && article2and3 && [...article2and3, ...article4];
  return (
    <>
      <Hidden xs sm>
        <LeadStory4Desktop
          leadArticle={modifiedLeadArticle}
          articlesBelowMainImage={
            articlesBelowMainImageWithIsSummaryEnabledProp
          }
          clickHandler={clickHandler}
          modifiedArticle2and3={modifiedArticle2and3}
          modifiedArticleRight={modifiedArticleRight}
          articlesTop={articlesTop}
          articlesBottom={articlesBottom}
        />
      </Hidden>
      <Visible xs sm>
        <LeadStory4Mobile
          leadArticle={modifiedLeadArticle}
          clickHandler={clickHandler}
          articlesFrom5To9={articlesFrom5To9}
          article234={article234}
        />
      </Visible>
    </>
  );
};
