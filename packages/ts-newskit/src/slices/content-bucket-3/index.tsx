import { Block, Divider, Hidden, Visible, GridLayout } from 'newskit';
import React from 'react';
import { CommentCardProps } from '../../components/slices/comment-card';
import { LeadArticleProps } from '../../components/slices/lead-article';
import { ArticleProps, Article } from '../../components/slices/article';
import {
  LeadStoryDivider,
  StackItem,
  BlockItem,
  ArticleDivider
} from '../shared-styles';

import { CommentStack } from '../shared/comment-stack';
import { ArticleStack } from '../content-bucket-3/article-stack';
import { CustomStackLayout } from '../shared';
import { FullWidthHidden } from '../../components/slices/shared-styles';
import { ClickHandlerType } from '../types';
import { defaultArticleOptions } from '../../utils/default-article-options';

export interface ContentBucket3Props {
  leadArticleLeft: LeadArticleProps;
  leadArticleRight: LeadArticleProps;
  comments: CommentCardProps[];
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
}

export const ContentBucket3 = ({
  leadArticleLeft,
  leadArticleRight,
  comments,
  articles,
  clickHandler
}: ContentBucket3Props) => {
  const leadArticleRightOptions = {
    xs: {
      hasTopBorder: true
    },
    sm: {
      hasTopBorder: true
    },
    md: {
      hasTopBorder: false
    },
    lg: {
      hasTopBorder: false
    },
    xl: {
      hasTopBorder: false
    }
  };

  const modifiedleadArticleRightOptions = {
    ...defaultArticleOptions,
    ...leadArticleRightOptions
  };

  const modifiedleadArticleLeft = {
    ...leadArticleLeft,
    hasTopBorder: false,
    isLeadImage: true,
    titleTypographyPreset: {
      xs: 'editorialHeadline040',
      md: 'editorialHeadline020',
      lg: 'editorialHeadline030'
    }
  };

  const modifiedleadArticleRight = {
    ...leadArticleRight,
    isLeadImage: true,
    titleTypographyPreset: {
      xs: 'editorialHeadline020',
      lg: 'editorialHeadline030'
    }
  };

  return (
    <CustomStackLayout>
      <StackItem
        $width={{
          xs: '100%',
          md: '720px',
          lg: '760px',
          xl: '840px'
        }}
        marginInlineEnd={{
          lg: 'space060'
        }}
      >
        <LeadStoryDivider
          overrides={{ stylePreset: 'lightDivider' }}
          vertical
          position="right"
        />
        <StackItem>
          <Block>
            <GridLayout
              columns={{
                xs: '1fr',
                md: '1fr 1px 1fr'
              }}
              columnGap={{ md: 'space040' }}
              rowGap="space040"
            >
              <Article
                article={modifiedleadArticleLeft}
                clickHandler={clickHandler}
              />
              <Hidden xs sm>
                <ArticleDivider
                  overrides={{ stylePreset: 'lightDivider' }}
                  vertical
                />
              </Hidden>
              <Article
                article={{
                  ...leadArticleRight,
                  hasTopBorder: isMobile,
                  topBorderStyle: 'lightDashedDivider',
                  tagAndFlagMarginBlockStart: {
                    xs: 'space030',
                    md: 'space040'
                  },
                  isLeadImage: true,
                  titleTypographyPreset: isLarge
                    ? 'editorialHeadline030'
                    : 'editorialHeadline020'
                }}
                clickHandler={clickHandler}
              />
            </GridLayout>
          </Block>
        </StackItem>
        <Block>
          <Hidden xs sm md>
            <CommentStack comments={comments} clickHandler={clickHandler} />
          </Hidden>
        </Block>
      </StackItem>
      <StackItem
        $width={{
          xs: '100%',
          md: '720px',
          lg: '185px',
          xl: '402px'
        }}
      >
        <FullWidthHidden lg xl>
          <Divider
            overrides={{
              marginBlock: 'space040',
              stylePreset: { xs: 'lightDashedDivider', md: 'dashedDivider' }
            }}
          />
        </FullWidthHidden>
        <BlockItem>
          <ArticleStack
            articles={articles.map(article => ({
              ...article,
              topBorderStyle: { xs: 'lightDashedDivider', md: 'dashedDivider' }
            }))}
            breakpoint={currentBreakpoint}
            clickHandler={clickHandler}
          />
        </BlockItem>
      </StackItem>
      <Visible md xs sm>
        <BlockItem
          $width={{
            xs: '100%',
            md: '720px',
            lg: '976px',
            xl: '1276px'
          }}
        >
          <CommentStack comments={comments} clickHandler={clickHandler} />
        </BlockItem>
      </Visible>
    </CustomStackLayout>
  );
};
