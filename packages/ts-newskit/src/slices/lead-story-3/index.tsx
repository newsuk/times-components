import {
  Block,
  Divider,
  Hidden,
  useBreakpointKey,
  Visible,
  BreakpointKeys
} from 'newskit';
import React, { useState, useEffect } from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import { LeadStoryDivider, StackItem, BlockItem } from '../shared-styles';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { ComposedArticleStack } from '../shared/composed-article-stack';
import { ArticleStack } from './article-stack';
import { ArticleStackLeadStory, CustomStackLayout } from '../shared';
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
  const [currentBreakpoint, setBreakpoint] = useState<BreakpointKeys | null>(
    null
  );
  const breakpointKey = useBreakpointKey();
  useEffect(
    () => {
      setBreakpoint(breakpointKey);
    },
    [breakpointKey]
  );

  if (!currentBreakpoint) {
    return null;
  }

  const modifedArticles = articles.map(article => {
    return {
      ...article,
      imageRight: currentBreakpoint === 'xl',
      hideImage: currentBreakpoint === 'lg'
    };
  });

  const screenXsAndSm =
    currentBreakpoint === 'xs' || currentBreakpoint === 'sm';

  const modifedLeadArticle = {
    ...leadArticle,
    headlineTypographyPreset: 'editorialHeadline040',
    imageTop: true,
    isLeadImage: true,
    hasTopBorder: false,
    loadingAspectRatio: '4:5',
    shortSummary: undefined
  };

  const modifedLeadArticles = leadArticles.map(article => ({
    ...article,
    hasTopBorder: false
  }));

  return (
    <CustomStackLayout>
      <StackItem
        $width={{
          xs: '100%',
          md: '260px'
        }}
      >
        <ArticleStack
          leadArticles={modifedLeadArticles}
          breakpointKey={currentBreakpoint}
          clickHandler={clickHandler}
          screenXsAndSm={screenXsAndSm}
        />
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
          <FullWidthBlock>
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlockEnd: 'space040'
              }}
            />
          </FullWidthBlock>
        </Hidden>
        <Block marginBlockEnd={{ xs: 'space040', md: 'space000' }}>
          <Visible lg xl>
            <LeadStoryDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
              position="right"
            />
          </Visible>
          <LeadArticle
            article={modifedLeadArticle}
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
      {screenXsAndSm ? (
        <BlockItem>
          <ComposedArticleStack
            articles={modifedArticles}
            breakpoint={currentBreakpoint}
            clickHandler={clickHandler}
          />
        </BlockItem>
      ) : (
        <ArticleStackLeadStory
          mdWidth="720px"
          modifedArticles={modifedArticles}
          breakpoint={currentBreakpoint}
          clickHandler={clickHandler}
        />
      )}
    </CustomStackLayout>
  );
};
