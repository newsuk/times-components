import { Block, Divider, Hidden, useBreakpointKey, Visible } from 'newskit';
import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import {
  CellNoMargin,
  LeadArticleCell,
  LeadStoryDivider,
  CellWithCustomPadding
} from '../shared-styles';
import { ArticleStackSmall } from '../shared/article-stacks';
import { LargeArticles } from './large-article-stack';
import { LargeArticleProps } from '../../components/slices/large-article';
import { FullWidthDividerMob } from '../../components/slices/shared-styles';
import { ComposedArticleStack } from '../shared/composed-article-stack';
import { CustomGridLayout } from '../shared/grid-layout';

export interface LeadStory1Props {
  leadArticle: LeadArticleProps;
  articles: ArticleProps[];
  largeArticles: LargeArticleProps[];
  smallArticles: ArticleProps[];
}

export const LeadStory1 = ({
  leadArticle,
  articles,
  largeArticles,
  smallArticles
}: LeadStory1Props) => {
  const breakpointKey = useBreakpointKey();

  const modifedArticles =
    breakpointKey === 'xl'
      ? articles.map(article => ({
          ...article,
          imageRight: true
        }))
      : articles;

  const screenXsAndSm = breakpointKey === 'xs' || breakpointKey === 'sm';

  const LeadStoryLayout: React.FC = ({ children }) => {
    return (
      <Block marginBlockEnd={{ xs: 'space040', md: 'space000' }}>
        <Visible lg xl>
          <LeadStoryDivider
            overrides={{ stylePreset: 'lightDivider' }}
            vertical
            position="right"
          />
        </Visible>
        {children}
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
    );
  };

  return (
    <CustomGridLayout>
      <CellWithCustomPadding xs={12} md={5} lg={3} xl={3}>
        <LargeArticles largeArticles={largeArticles} />
      </CellWithCustomPadding>
      <LeadArticleCell xs={12} md={7} lg={6} xl={5}>
        <Hidden md lg xl>
          <FullWidthDividerMob>
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlockEnd: 'space040'
              }}
            />
          </FullWidthDividerMob>
        </Hidden>
        <Block>
          <LeadStoryLayout>
            <LeadArticle {...leadArticle} />
          </LeadStoryLayout>
          <Hidden xs sm>
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlock: 'space040'
              }}
            />
          </Hidden>
          <ArticleStackSmall
            articles={smallArticles}
            isFullWidth={screenXsAndSm}
            hideImage={screenXsAndSm}
            hasTopBorder={!!screenXsAndSm}
            breakpoint={breakpointKey}
          />
        </Block>
      </LeadArticleCell>
      {screenXsAndSm ? (
        <CellNoMargin xs={12} lg={3} xl={4}>
          <ComposedArticleStack
            articles={modifedArticles}
            breakpoint={breakpointKey}
          />
        </CellNoMargin>
      ) : (
        <CellWithCustomPadding xs={12} lg={3} xl={4}>
          <ComposedArticleStack
            articles={modifedArticles}
            breakpoint={breakpointKey}
          />
        </CellWithCustomPadding>
      )}
    </CustomGridLayout>
  );
};
