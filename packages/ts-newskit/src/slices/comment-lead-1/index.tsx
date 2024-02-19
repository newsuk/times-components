import React from 'react';
import { ClickHandlerType } from '../types';
import {
  Block,
  Divider,
  GridLayout,
  GridLayoutItem,
  Hidden,
  TextBlock,
  Visible,
  styled
} from 'newskit';
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

const StyledGridLayoutItem = styled(GridLayoutItem)`
  span {
    text-align: center;
  }
`;

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

  return (
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
                <TextBlock
                  typographyPreset="utilityLabel005"
                  marginBlockEnd="space040"
                  style={{
                    marginInline: 'auto'
                  }}
                >
                  Times View
                </TextBlock>
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
              <TextBlock
                typographyPreset="utilityLabel005"
                marginBlockEnd="space040"
                style={{
                  marginInline: 'auto'
                }}
              >
                Times View
              </TextBlock>
              <GridLayout
                areas={`article2 divider1 article1 divider2 article3`}
              >
                <StyledGridLayoutItem area="article1">
                  <TopArticle
                    article={{
                      ...modifiedSingleArticle,
                      titleTypographyPreset: 'editorialRegularHeadline020'
                    }}
                    clickHandler={clickHandler}
                  />
                </StyledGridLayoutItem>
                <GridLayoutItem area="divider1">
                  <Divider
                    vertical={{ xs: false, md: true }}
                    overrides={{
                      marginBlock: { xs: 'space040', md: 'auto' },
                      marginInline: 'space040',
                      stylePreset: 'lightDivider'
                    }}
                  />
                </GridLayoutItem>
                <StyledGridLayoutItem area="article2">
                  <LeadArticle
                    article={{
                      ...groupedArticles.articles[0],
                      hideImage: true,
                      hasTopBorder: false,
                      headlineTypographyPreset: 'editorialRegularHeadline020',
                      centerContent: true
                    }}
                    clickHandler={clickHandler}
                  />
                </StyledGridLayoutItem>
                <GridLayoutItem area="divider2">
                  <Divider
                    vertical={{ xs: false, md: true }}
                    overrides={{
                      marginBlock: { xs: 'space040', md: 'auto' },
                      marginInline: 'space040',
                      stylePreset: 'lightDivider'
                    }}
                  />
                </GridLayoutItem>
                <StyledGridLayoutItem area="article3">
                  <LeadArticle
                    article={{
                      ...groupedArticles.articles[1],
                      hideImage: true,
                      hasTopBorder: false,
                      headlineTypographyPreset: 'editorialRegularHeadline020',
                      centerContent: true
                    }}
                    clickHandler={clickHandler}
                  />
                </StyledGridLayoutItem>
              </GridLayout>
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
            <TextBlock
              typographyPreset="utilityLabel005"
              marginBlockEnd="space040"
              style={{
                marginInline: 'auto'
              }}
            >
              Times View
            </TextBlock>
            <GridLayout
              areas={{
                xs: `
                  article1 
                  divider1 
                  article2 
                  divider2 
                  article3 
              `,
                md: `article2 divider1 article1 divider2 article3`
              }}
            >
              <StyledGridLayoutItem area="article1">
                <TopArticle
                  article={{
                    ...modifiedSingleArticle,
                    titleTypographyPreset: 'editorialRegularHeadline020'
                  }}
                  clickHandler={clickHandler}
                />
              </StyledGridLayoutItem>
              <GridLayoutItem area="divider1">
                <Divider
                  vertical={{ xs: false, md: true }}
                  overrides={{
                    marginBlock: { xs: 'space040', md: 'auto' },
                    marginInline: 'space040',
                    stylePreset: 'lightDivider'
                  }}
                />
              </GridLayoutItem>
              <StyledGridLayoutItem area="article2">
                <LeadArticle
                  article={{
                    ...groupedArticles.articles[0],
                    hideImage: true,
                    hasTopBorder: false,
                    headlineTypographyPreset: 'editorialRegularHeadline020',
                    centerContent: true
                  }}
                  clickHandler={clickHandler}
                />
              </StyledGridLayoutItem>
              <GridLayoutItem area="divider2">
                <Divider
                  vertical={{ xs: false, md: true }}
                  overrides={{
                    marginBlock: { xs: 'space040', md: 'auto' },
                    marginInline: 'space040',
                    stylePreset: 'lightDivider'
                  }}
                />
              </GridLayoutItem>
              <StyledGridLayoutItem area="article3">
                <LeadArticle
                  article={{
                    ...groupedArticles.articles[1],
                    hideImage: true,
                    hasTopBorder: false,
                    headlineTypographyPreset: 'editorialRegularHeadline020',
                    centerContent: true
                  }}
                  clickHandler={clickHandler}
                />
              </StyledGridLayoutItem>
            </GridLayout>
          </LeadStoryContainer>
        </CustomBlockLayout>
      </Visible>
    </>
  );
};
