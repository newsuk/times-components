import React from 'react';
import { Visible } from 'newskit';
import { LeadArticleProps } from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import { ClickHandlerType } from '../types';
import { LeadStory4Desktop } from './desktop';
import { LeadStory4Mobile } from './mobile';

export interface LeadStory4Props {
  leadArticle: LeadArticleProps;
  artcilesRight: ArticleProps[];
  artcilesBelowMainImage: ArticleProps[];
  clickHandler: ClickHandlerType;
}

export const LeadStory4 = ({
  leadArticle,
  artcilesRight,
  artcilesBelowMainImage,
  clickHandler
}: LeadStory4Props) => {
  const modifiedLeadArticle = {
    ...leadArticle,
    hasTopBorder: false,
    imageTop: true,
    isLeadImage: true,
    headlineTypographyPreset: 'editorialHeadline040'
  };

  const article2and3 = artcilesRight && artcilesRight.slice(0, 2);
  const article4and5 = artcilesRight && artcilesRight.slice(2, 4);
  const articleMediumBreakPoint = artcilesBelowMainImage && [
    ...article4and5,
    ...artcilesBelowMainImage
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
    artcilesRight &&
    artcilesRight.map((article, index) => ({
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
      <Visible md lg xl>
        <LeadStory4Desktop
          leadArticle={modifiedLeadArticle}
          artcilesBelowMainImage={artcilesBelowMainImage}
          clickHandler={clickHandler}
          modifiedArticle2and3={modifiedArticle2and3}
          modifiedArticleRight={modifiedArticleRight}
          articlesTop={articlesTop}
          articlesBottom={articlesBottom}
        />
      </Visible>
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
