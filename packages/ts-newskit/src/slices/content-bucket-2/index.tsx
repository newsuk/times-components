import { Cell, Divider, Grid, GridLayout, useBreakpointKey } from 'newskit';
import React from 'react';
import {
  SliceHeader,
  SliceHeaderProps
} from '../../components/slices/slice-header';
import {
  ArticleListItem,
  ArticleListItemProps
} from '../../components/slices/articleList';
import { CellNoMargin } from '../shared-styles';

export interface ContentBucket2Props {
  section: SliceHeaderProps;
  articles: ArticleListItemProps[];
}

export const ContentBucket2 = ({ section, articles }: ContentBucket2Props) => {
  const breakpointKey = useBreakpointKey();
  return (
    <Grid xsMargin="space045" mdMargin="space050">
      <Cell xs={12}>
        <SliceHeader {...section} />
      </Cell>
      <CellNoMargin xs={12}>
        <GridLayout
          columns={{
            xs: '1fr',
            md: '1fr 1px 1fr 1px 1fr 1px 1fr'
          }}
          columnGap="space040"
        >
          {articles.map(
            (article: ArticleListItemProps, articleIndex, articleArr) => {
              const articleBorder = breakpointKey !== 'xs' &&
                breakpointKey !== 'sm' &&
                articleIndex < articleArr.length - 1 && (
                  <Divider
                    overrides={{ stylePreset: 'lightDivider' }}
                    vertical
                  />
                );

              const isAfterFirstArticle =
                (breakpointKey === 'xs' || breakpointKey === 'sm') &&
                articleIndex > 0;

              return (
                <React.Fragment key={article.title}>
                  <ArticleListItem
                    {...article}
                    hasTopBorder={isAfterFirstArticle}
                    hideImage={isAfterFirstArticle}
                    isLeadImage={
                      (breakpointKey === 'xs' || breakpointKey === 'sm') &&
                      articleIndex === 0
                    }
                  />
                  {articleBorder}
                </React.Fragment>
              );
            }
          )}
        </GridLayout>
      </CellNoMargin>
    </Grid>
  );
};
