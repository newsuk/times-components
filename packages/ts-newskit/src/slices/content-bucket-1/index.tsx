import {
  Block,
  Cell,
  Divider,
  Grid,
  GridLayout,
  Hidden,
  Scroll,
  useBreakpointKey,
  Visible
} from 'newskit';
import React from 'react';
import { CommentCardProps } from '../../components/slices/comment-card';
import { LeadStory, LeadStoryProps } from '../../components/slices/lead-story';
import {
  SliceHeader,
  SliceHeaderProps
} from '../../components/slices/slice-header';
import {
  ArticleListItem,
  ArticleListItemProps
} from '../../components/slices/articleList';
import {
  LeadStoryDivider,
  LeadStoryCell,
  CellNoMargin
} from '../shared-styles';
import { CommentStack } from './comment-card';

export interface ContentBucket1Props {
  section: SliceHeaderProps;
  leadStory: LeadStoryProps;
  comments: CommentCardProps[];
  articles: ArticleListItemProps[];
}

export const ContentBucket1 = ({
  section,
  leadStory,
  comments,
  articles
}: ContentBucket1Props) => {
  const breakpointKey = useBreakpointKey();
  return (
    <Grid xsMargin="space045" mdMargin="space050">
      <Cell xs={12}>
        <SliceHeader {...section} />
      </Cell>
      <LeadStoryCell xs={12} lg={9} xl={8}>
        <Block>
          <Visible lg xl>
            <LeadStoryDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
            />
          </Visible>
          <LeadStory {...leadStory} />
        </Block>
        <Block marginInlineEnd={{ xs: 'space000', lg: 'space040' }}>
          <Hidden md>
            <CommentStack comments={comments} />
          </Hidden>
        </Block>
      </LeadStoryCell>
      <CellNoMargin xs={12} lg={3} xl={4}>
        <Hidden lg xl>
          <Divider
            overrides={{
              marginBlock: 'space040',
              stylePreset: 'dashedDivider'
            }}
          />
        </Hidden>
        <Scroll overrides={{ overlays: { stylePreset: 'menuScrollOverlay' } }}>
          <GridLayout
            columns={{
              xs: '170px 1px 170px 1px 170px 1px 170px',
              md: '1fr 1px 1fr 1px 1fr 1px 1fr',
              lg: '1fr',
              xl: '1fr 1px 1fr'
            }}
            columnGap="space040"
            data-testid="article-container"
          >
            {articles.map(
              (article: ArticleListItemProps, articleIndex, articleArr) => {
                const articleBorder =
                  breakpointKey === 'xl' && articleIndex % 2 !== 0
                    ? null
                    : articleIndex < articleArr.length - 1 && (
                        <Divider
                          overrides={{ stylePreset: 'lightDivider' }}
                          vertical
                        />
                      );

                const articleTopBorder =
                  (breakpointKey === 'xl' && articleIndex > 1) ||
                  (breakpointKey === 'lg' && articleIndex > 0);

                return (
                  <React.Fragment key={article.title}>
                    <ArticleListItem
                      {...article}
                      hasTopBorder={articleTopBorder}
                      hideImage={breakpointKey === 'lg'}
                    />
                    {articleBorder}
                  </React.Fragment>
                );
              }
            )}
          </GridLayout>
        </Scroll>
      </CellNoMargin>
      <Visible md>
        <CellNoMargin xs={12}>
          <CommentStack comments={comments} />
        </CellNoMargin>
      </Visible>
    </Grid>
  );
};
