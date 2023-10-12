import { GridLayout, Visible, Hidden, Block } from 'newskit';
import React from 'react';
import { Article, ArticleProps } from '../../components/slices/article';
import { StackItem, StyledDivider } from '../shared-styles';
import { CustomStackLayout } from '../shared';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';

export interface ContentBucket2Props {
  articles: ArticleProps[];
  clickHandler: ClickHandlerType;
}

export const ContentBucket2 = ({
  articles,
  clickHandler
}: ContentBucket2Props) => (
  <CustomStackLayout>
    <StackItem
      $width={{
        xs: '100%',
        md: '720px',
        lg: '976px',
        xl: '1276px'
      }}
    >
      <GridLayout
        columns={{
          xs: '1fr',
          md: '1fr 1px 1fr 1px 1fr 1px 1fr'
        }}
        columnGap="space040"
        rowGap="space000"
        data-testid="article-container"
      >
        {articles.map((article: ArticleProps, articleIndex, articleArr) => {
          const articleBorder = articleIndex < articleArr.length - 1 && (
            <StyledDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
            />
          );

          return (
            <React.Fragment key={article.id}>
              <Block marginBlockEnd={{ xs: 'space040', md: 'space000' }}>
                <Visible xs sm>
                  <Article
                    article={{
                      ...clearCreditsAndCaption(article),
                      hideImage: articleIndex > 0,
                      isLeadImage: articleIndex === 0,
                      hasTopBorder: articleIndex > 0
                    }}
                    clickHandler={clickHandler}
                  />
                </Visible>
                <Hidden xs sm>
                  <Article
                    article={{
                      ...clearCreditsAndCaption(article),
                      hideImage: false,
                      isLeadImage: false,
                      hasTopBorder: false
                    }}
                    clickHandler={clickHandler}
                  />
                </Hidden>
              </Block>
              {articleBorder}
            </React.Fragment>
          );
        })}
      </GridLayout>
    </StackItem>
  </CustomStackLayout>
);
