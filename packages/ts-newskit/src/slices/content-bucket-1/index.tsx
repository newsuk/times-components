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
import { CommentCardProps } from '../../components/slices/comment-card';
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
  LeadStoryDivider,
  LeadStoryCell,
  CellNoMargin
} from '../shared-styles';
import { CommentStack } from './comment-stack';
import { ArticleStack } from './article-stack';

export interface ContentBucket1Props {
  section: SliceHeaderProps;
  leadArticle: LeadArticleProps;
  comments: CommentCardProps[];
  articles: ArticleProps[];
}

export const ContentBucket1 = ({
  section,
  leadArticle,
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
        <Block marginInlineEnd={{ xs: 'space000', lg: 'space020' }}>
          <Visible lg xl>
            <LeadStoryDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
            />
          </Visible>
          <LeadArticle {...leadArticle} />
        </Block>
        <Block marginInlineEnd={{ xs: 'space000', lg: 'space020' }}>
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
        <ArticleStack articles={articles} breakpoint={breakpointKey} />
      </CellNoMargin>
      <Visible md>
        <CellNoMargin xs={12}>
          <CommentStack comments={comments} />
        </CellNoMargin>
      </Visible>
    </Grid>
  );
};
