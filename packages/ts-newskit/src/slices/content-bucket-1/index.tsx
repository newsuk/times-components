import { Block, Divider, Hidden, Visible } from 'newskit';
import React from 'react';
import { CommentCardProps } from '../../components/slices/comment-card';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import { LeadStoryDivider, StackItem, BlockItem } from '../shared-styles';

import { CommentStack } from '../shared/comment-stack';
import { ArticleStack } from './article-stack';
import { CustomStackLayout } from '../shared';
import {
  FullWidthBlock,
  FullWidthHidden
} from '../../components/slices/shared-styles';
import { ClickHandlerType } from '../types';
import { defaultArticleOptions } from '../../utils/default-article-options';

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
  clickHandler
}: ContentBucket1Props) => {
  const leadArticleOptions = {
    xs: {
      imageTop: true,
      hasTopBorder: false,
      contentWidth: '283px'
    },
    sm: {
      imageTop: true,
      hasTopBorder: false,
      contentWidth: '283px'
    },
    md: {
      hasTopBorder: true,
      imageTop: false,
      contentWidth: '283px'
    },
    lg: {
      hasTopBorder: true,
      imageTop: false,
      contentWidth: '283px'
    },
    xl: {
      hasTopBorder: true,
      imageTop: false,
      contentWidth: '312px'
    }
  };

  const modifiedLeadArticleOptions = {
    ...defaultArticleOptions,
    ...leadArticleOptions
  };

  return (
    <CustomStackLayout>
      <StackItem
        $width={{
          xs: '100%',
          md: '720px',
          lg: '760px',
          xl: '840px'
        }}
        marginInlineEnd={{
          lg: 'space060'
        }}
      >
        <Block>
          <Visible lg xl>
            <LeadStoryDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
              position="right"
            />
          </Visible>
          {Object.entries(modifiedLeadArticleOptions).map(
            ([breakpoint, opts]) => (
              <Visible {...{ [breakpoint]: true }}>
                <LeadArticle
                  article={{
                    ...leadArticle,
                    ...opts
                  }}
                  clickHandler={clickHandler}
                />
              </Visible>
            )
          )}
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
          xl: '402px'
        }}
      >
        <FullWidthHidden lg xl>
          <FullWidthBlock>
            <Divider
              overrides={{
                marginBlock: 'space040',
                stylePreset: 'dashedDivider'
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
            xl: '1276px'
          }}
        >
          <CommentStack comments={comments} clickHandler={clickHandler} />
        </BlockItem>
      </Visible>
    </CustomStackLayout>
  );
};
