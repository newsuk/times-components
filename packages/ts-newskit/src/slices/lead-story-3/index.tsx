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
import { FullWidthDividerMob } from '../../components/slices/shared-styles';
import { ComposedArticleStack } from '../shared/composed-article-stack';
import { ArticleStack } from './article-stack';
import { CustomGridLayout } from '../shared/grid-layout';

export interface LeadStory3Props {
  leadArticle: LeadArticleProps;
  articles: ArticleProps[];
  leadArticles: LeadArticleProps[];
}

export const LeadStory3 = ({
  leadArticle,
  articles,
  leadArticles
}: LeadStory3Props) => {
  const breakpointKey = useBreakpointKey();

  const modifedArticles =
    breakpointKey === 'xl'
      ? articles.map(article => ({
          ...article,
          imageRight: true
        }))
      : articles;

  const screenXsAndSm = breakpointKey === 'xs' || breakpointKey === 'sm';

  const modifedLeadArticles = {
    ...leadArticle,
    typographyPreset: 'editorialHeadline040',
    imageTop: true,
    loadingAspectRatio: '4:5'
  };

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
        <ArticleStack
          leadArticles={leadArticles}
          breakpointKey={breakpointKey}
        />
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
            <LeadArticle {...modifedLeadArticles} />
          </LeadStoryLayout>
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
