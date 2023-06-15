import { Divider, GridLayout, useBreakpointKey } from 'newskit';
import React from 'react';
import { Article, ArticleProps } from '../../components/slices/article';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { CustomStackLayout } from '../shared';
import { StackItem } from '../shared-styles';

export interface StackModule1Props {
  articles: ArticleProps[];
}

type ArticleStackProps = {
  articles: ArticleProps[];
  marginBlockStart?: string;
  isDesktop?: boolean;
  isMob?: boolean;
};

const fullWidthDivider = (marginBlockStart?: string) => (
  <Divider
    overrides={{
      stylePreset: 'dashedDivider',
      marginBlockStart: marginBlockStart || 'space000'
    }}
  />
);

const articleStack = ({
  articles,
  marginBlockStart,
  isDesktop,
  isMob
}: ArticleStackProps) => (
  <CustomStackLayout>
    <StackItem>
      <FullWidthBlock marginBlockEnd="space040">
        {fullWidthDivider(marginBlockStart)}
      </FullWidthBlock>
    </StackItem>
    <StackItem>
      <GridLayout
        columns={{
          xs: '1fr',
          md: '1fr 1px 1fr 1px 1fr 1px 1fr'
        }}
        columnGap="space040"
        rowGap="space040"
        data-testid="article-container"
      >
        {articles.map((article: ArticleProps, articleIndex, articleArr) => {
          const articleBorder = articleIndex < articleArr.length - 1 &&
            !isMob &&
            articleIndex !== 3 && (
              <Divider overrides={{ stylePreset: 'lightDivider' }} vertical />
            );

          const hasImage = isMob && articleIndex > 0;
          const articleTitleMarginTop =
            hasImage || (hasImage || isDesktop) ? 'space040' : 'space050';
          return (
            <React.Fragment key={article.title}>
              <Article
                {...article}
                hideImage={hasImage || (hasImage || isDesktop)}
                isLeadImage={isMob && articleIndex === 0}
                hasTopBorder={hasImage}
                isFullWidth={true}
                articleTitleMarginTop={articleTitleMarginTop}
                titleTypographyPreset={
                  isMob ? 'editorialHeadline030' : 'editorialHeadline020'
                }
              />
              {articleBorder}
            </React.Fragment>
          );
        })}
      </GridLayout>
    </StackItem>
  </CustomStackLayout>
);

export const StackModule1 = ({ articles }: StackModule1Props) => {
  const breakpointKey = useBreakpointKey();
  const isMob = breakpointKey === 'xs' || breakpointKey === 'sm';
  const articlesTop = articles.slice(0, 4);
  const articlesBottom = articles.slice(4);

  return (
    <>
      {articleStack({ articles: articlesTop, isMob })}
      {articleStack({
        articles: articlesBottom,
        marginBlockStart: 'space040',
        isDesktop: !isMob,
        isMob
      })}
      {fullWidthDivider('space040')}
    </>
  );
};
