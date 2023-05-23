import { Block, Divider } from 'newskit';
import React from 'react';
import {
  LargeArticle,
  LargeArticleProps
} from '../../components/slices/large-article';
import { StyledDivider, BlockNoTopMargin } from './styles';
import { FullWidthDividerMob } from '../../components/slices/shared-styles';

export interface LargeArticlesProps {
  largeArticles: LargeArticleProps[];
}

export const LargeArticles = ({ largeArticles }: LargeArticlesProps) => {
  const modifiedObject = {
    ...largeArticles[0],
    topArticle: 'editorialHeadline040'
  };
  const newArray = [modifiedObject, ...largeArticles.slice(1)];

  return (
    <BlockNoTopMargin>
      {newArray &&
        newArray.map((item, index) => {
          const isSecondDivider = index === 2;
          const articleTopBorder = index === 0;
          return (
            <>
              <FullWidthDividerMob>
                {articleTopBorder ? null : isSecondDivider ? (
                  <Divider
                    overrides={{
                      stylePreset: 'dashedDivider'
                    }}
                  />
                ) : (
                  <StyledDivider
                    overrides={{
                      stylePreset: 'dashedDivider'
                    }}
                  />
                )}
              </FullWidthDividerMob>
              <Block marginBlock="space040">
                <LargeArticle {...item} />
              </Block>
            </>
          );
        })}
    </BlockNoTopMargin>
  );
};
