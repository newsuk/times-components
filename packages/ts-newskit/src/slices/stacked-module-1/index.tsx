import React from 'react';
import { Divider } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { WrappedStackLayout } from '../shared';
import { BlockItem, StackItem } from '../shared-styles';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';
import { ArticleGrid } from './styles';

export interface StackModule1Props {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
}

type ArticleStackProps = {
  articles: ArticleProps[];
  marginBlockStart?: string;
  hideImageOnDesktop?: boolean;
  clickHandler: ClickHandlerType;
};

const articleStack = ({
  articles,
  marginBlockStart,
  hideImageOnDesktop,
  clickHandler
}: ArticleStackProps) => (
  <WrappedStackLayout marginBlockEnd="space000">
    <StackItem>
      <FullWidthBlock
        paddingInline={{
          xs: 'space045',
          md: 'space000'
        }}
        marginBlockEnd="space040"
      >
        <Divider
          overrides={{
            stylePreset: {
              xs: 'lightDashedDivider',
              md: 'dashedDivider'
            },
            marginBlockStart: marginBlockStart || 'space000'
          }}
        />
      </FullWidthBlock>
    </StackItem>
    <StackItem>
      <ArticleGrid
        hideImageOnDesktop={hideImageOnDesktop}
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
            articleIndex !== 3 && (
              <Divider
                aria-label="stacked-article-divider-vertical"
                overrides={{ stylePreset: 'lightDivider' }}
                vertical
              />
            );

          return (
            <React.Fragment key={article.headline}>
              <Article
                article={{
                  ...clearCreditsAndCaption(article),
                  isLeadImage: articleIndex === 0,
                  hasTopBorder: articleIndex > 0,
                  isFullWidth: true,
                  tagAndFlagMarginBlockStart: 'space030',
                  topBorderStyle: {
                    xs: 'lightDashedDivider',
                    md: 'dashedDivider'
                  },
                  titleTypographyPreset: 'editorialHeadline020'
                }}
                clickHandler={clickHandler}
              />
              {articleBorder}
            </React.Fragment>
          );
        })}
      </ArticleGrid>
    </StackItem>
  </WrappedStackLayout>
);

export const StackModule1 = ({ articles, clickHandler }: StackModule1Props) => {
  const articlesTop = articles.slice(0, 4);
  const articlesBottom = articles.slice(4);

  return (
    <BlockItem
      $width={{
        xs: '100%',
        md: '720px',
        lg: '976px',
        xl: '1276px'
      }}
      marginBlockEnd="space060"
    >
      {articleStack({ articles: articlesTop, clickHandler })}
      {articleStack({
        articles: articlesBottom,
        marginBlockStart: 'space040',
        hideImageOnDesktop: true,
        clickHandler
      })}
    </BlockItem>
  );
};
