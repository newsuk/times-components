import React from 'react';
import { Block, Divider, Hidden, Visible } from 'newskit';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import {
  LeadStoryDivider,
  StackItem,
  BlockItem,
  LeadStoryContainer
} from '../shared-styles';
import {
  FullWidthBlock,
  FullWidthHidden
} from '../../components/slices/shared-styles';
import { ComposedArticleStack } from '../shared/composed-article-stack';
import { ArticleStack } from './article-stack';
import { ArticleStackLeadStory } from '../shared';
import { ClickHandlerType } from '../types';

export interface LeadStory3Props {
  leadArticle: LeadArticleProps;
  articles: ArticleProps[];
  leadArticles: LeadArticleProps[];
  clickHandler: ClickHandlerType;
}

export const LeadStory3 = ({
  leadArticle,
  articles,
  leadArticles,
  clickHandler
}: LeadStory3Props) => {
  const modifiedLeadArticle = {
    ...leadArticle,
    headlineTypographyPreset: 'editorialHeadline040',
    imageTop: true,
    isLeadImage: true,
    hasTopBorder: false,
    loadingAspectRatio: '4:5',
    shortSummary: undefined
  };

  return (
    <LeadStoryContainer className="lead-story-3-container">
      <StackItem
        $width={{
          xs: '100%',
          md: '260px'
        }}
      >
        <ArticleStack leadArticles={leadArticles} clickHandler={clickHandler} />
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
        <Hidden md lg xl>
          <FullWidthBlock
            paddingInline={{
              xs: 'space045',
              md: 'space000'
            }}
          >
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlockEnd: 'space040'
              }}
            />
          </FullWidthBlock>
        </Hidden>
        <Block marginBlockEnd={{ xs: 'space040', md: 'space000' }}>
          <LeadStoryDivider
            overrides={{ stylePreset: 'lightDivider' }}
            vertical
            position="right"
          />
          <LeadArticle
            article={modifiedLeadArticle}
            clickHandler={clickHandler}
          />
          <Visible md lg xl>
            <LeadStoryDivider
              overrides={{
                stylePreset: 'lightDivider'
              }}
              vertical
              position="left"
            />
          </Visible>
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
            lg: {
              hideImage: true
            },
            xl: {
              imageRight: true
            }
          }}
          modifiedArticles={articles}
          clickHandler={clickHandler}
        />
      </Visible>
    </LeadStoryContainer>
  );
};
