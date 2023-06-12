import { Block, Divider, Stack, useBreakpointKey, Visible } from 'newskit';
import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import { LeadStoryDivider, StackItem, BlockItem } from '../shared-styles';
import { ArticleStack } from './article-stacks';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { ArticleStackLeadStory, ComposedArticleStack } from '../shared';

export interface LeadStory2Props {
  leadArticle: LeadArticleProps;
  articles: ArticleProps[];
  verticalArticles: LeadArticleProps[];
  horizontalArticles: LeadArticleProps[];
}

export const LeadStory2 = ({
  leadArticle,
  articles,
  verticalArticles,
  horizontalArticles
}: LeadStory2Props) => {
  const breakpointKey = useBreakpointKey();

  const modifedArticles =
    breakpointKey === 'xl'
      ? articles.map(article => ({
          ...article,
          imageRight: true
        }))
      : articles;

  const screenXsAndSm = breakpointKey === 'xs' || breakpointKey === 'sm';

  const modifiedLeadArticle = {
    ...leadArticle,
    imageTop: !!screenXsAndSm,
    hasTopBorder: false,
    textBlockMarginBlockStart: 'space050',
    typographyPreset:
      breakpointKey === 'xs'
        ? 'editorialHeadline040'
        : breakpointKey === 'sm'
          ? 'editorialHeadline050'
          : 'editorialHeadline060'
  };

  return (
    <Stack
      flow="horizontal-top"
      stackDistribution="center"
      wrap="wrap"
      marginInline={{
        xs: 'space045',
        md: 'space000'
      }}
    >
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
        <Block>
          <Visible lg xl>
            <LeadStoryDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
              position="right"
            />
          </Visible>
          <LeadArticle contentWidth="245px" {...modifiedLeadArticle} />
          {screenXsAndSm ? (
            <FullWidthBlock>
              <Divider
                overrides={{
                  stylePreset: 'dashedDivider',
                  marginBlockStart: 'space040',
                  marginBlockEnd: 'space040'
                }}
              />
            </FullWidthBlock>
          ) : (
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlock: 'space040'
              }}
            />
          )}
          <ArticleStack
            verticalArticles={verticalArticles}
            breakpoint={breakpointKey}
            horizontalArticles={horizontalArticles}
            horizontalArticleContentWidth="230px"
          />
        </Block>
      </StackItem>
      {screenXsAndSm ? (
        <BlockItem marginBlockStart="space040">
          <ComposedArticleStack
            articles={modifedArticles}
            breakpoint={breakpointKey}
          />
        </BlockItem>
      ) : (
        <ArticleStackLeadStory
          mdWidth="722px"
          modifedArticles={modifedArticles}
          breakpoint={breakpointKey}
        />
      )}
    </Stack>
  );
};
