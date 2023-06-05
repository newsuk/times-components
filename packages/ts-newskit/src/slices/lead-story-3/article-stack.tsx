import { Block, Divider, BreakpointKeys } from 'newskit';
import React from 'react';
import { BlockNoTopMargin } from '../lead-story-1/styles';
import { FullWidthDividerMob } from '../../components/slices/shared-styles';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';

export interface ArticlesProps {
  leadArticles: LeadArticleProps[];
  breakpointKey: BreakpointKeys;
}

export const ArticleStack = ({
  leadArticles,
  breakpointKey
}: ArticlesProps) => {
  const modifiedArticles = leadArticles.map(leadArticle => ({
    ...leadArticle,
    imageTop: true
  }));

  return (
    <BlockNoTopMargin>
      {modifiedArticles &&
        modifiedArticles.map((modifiedArticle, index) => {
          const articlesWithModifiedTypography =
            index === 0
              ? {
                  ...modifiedArticle,
                  textBlockMarginBlockStart: 'space050',
                  typographyPreset:
                    breakpointKey === 'xs'
                      ? 'editorialHeadline040'
                      : breakpointKey === 'sm'
                        ? 'editorialHeadline050'
                        : 'editorialHeadline060'
                }
              : {
                  ...modifiedArticle,
                  typographyPreset: 'editorialHeadline020'
                };
          return (
            <>
              {index !== 0 && (
                <FullWidthDividerMob>
                  <Divider
                    overrides={{
                      stylePreset: 'dashedDivider'
                    }}
                  />
                </FullWidthDividerMob>
              )}
              <Block marginBlock="space040">
                <LeadArticle {...articlesWithModifiedTypography} />
              </Block>
            </>
          );
        })}
    </BlockNoTopMargin>
  );
};
