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
import { Article, ArticleProps } from '../../components/slices/article';
import {
  FullWidthBlock,
  StyledStackItem
} from '../../components/slices/shared-styles';
import { CommentArticle } from '../../components/slices/comment-article';
import { GroupedBottomArticle } from './bottom-stack-group';
import { TopArticle } from './top-stack';
import { CommentStackArray } from '../../components/slices/comment-stack-array';

export interface CommentLeadProps {
  clickHandler: ClickHandlerType;
  data: CommentCardProps[];
  leadArticle: LeadArticleProps;
  singleArticle: ArticleProps;
  groupedArticles: {
    articles: LeadArticleProps[];
  };
}

export const CommentLead1 = ({
  data,
  singleArticle,
  clickHandler,
  leadArticle,
  groupedArticles
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

  const modifiedCommentArticle = {
    ...data[0],
    flag: undefined,
    tag: undefined
  };
  const modifiedGroupArticles = groupedArticles.articles.map(article => ({
    ...article
  }));

  const modifiedSingleArticle = {
    ...singleArticle,
    hideImage: true,
    isSummaryEnabled: true,
    titleTypographyPreset: {
      xs: 'editorialHeadline030',
      md: 'editorialHeadline020'
    }
  };

  console.log(modifiedSingleArticle);

  return (
    //Lead Article
    <>
      <CustomBlockLayout>
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
          <StyledStackItem isCommentLead1>
            <TopArticle
              article={modifiedSingleArticle}
              clickHandler={clickHandler}
            />
            <FullWidthBlock
              marginBlock="space040"
              paddingInline={{
                xs: 'space045',
                md: 'space000'
              }}
            >
              <Divider
                overrides={{
                  stylePreset: 'dashedDivider'
                }}
              />
            </FullWidthBlock>
            <GroupedBottomArticle
              {...groupedArticles}
              clickHandler={clickHandler}
            />
          </StyledStackItem>
        </LeadStoryContainer>

        {/* Comment Slice */}
        {/* <CommentStackArray data={data} clickHandler={clickHandler} /> */}
        <Divider
          overrides={{
            marginBlockEnd: 'space040',
            stylePreset: { xs: 'lightDashedDivider', md: 'dashedDivider' }
          }}
        />
        <GridLayout
          columns={{
            xs: '1fr',
            md: '1fr 1px 1fr 1px 1fr',
            lg: '1fr 1px 1fr 1px 1fr 1px'
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
