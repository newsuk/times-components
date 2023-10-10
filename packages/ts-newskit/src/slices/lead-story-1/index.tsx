import { Block, Divider, Visible } from 'newskit';
import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { Article, ArticleProps } from '../../components/slices/article';
import { StackItem, LeadStoryDivider, BlockItem } from '../shared-styles';
import {
  ArticleStackLeadStory,
  ArticleStackSmall,
  CustomStackLayout
} from '../shared';
import {
  FullWidthBlock,
  FullWidthHidden
} from '../../components/slices/shared-styles';
import { ComposedArticleStack } from '../shared/composed-article-stack';
import { GroupedArticle } from '../../components/slices/shared/grouped-article';
import { ClickHandlerType } from '../types';
import { defaultArticleOptions } from '../../utils/default-article-options';

export interface LeadStory1Props {
  leadArticle: LeadArticleProps;
  articles: ArticleProps[];
  groupedArticles: {
    articles: LeadArticleProps[];
  };
  smallArticles: ArticleProps[];
  singleArticle: ArticleProps;
  articlesWithListItems: LeadArticleProps;
  clickHandler: ClickHandlerType;
}

export const LeadStory1 = ({
  leadArticle,
  articles,
  groupedArticles,
  smallArticles,
  singleArticle,
  articlesWithListItems,
  clickHandler
}: LeadStory1Props) => {
  const modifiedArticlesWithUnorderedList = {
    ...articlesWithListItems,
    hasTopBorder: false,
    textBlockMarginBlockStart: 'space050',
    headlineTypographyPreset: {
      xs: 'editorialHeadline040',
      sm: 'editorialHeadline050',
      md: 'editorialHeadline060'
    },
    imageTop: true
  };

  const articlesWithUnorderedListOptions = {
    md: {
      hideImage: true
    },
    lg: {
      hideImage: true
    },
    xl: {
      hideImage: true
    }
  };

  const modifiedArticlesWithUnorderedListOptions = {
    ...defaultArticleOptions,
    ...articlesWithUnorderedListOptions
  };

  const modifiedLeadArticle = {
    ...leadArticle,
    hasTopBorder: false,
    imageTop: true,
    isLeadImage: true,
    headlineTypographyPreset: {
      xs: 'editorialHeadline040',
      md: 'editorialHeadline020'
    }
  };

  const modifiedSingleArticle = {
    ...singleArticle,
    hideImage: true
  };

  const marginTop = singleArticle
    ? 'space040'
    : !!articlesWithListItems.listData
      ? 'space020'
      : 'space040';

  return (
    <CustomStackLayout>
      <StackItem
        marginBlockEnd={{
          xs: 'space040',
          md: 'space000'
        }}
        $width={{
          xs: '100%',
          md: '260px'
        }}
      >
        {Object.entries(modifiedArticlesWithUnorderedListOptions).map(
          ([breakpoint, opts]) => (
            <Visible {...{ [breakpoint]: true }}>
              <LeadArticle
                article={{
                  ...modifiedArticlesWithUnorderedList,
                  ...opts
                }}
                clickHandler={clickHandler}
              />
            </Visible>
          )
        )}
        {singleArticle && (
          <BlockItem>
            <FullWidthBlock>
              <Divider
                overrides={{
                  stylePreset: 'dashedDivider',
                  marginBlockStart: !!articlesWithListItems.listData
                    ? 'space020'
                    : 'space040',
                  marginBlockEnd: 'space040'
                }}
              />
            </FullWidthBlock>
            <Article
              article={modifiedSingleArticle}
              clickHandler={clickHandler}
            />
          </BlockItem>
        )}
        {groupedArticles && (
          <>
            <FullWidthBlock>
              <Divider
                overrides={{
                  stylePreset: 'dashedDivider',
                  marginBlockStart: marginTop,
                  marginBlockEnd: 'space040'
                }}
              />
            </FullWidthBlock>
            <GroupedArticle {...groupedArticles} clickHandler={clickHandler} />
          </>
        )}
      </StackItem>
      <StackItem
        $width={{
          xs: '100%',
          md: '428px',
          lg: '465px',
          xl: '550px'
        }}
        marginInlineStart={{
          md: 'space060'
        }}
        marginInlineEnd={{
          lg: 'space060'
        }}
      >
        <FullWidthHidden md lg xl>
          <FullWidthBlock>
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlockEnd: 'space040'
              }}
            />
          </FullWidthBlock>
        </FullWidthHidden>
        <Block>
          <Visible lg xl>
            <LeadStoryDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
              position="right"
            />
          </Visible>
          <BlockItem marginBlockEnd={{ xs: 'space040', md: 'space000' }}>
            <LeadArticle
              article={modifiedLeadArticle}
              clickHandler={clickHandler}
            />
          </BlockItem>
          <Visible md lg xl>
            <LeadStoryDivider
              overrides={{
                stylePreset: 'lightDivider'
              }}
              vertical
              position="left"
            />
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlock: 'space040'
              }}
            />
          </Visible>
          <ArticleStackSmall
            articles={smallArticles}
            articleOptions={{
              xs: {
                isFullWidth: true,
                hasTopBorder: true,
                hideImage: true
              },
              sm: {
                isFullWidth: true,
                hasTopBorder: true,
                hideImage: true
              }
            }}
            clickHandler={clickHandler}
          />
        </Block>
      </StackItem>
      <FullWidthHidden md lg xl>
        <BlockItem>
          <ComposedArticleStack
            articles={articles}
            clickHandler={clickHandler}
          />
        </BlockItem>
      </FullWidthHidden>
      <Visible md lg xl>
        <ArticleStackLeadStory
          articleOptions={{
            xl: {
              imageRight: true
            }
          }}
          modifiedArticles={articles}
          clickHandler={clickHandler}
        />
      </Visible>
    </CustomStackLayout>
  );
};
