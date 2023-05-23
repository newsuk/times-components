import React from 'react';
import { Block, Divider, Hidden, Visible, BreakpointKeys } from 'newskit';
import { ArticleProps } from '../../components/slices/article';
import { ArticleStackLarge, ArticleStackSmall } from './article-stacks';
import { FullWidthDividerMob } from '../../components/slices/shared-styles';

export interface LeadStory1Props {
  articles: ArticleProps[];
  breakpoint: BreakpointKeys;
}

export const ComposedArticleStack = ({
  breakpoint,
  articles
}: LeadStory1Props) => {
  const firstThreeArticles = articles.slice(0, 3);
  const secondTwoArticles = articles.slice(3);
  const screenXsAndSm = breakpoint === 'xs' || breakpoint === 'sm';
  const screenMd = breakpoint === 'md';
  const articlesArray = screenMd ? firstThreeArticles : articles;

  return (
    <>
      <Hidden lg xl>
        <FullWidthDividerMob>
          <Divider
            overrides={{
              marginBlockEnd: 'space040',
              stylePreset: 'dashedDivider'
            }}
          />
        </FullWidthDividerMob>
      </Hidden>
      <ArticleStackLarge articles={articlesArray} breakpoint={breakpoint} />
      <Visible md>
        <Hidden xs sm>
          <Divider
            overrides={{
              stylePreset: 'dashedDivider',
              marginBlockStart: 'space040'
            }}
          />
        </Hidden>
        <Block marginBlockEnd={{ md: 'space040' }}>
          <ArticleStackSmall
            articles={secondTwoArticles}
            isFullWidth={screenXsAndSm}
            hideImage={screenMd}
            hasTopBorder={false}
            breakpoint={breakpoint}
          />
        </Block>
      </Visible>
    </>
  );
};
