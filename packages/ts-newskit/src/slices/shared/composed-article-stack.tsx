import React from 'react';
import { Block, Divider, Hidden, Visible, BreakpointKeys } from 'newskit';
import { ArticleProps } from '../../components/slices/article';
import { ArticleStackLarge, ArticleStackSmall } from './article-stacks';
import {
  FullWidthBlock,
  FullWidthHidden
} from '../../components/slices/shared-styles';
import { ClickHandlerType, StackArticleOptions } from '../types';

export interface LeadStory1Props {
  articles: ArticleProps[];
  breakpoint: BreakpointKeys;
  clickHandler: ClickHandlerType;
}

export const ComposedArticleStack = ({
  articles,
  clickHandler,
  articleOptions
}: Omit<LeadStory1Props, 'breakpoint'> & {
  articleOptions?: StackArticleOptions;
}) => {
  const firstThreeArticles = articles.slice(0, 3);
  const secondTwoArticles = articles.slice(3);

  return (
    <>
      <FullWidthHidden lg xl>
        <FullWidthBlock>
          <Divider
            overrides={{
              marginBlockEnd: 'space040',
              stylePreset: 'dashedDivider'
            }}
          />
        </FullWidthBlock>
      </FullWidthHidden>
      <Hidden md>
        <ArticleStackLarge
          articles={articles}
          clickHandler={clickHandler}
          articleOptions={articleOptions}
        />
      </Hidden>
      <Visible md>
        <ArticleStackLarge
          articles={firstThreeArticles}
          clickHandler={clickHandler}
          articleOptions={articleOptions}
        />
      </Visible>
      <Visible md>
        <Block marginBlockEnd={{ md: 'space040' }}>
          <ArticleStackSmall
            articles={secondTwoArticles}
            articleOptions={{
              md: {
                hideImage: true
              }
            }}
            clickHandler={clickHandler}
          />
        </Block>
      </Visible>
    </>
  );
};
