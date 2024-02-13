import React from 'react';
import { ClickHandlerType } from '../types';
import { Block, Divider, Hidden, Visible } from 'newskit';
import {
  LeadStoryContainer,
  LeadStoryDivider,
  StackItem
} from '../shared-styles';
import { CommentCardProps } from '../../components/slices/comment-card';
import { CustomBlockLayout } from '../shared';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import {
  FullWidthBlock,
  StyledStackItem
} from '../../components/slices/shared-styles';
import { CommentArticle } from '../../components/slices/comment-article';
import { GroupedBottomArticle } from './bottom-stack-group';
import { TopArticle } from './top-stack';
import { CommentBucket1 } from '../comment-bucket-1';

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
      <Visible lg xl>
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
            <Hidden lg>
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
            </Hidden>
          </LeadStoryContainer>

          {/* Comment Slice */}
          <CommentBucket1
            data={data}
            clickHandler={clickHandler}
            isCommentLead1
          />
          <Visible lg>
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
          </Visible>
        </CustomBlockLayout>
      </Visible>
      <Visible xs sm md>
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
            {/* Comment Slice */}
            <CommentBucket1
              data={data}
              clickHandler={clickHandler}
              isCommentLead1
            />
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
        </CustomBlockLayout>
      </Visible>
    </>
  );
};
