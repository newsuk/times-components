import {
  Block,
  Divider,
  Hidden,
  useBreakpointKey,
  Visible,
  BreakpointKeys,
  Stack
} from 'newskit';
import React, { useState, useEffect } from 'react';
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

export interface ContentBucket1Props {
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
}: ContentBucket1Props) => {
  const [currentBreakpoint, setBreakpoint] = useState<BreakpointKeys>('xs');
  const breakpointKey = useBreakpointKey();
  useEffect(
    () => {
      setBreakpoint(breakpointKey);
    },
    [breakpointKey]
  );
  const isMobile = ['xs', 'sm'].includes(currentBreakpoint);
  const isMedium = currentBreakpoint === 'md';
  const isLarge = ['lg', 'xl'].includes(currentBreakpoint);

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
        <Visible lg xl>
          <LeadStoryDivider
            overrides={{ stylePreset: 'lightDivider' }}
            vertical
            position="right"
          />
        </Visible>
        <StackItem>
          <Block>
            <Stack
              spaceInline={{ xs: 'space020', md: 'space040' }}
              flow={{ sm: 'vertical-center', md: 'horizontal-center' }}
            >
              <Article
                article={{
                  ...leadArticleLeft,
                  hasTopBorder: false,
                  isLeadImage: true,
                  titleTypographyPreset: isLarge
                    ? 'editorialHeadline030'
                    : isMedium
                      ? 'editorialHeadline020'
                      : 'editorialHeadline040'
                }}
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
                  isLeadImage: true,
                  titleTypographyPreset: isLarge
                    ? 'editorialHeadline030'
                    : 'editorialHeadline020'
                }}
                clickHandler={clickHandler}
              />
            </Stack>
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
              stylePreset: 'dashedDivider'
            }}
          />
        </FullWidthHidden>
        <BlockItem>
          <ArticleStack
            articles={articles}
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
