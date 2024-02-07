import React from 'react';
import { ClickHandlerType } from '../types';
import { Block, Divider, GridLayout, Hidden, Visible } from 'newskit';
import {
  AvatarDivider,
  LeadStoryContainer,
  LeadStoryDivider,
  StackItem
} from '../shared-styles';
import {
  CommentCard,
  CommentCardProps
} from '../../components/slices/comment-card';
import { CustomBlockLayout } from '../shared';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { CommentArticle } from '../../components/slices/comment-article';
import { ArticleBucket } from './article-bucket';

export interface CommentLeadProps {
  clickHandler: ClickHandlerType;
  data: CommentCardProps[];
  leadArticle: LeadArticleProps;
  articles: ArticleProps;
  leadArticles: LeadArticleProps[];
}

export const CommentLead1 = ({
  data,
  articles,
  clickHandler,
  leadArticle
}: CommentLeadProps) => {
  const modifiedLeadArticle = {
    ...leadArticle,
    headlineTypographyPreset: undefined,
    imageTop: true,
    isLeadImage: true,
    hasTopBorder: false,
    loadingAspectRatio: '1:1',
    shortSummary: undefined,
    flag: undefined,
    tag: undefined,
    contentType: undefined,
    expirableFlags: undefined,
    caption: undefined
  };
  const modifiedArticleBucket = {
    ...articles
  };
  const modifiedCommentArticle = {
    ...data[0],
    flag: undefined,
    tag: undefined
  };

  return (
    //Lead Article
    <>
      <LeadStoryContainer className="comment-lead-1-container">
        {/* LEFT SIDE Comment */}
        <StackItem
          $width={{
            xs: '100%',
            md: '260px'
          }}
        >
          <CommentArticle
            key={modifiedCommentArticle.headline}
            article={modifiedCommentArticle}
            clickHandler={clickHandler}
            isCommentLead1
          />
        </StackItem>
        <StackItem
          $width={{
            xs: '100%',
            md: '428px',
            lg: '465px',
            xl: '550px'
          }}
          marginInlineStart={{
            md: 'space060'
          }}
          marginInlineEnd={{
            lg: 'space060'
          }}
        >
          <Hidden md lg xl>
            <FullWidthBlock
              paddingInline={{
                xs: 'space045',
                md: 'space000'
              }}
            >
              <Divider
                overrides={{
                  stylePreset: 'dashedDivider',
                  marginBlockEnd: 'space040'
                }}
              />
            </FullWidthBlock>
          </Hidden>
          <Block marginBlockEnd={{ xs: 'space040', md: 'space000' }}>
            <LeadStoryDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
              position="right"
            />
            <LeadArticle
              article={modifiedLeadArticle}
              clickHandler={clickHandler}
            />
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
        </StackItem>
        {/* RIGHT SIDE article */}
        <ArticleBucket
          articles={modifiedArticleBucket}
          clickHandler={clickHandler}
        />
      </LeadStoryContainer>

      {/* Comment Slice */}
      <CustomBlockLayout>
        <Divider
          overrides={{
            marginBlockEnd: 'space040',
            stylePreset: { xs: 'lightDashedDivider', md: 'dashedDivider' }
          }}
        />
        <GridLayout
          columns={{
            xs: '1fr',
            md: '1fr 1px 1fr 1px 1fr'
          }}
          columnGap="space040"
        >
          {data.map((comment, commentIndex, commentArr) => {
            const hasBorder = commentIndex < commentArr.length - 1 && (
              <AvatarDivider
                overrides={{
                  marginBlock: { xs: 'space040', md: 'space000' },
                  stylePreset: {
                    xs: 'lightDashedDivider',
                    md: 'commentCardlightDivider'
                  }
                }}
              />
            );

            return (
              <React.Fragment key={comment.headline}>
                <CommentCard
                  article={comment}
                  clickHandler={clickHandler}
                  isCommentLead1
                />
                {hasBorder}
              </React.Fragment>
            );
          })}
        </GridLayout>
      </CustomBlockLayout>
    </>
  );
};
