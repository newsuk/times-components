import { Divider, Hidden, Visible, Stack } from 'newskit';
import React from 'react';
import { StackItem, LeadStoryDivider, BlockItem } from '../shared-styles';
import { ArticleStacks, ArticleStackLgAndXl } from './article-stack';
import { ArticleProps } from '../../components/slices/article';
import {
  LeadArticleProps,
  LeadArticle
} from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';

export interface LeadStory4PropsDesktop {
  leadArticle: LeadArticleProps;
  artcilesBelowMainImage: ArticleProps[];
  modifiedArticle2and3: ArticleProps[];
  modifiedArticleRight: ArticleProps[];
  articlesTop: ArticleProps[];
  articlesBottom: ArticleProps[];
  clickHandler: ClickHandlerType;
}

export const LeadStory4Desktop = ({
  leadArticle,
  artcilesBelowMainImage,
  clickHandler,
  articlesTop,
  modifiedArticle2and3,
  modifiedArticleRight,
  articlesBottom
}: LeadStory4PropsDesktop) => {
  return (
    <>
      <Stack flow="horizontal-top" marginBlockEnd="space040">
        <StackItem
          $width={{
            xs: '100%',
            md: '69.5%',
            lg: '50%',
            xl: '50%'
          }}
          marginInlineEnd={{
            md: 'space060'
          }}
        >
          <LeadArticle article={leadArticle} clickHandler={clickHandler} />
        </StackItem>
        <StackItem
          $width={{
            xs: '100%',
            md: '30.5%',
            lg: '50%',
            xl: '50%'
          }}
        >
          <Hidden xs sm>
            <LeadStoryDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
              position="left"
            />
            <Visible md>
              <BlockItem>
                <ArticleStacks
                  articles={modifiedArticle2and3}
                  clickHandler={clickHandler}
                />
              </BlockItem>
            </Visible>
            <Visible lg xl>
              <BlockItem>
                <ArticleStacks
                  articles={modifiedArticleRight}
                  clickHandler={clickHandler}
                />
              </BlockItem>
            </Visible>
          </Hidden>
        </StackItem>
      </Stack>
      <Divider
        overrides={{
          marginBlockEnd: 'space040',
          stylePreset: 'dashedDivider'
        }}
        aria-label="article-divider-horizontal"
      />
      <Visible lg xl>
        <ArticleStackLgAndXl
          articles={artcilesBelowMainImage}
          clickHandler={clickHandler}
        />
      </Visible>
      <Visible md>
        <ArticleStacks
          articles={articlesTop}
          clickHandler={clickHandler}
          hasTopBorder={false}
          isMediumBreakPoint
        />
        <ArticleStacks
          articles={articlesBottom}
          clickHandler={clickHandler}
          hasTopBorder={true}
          isMediumBreakPoint
        />
      </Visible>
    </>
  );
};
