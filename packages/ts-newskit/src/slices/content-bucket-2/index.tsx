import {
  Cell,
  Divider,
  Grid,
  GridLayout,
  Hidden,
  useBreakpointKey,
  Visible,
} from 'newskit';
import React from 'react';
import { JournalistQuoteProps } from '../../components/slices/journalist-quote';
import { LeadStoryProps } from '../../components/slices/lead-story';
import {
  SliceHeader,
  SliceHeaderProps
} from '../../components/slices/slice-header';
import {
  ArticleListItem,
  ArticleListItemProps
} from '../../components/slices/articleList';
import { CellNoMargin } from './styles';

export interface ContentBucket2Props {
  section: SliceHeaderProps;
  leadStory: LeadStoryProps;
  journalists: JournalistQuoteProps[];
  articles: ArticleListItemProps[];
}

export const ContentBucket2 = ({
  section,
  articles
}: ContentBucket2Props) => {
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
            md: '1fr 1px 1fr 1px 1fr 1px 1fr',
          }}
          columnGap="space040"
        >
          {articles.map((article: ArticleListItemProps, articleIndex, articleArr) => {
            const articleBorder =
              articleIndex < articleArr.length - 1 && (
                <Visible md lg xl>
                  <Divider
                    overrides={{ stylePreset: 'lightDivider' }}
                    vertical
                  />
                </Visible>
              );

            const isAfterFirstArticle = (breakpointKey === 'xs' || breakpointKey === 'sm') && articleIndex > 0

            return (
              <React.Fragment key={article.title}>
                <ArticleListItem
                  {...article}
                  hasTopBorder={isAfterFirstArticle}
                  hideImage={isAfterFirstArticle}
                  isLeadImage={(breakpointKey === 'xs' || breakpointKey === 'sm') && articleIndex === 0}
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
