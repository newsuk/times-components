import {
  Block,
  Divider,
  useBreakpointKey,
  Visible,
  BreakpointKeys
} from 'newskit';
import React, { useState, useEffect } from 'react';
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
import { StyledDivider } from './styles';

export interface LeadStory1Props {
  leadArticle: LeadArticleProps;
  articles: ArticleProps[];
  groupedArticles: {
    articles: LeadArticleProps[];
    tagL1: {
      label: string;
      href: string;
    };
  };
  smallArticles: ArticleProps[];
  singleArticle: ArticleProps;
  articlesWithListItems: LeadArticleProps;
}

export const LeadStory1 = ({
  leadArticle,
  articles,
  groupedArticles,
  smallArticles,
  singleArticle,
  articlesWithListItems
}: LeadStory1Props) => {
  const [currentBreakpoint, setBreakpoint] = useState<BreakpointKeys>('xs');
  const breakpointKey = useBreakpointKey();
  useEffect(
    () => {
      setBreakpoint(breakpointKey);
    },
    [breakpointKey]
  );
  const screenXsAndSm =
    currentBreakpoint === 'xs' || currentBreakpoint === 'sm';
  const modifiedArticles =
    currentBreakpoint === 'xl'
      ? articles.map(article => ({
          ...article,
          imageRight: true
        }))
      : articles;

  const modifiedArticlesWithUnorderedList = {
    ...articlesWithListItems,
    hasTopBorder: false,
    textBlockMarginBlockStart: 'space050',
    headlineTypographyPreset:
      currentBreakpoint === 'xs'
        ? 'editorialHeadline040'
        : currentBreakpoint === 'sm'
          ? 'editorialHeadline050'
          : 'editorialHeadline060',
    showTagL1: false
  };

  const modifiedLeadArticle = {
    ...leadArticle,
    hasTopBorder: false,
    imageTop: true,
    headlineTypographyPreset: screenXsAndSm
      ? 'editorialHeadline040'
      : 'editorialHeadline030'
  };

  const modifiedSingleArticle = {
    ...singleArticle,
    hideImage: true
  };

  const marginTop = modifiedSingleArticle
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
        <LeadArticle {...modifiedArticlesWithUnorderedList} />
        {modifiedSingleArticle && (
          <BlockItem>
            <FullWidthBlock>
              <StyledDivider
                overrides={{
                  stylePreset: 'dashedDivider',
                  marginBlockStart: !!articlesWithListItems.listData
                    ? 'space020'
                    : 'space040',
                  marginBlockEnd: 'space040'
                }}
              />
            </FullWidthBlock>
            <Article {...modifiedSingleArticle} />
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
            <GroupedArticle {...groupedArticles} />
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
            <LeadArticle {...modifiedLeadArticle} />
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
            isFullWidth={screenXsAndSm}
            hideImage={screenXsAndSm}
            hasTopBorder={!!screenXsAndSm}
            breakpoint={currentBreakpoint}
          />
        </Block>
      </StackItem>
      {screenXsAndSm ? (
        <BlockItem>
          <ComposedArticleStack
            articles={modifiedArticles}
            breakpoint={currentBreakpoint}
          />
        </BlockItem>
      ) : (
        <ArticleStackLeadStory
          mdWidth="722px"
          modifedArticles={modifiedArticles}
          breakpoint={currentBreakpoint}
        />
      )}
    </CustomStackLayout>
  );
};
