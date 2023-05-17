import { Cell, Divider, Grid, GridLayout, useBreakpointKey } from 'newskit';
import React from 'react';
import {
  SliceHeader,
  SliceHeaderProps
} from '../../components/slices/slice-header';
import { Article, ArticleProps } from '../../components/slices/article';
import { CellNoMargin } from '../shared-styles';

export interface ContentBucket2Props {
  section: SliceHeaderProps;
  articles: ArticleProps[];
}

export const ContentBucket2 = ({ section, articles }: ContentBucket2Props) => {
  const breakpointKey = useBreakpointKey();
  const isMob = breakpointKey === 'xs' || breakpointKey === 'sm';

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
          rowGap="space040"
          data-testid="article-container"
        >
          {articles.map((article: ArticleProps, articleIndex, articleArr) => {
            const articleBorder = articleIndex < articleArr.length - 1 &&
              !isMob && (
                <Divider overrides={{ stylePreset: 'lightDivider' }} vertical />
              );

            const isAfterFirstArticle = isMob && articleIndex > 0;

            return (
              <React.Fragment key={article.title}>
                <Article
                  {...article}
                  hideImage={isAfterFirstArticle}
                  isLeadImage={isMob && articleIndex === 0}
                  hasTopBorder={isMob && articleIndex > 0}
                />
                {articleBorder}
              </React.Fragment>
            );
          })}
        </GridLayout>
      </CellNoMargin>
    </Grid>
  );
};
