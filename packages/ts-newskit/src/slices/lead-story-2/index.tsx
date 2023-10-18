import { Block, Divider, Hidden, Visible } from 'newskit';
import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import { LeadStoryDivider, StackItem, BlockItem } from '../shared-styles';
import { ArticleStack } from './article-stacks';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import {
  ArticleStackLeadStory,
  ComposedArticleStack,
  CustomStackLayout
} from '../shared';
import { ClickHandlerType } from '../types';
import { FullWidthHidden } from '../../components/slices/shared-styles/index';
import { defaultArticleOptions } from '../../utils/default-article-options';

export interface LeadStory2Props {
  leadArticle: LeadArticleProps;
  articles: ArticleProps[];
  verticalArticles: LeadArticleProps[];
  horizontalArticles: LeadArticleProps[];
  clickHandler: ClickHandlerType;
}

export const LeadStory2 = ({
  leadArticle,
  articles,
  verticalArticles,
  horizontalArticles,
  clickHandler
}: LeadStory2Props) => {
  const modifiedLeadArticle = {
    ...leadArticle,
    hasTopBorder: false,
    textBlockMarginBlockStart: 'space050',
    headlineTypographyPreset: {
      xs: 'editorialHeadline040',
      sm: 'editorialHeadline050',
      md: 'editorialHeadline060'
    }
  };

  const leadArticleOptions = {
    xs: {
      contentWidth: '246px',
      imageTop: true
    },
    sm: {
      contentWidth: '246px',
      imageTop: true
    },
    md: {
      contentWidth: '246px'
    },
    lg: {
      contentWidth: '246px'
    },
    xl: {
      contentWidth: '274px'
    }
  };

  const modifiedLeadArticleOptions = {
    ...defaultArticleOptions,
    ...leadArticleOptions
  };

  return (
    <CustomStackLayout>
      <StackItem
        $width={{
          xs: '100%',
          md: '720px',
          lg: '757px',
          xl: '840px'
        }}
        marginInlineEnd={{
          lg: 'space060'
        }}
      >
        <Block>
          <LeadStoryDivider
            overrides={{ stylePreset: 'lightDivider' }}
            vertical
            position="right"
          />
          {Object.entries(modifiedLeadArticleOptions).map(
            ([breakpoint, opts]) => (
              <Visible {...{ [breakpoint]: true }}>
                <LeadArticle
                  article={{
                    ...modifiedLeadArticle,
                    ...opts
                  }}
                  clickHandler={clickHandler}
                />
              </Visible>
            )
          )}
          <Visible xs sm>
            <FullWidthBlock
              paddingInline={{
                xs: 'space045',
                md: 'space000'
              }}
            >
              <Divider
                overrides={{
                  stylePreset: 'dashedDivider',
                  marginBlockStart: 'space040',
                  marginBlockEnd: 'space040'
                }}
              />
            </FullWidthBlock>
          </Visible>
          <Visible md lg xl>
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlock: 'space040'
              }}
            />
          </Visible>
          <Visible xl>
            <ArticleStack
              verticalArticles={verticalArticles}
              horizontalArticles={horizontalArticles}
              horizontalArticleContentWidth="258px"
              clickHandler={clickHandler}
            />
          </Visible>
          <Hidden xl>
            <ArticleStack
              verticalArticles={verticalArticles}
              horizontalArticles={horizontalArticles}
              horizontalArticleContentWidth="230px"
              clickHandler={clickHandler}
            />
          </Hidden>
        </Block>
      </StackItem>
      <FullWidthHidden md lg xl>
        <BlockItem marginBlockStart="space040">
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
