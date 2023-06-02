import { Block, Divider, Hidden, useBreakpointKey, Visible } from 'newskit';
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
  CellNoMargin,
  CellWithCustomPadding
} from '../shared-styles';

import { CommentStack } from './comment-stack';
import { ArticleStack } from './article-stack';
import { CustomGridLayout } from '../shared/grid-layout';

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

  const modifiedLeadArticle = {
    ...leadArticle,
    contentTop: true
  };

  return (
    <CustomGridLayout>
      <CellWithCustomPadding xs={12}>
        <SliceHeader {...section} />
      </CellWithCustomPadding>
      <LeadStoryCell xs={12} lg={9} xl={8}>
        <Block>
          <Visible lg xl>
            <LeadStoryDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
              position="right"
            />
          </Visible>
          <LeadArticle {...modifiedLeadArticle} />
        </Block>
        <Block>
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
    </CustomGridLayout>
  );
};
