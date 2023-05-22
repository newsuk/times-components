import {
  Block,
  Cell,
  Divider,
  Grid,
  Hidden,
  useBreakpointKey,
  Visible
} from 'newskit';
import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import {
  SliceHeader,
  SliceHeaderProps
} from '../../components/slices/slice-header';
import { ArticleProps } from '../../components/slices/article';
import {
  LeadSArticleCell,
  CellNoMargin,
  LeadStoryDivider
} from '../shared-styles';
import { ArticleStackLarge, ArticleStackSmall } from './article-stack';
import { LargeArticles } from './large-article-stack';
import { LargeArticleProps } from '../../components/slices/large-article';
import { FullWidthDividerMob } from '../../components/slices/shared-styles';
export interface LeadStory1Props {
  section: SliceHeaderProps;
  leadArticle: LeadArticleProps;
  articles: ArticleProps[];
  largeArticles: LargeArticleProps[];
  smallArticles: ArticleProps[];
}

export const LeadStory1 = ({
  section,
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

  const firstThreeArticles = articles.slice(0, 3);
  const secondTwoArticles = articles.slice(3);
  const screenXsAndSm = !!(breakpointKey === 'xs' || breakpointKey === 'sm');
  const screenMd = !!(breakpointKey === 'md');

  const LeadStoryLayout: React.FC = ({ children }) => {
    return (
      <Block>
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
    <Grid xsMargin="space045" mdMargin="space050">
      <Cell xs={12}>
        <SliceHeader {...section} />
      </Cell>
      <CellNoMargin xs={12} md={5} lg={3} xl={3}>
        <LargeArticles largeArticles={largeArticles} />
      </CellNoMargin>
      <LeadSArticleCell xs={12} md={7} lg={6} xl={5}>
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
        <Block marginInline={{ xs: 'space000', md: 'space020' }}>
          <LeadStoryLayout>
            <LeadArticle {...leadArticle} />
          </LeadStoryLayout>
          <Hidden xs sm>
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlockEnd: 'space040'
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
      </LeadSArticleCell>
      <CellNoMargin xs={12} lg={3} xl={4}>
        <Hidden lg xl>
          <FullWidthDividerMob>
            <Divider
              overrides={{
                marginBlockEnd: 'space040',
                stylePreset: 'dashedDivider'
              }}
            />
          </FullWidthDividerMob>
        </Hidden>
        <ArticleStackLarge
          firstThreeArticles={firstThreeArticles}
          articles={modifedArticles}
          breakpoint={breakpointKey}
        />
        <Visible md>
          <Hidden xs sm>
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlockStart: 'space040'
              }}
            />
          </Hidden>
          <Block marginBlockEnd={{ md: 'space040' }}>
            <ArticleStackSmall
              articles={secondTwoArticles}
              isFullWidth={screenXsAndSm}
              hideImage={screenMd}
              hasTopBorder={false}
              breakpoint={breakpointKey}
            />
          </Block>
        </Visible>
      </CellNoMargin>
    </Grid>
  );
};
