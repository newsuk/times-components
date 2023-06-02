import { Block, Divider, Hidden, useBreakpointKey, Visible } from 'newskit';
import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { Article, ArticleProps } from '../../components/slices/article';
import {
  CellNoMargin,
  CellWithCustomPadding,
  LeadArticleCell,
  LeadStoryDivider
} from '../shared-styles';
import { ArticleStackSmall } from '../shared/article-stacks';
import { FullWidthDividerMob } from '../../components/slices/shared-styles';
import { ComposedArticleStack } from '../shared/composed-article-stack';
import { GroupedArticle } from '../../components/slices/shared/grouped-article';
import { StyledDivider } from './styles';
import { CustomGridLayout } from '../shared/grid-layout';

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
  const breakpointKey = useBreakpointKey();

  const modifedArticles =
    breakpointKey === 'xl'
      ? articles.map(article => ({
          ...article,
          imageRight: true
        }))
      : articles;

  const modifiedArticlesWithUnorderedList = {
    ...articlesWithListItems,
    imageTop: true,
    textBlockMarginBlockStart: 'space050',
    typographyPreset:
      breakpointKey === 'xs'
        ? 'editorialHeadline040'
        : breakpointKey === 'sm'
          ? 'editorialHeadline050'
          : 'editorialHeadline060',
    showTagL1: false
  };

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
        <Block
          marginBlockEnd={{
            xs: 'space040',
            md: 'space000'
          }}
        >
          <LeadArticle {...modifiedArticlesWithUnorderedList} />
          {singleArticle && (
            <>
              <FullWidthDividerMob>
                <StyledDivider
                  overrides={{
                    stylePreset: 'dashedDivider',
                    marginBlockStart: !!articlesWithListItems.listData
                      ? 'space020'
                      : 'space040'
                  }}
                />
              </FullWidthDividerMob>
              <Article {...singleArticle} />
            </>
          )}
          {groupedArticles && (
            <>
              <FullWidthDividerMob>
                <Divider
                  overrides={{
                    stylePreset: 'dashedDivider',
                    marginBlockStart: singleArticle
                      ? 'space040'
                      : !!articlesWithListItems.listData
                        ? 'space020'
                        : 'space040',
                    marginBlockEnd: 'space040'
                  }}
                />
              </FullWidthDividerMob>
              <GroupedArticle {...groupedArticles} />
            </>
          )}
        </Block>
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
