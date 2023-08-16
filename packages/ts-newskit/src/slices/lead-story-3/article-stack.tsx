import { Block, Divider, BreakpointKeys } from 'newskit';
import React from 'react';
import { BlockNoTopMargin } from '../lead-story-1/styles';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';

export interface ArticlesProps {
  leadArticles: LeadArticleProps[];
  breakpointKey: BreakpointKeys;
  clickHandler: ClickHandlerType;
  screenXsAndSm: boolean;
}

export const ArticleStack = ({
  leadArticles,
  breakpointKey,
  clickHandler,
  screenXsAndSm
}: ArticlesProps) => {
  return (
    <BlockNoTopMargin>
      {leadArticles &&
        leadArticles.map((modifiedArticle, index) => {
          const articlesWithModifiedTypography =
            index === 0
              ? {
                  ...modifiedArticle,
                  hideImage: !screenXsAndSm,
                  imageTop: true,
                  isLeadImage: screenXsAndSm,
                  textBlockMarginBlockStart: 'space050',
                  headlineTypographyPreset:
                    breakpointKey === 'xs'
                      ? 'editorialHeadline040'
                      : breakpointKey === 'sm'
                        ? 'editorialHeadline050'
                        : 'editorialHeadline060'
                }
              : {
                  ...modifiedArticle,
                  headlineTypographyPreset: 'editorialHeadline020',
                  hideImage: true
                };
          return (
            <>
              {index !== 0 && (
                <FullWidthBlock>
                  <Divider
                    overrides={{
                      stylePreset: 'dashedDivider'
                    }}
                  />
                </FullWidthBlock>
              )}
              <Block marginBlock="space040">
                <LeadArticle
                  article={articlesWithModifiedTypography}
                  clickHandler={clickHandler}
                />
              </Block>
            </>
          );
        })}
    </BlockNoTopMargin>
  );
};
