import { Block, Divider, Visible } from 'newskit';
import React from 'react';
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
import { ArticleStack } from './article-stacks';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { ArticleStackLeadStory, ComposedArticleStack } from '../shared';
import { ClickHandlerType } from '../types';
import { FullWidthHidden } from '../../components/slices/shared-styles/index';

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
      md: 'editorialHeadline060'
    }
  };

  return (
    <LeadStoryContainer>
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
          <Visible xs sm>
            <LeadArticle
              article={{
                ...modifiedLeadArticle,
                imageTop: true,
                contentWidth: {
                  xs: '246px auto',
                  xl: '274px auto'
                }
              }}
              clickHandler={clickHandler}
            />
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
            <LeadArticle
              article={{
                ...modifiedLeadArticle,
                contentWidth: {
                  xs: '246px auto',
                  xl: '274px auto'
                }
              }}
              clickHandler={clickHandler}
            />
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlock: 'space040'
              }}
            />
          </Visible>
          <ArticleStack
            verticalArticles={verticalArticles}
            horizontalArticles={horizontalArticles}
            horizontalArticleContentWidth={{
              md: '230px',
              xl: '258px'
            }}
            clickHandler={clickHandler}
          />
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
          modifiedArticles={articles}
          clickHandler={clickHandler}
        />
      </Visible>
    </LeadStoryContainer>
  );
};
