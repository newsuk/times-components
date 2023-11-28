import { Block, Divider, Hidden, Visible } from 'newskit';
import React from 'react';
import { CommentCardProps } from '../../components/slices/comment-card';
import {
  LeadArticle,
  LeadArticleProps,
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import { LeadStoryDivider, StackItem, BlockItem } from '../shared-styles';

import { CommentStack } from '../shared/comment-stack';
import { CustomStackLayout } from '../shared';
import {
  FullWidthBlock,
  FullWidthHidden,
} from '../../components/slices/shared-styles';
import { ClickHandlerType } from '../types';
import { ArticleStack } from '../shared/article-stack-cb';

export interface ContentBucket1Props {
  leadArticle: LeadArticleProps;
  comments: CommentCardProps[];
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
}

export const ContentBucket1 = ({
  leadArticle,
  comments,
  articles,
  clickHandler,
}: ContentBucket1Props) => (
  <CustomStackLayout>
    <StackItem
      $width={{
        xs: '100%',
        md: '720px',
        lg: '760px',
        xl: '840px',
      }}
      marginInlineEnd={{
        lg: 'space060',
      }}
    >
      <Block>
        <Visible xs sm>
          <LeadArticle
            article={{
              ...leadArticle,
              hasTopBorder: false,
              imageTop: true,
              textBlockMarginBlockStart: 'space050',
              tagAndFlagMarginBlockStart: 'space050',
            }}
            clickHandler={clickHandler}
          />
        </Visible>
        <Visible md lg xl>
          <LeadStoryDivider
            overrides={{ stylePreset: 'lightDivider' }}
            vertical
            position="right"
          />
          <LeadArticle
            article={{
              ...leadArticle,
              hasTopBorder: true,
              imageTop: false,
              contentWidth: {
                md: '283px auto',
                xl: '312px auto',
              },
            }}
            clickHandler={clickHandler}
          />
        </Visible>
      </Block>
      <Block>
        <Hidden md>
          <CommentStack comments={comments} clickHandler={clickHandler} />
        </Hidden>
      </Block>
    </StackItem>
    <StackItem
      $width={{
        xs: '100%',
        md: '720px',
        lg: '185px',
        xl: '402px',
      }}
    >
      <FullWidthHidden lg xl>
        <FullWidthBlock
          paddingInlineStart={{
            xs: 'space045',
            md: 'space000',
          }}
        >
          <Divider
            overrides={{
              marginBlock: 'space040',
              stylePreset: { xs: 'lightDashedDivider', md: 'dashedDivider' },
            }}
          />
        </FullWidthBlock>
      </FullWidthHidden>
      <BlockItem>
        <ArticleStack articles={articles} clickHandler={clickHandler} />
      </BlockItem>
    </StackItem>
    <Visible md>
      <BlockItem
        $width={{
          xs: '100%',
          md: '720px',
          lg: '976px',
          xl: '1276px',
        }}
      >
        <CommentStack comments={comments} clickHandler={clickHandler} />
      </BlockItem>
    </Visible>
  </CustomStackLayout>
);
