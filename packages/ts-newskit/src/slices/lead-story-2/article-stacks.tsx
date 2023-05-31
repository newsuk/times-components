import React from 'react';
import { Block, BreakpointKeys, Divider, GridLayout, Visible } from 'newskit';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { FullWidthDividerMob } from '../../components/slices/shared-styles';

export const ArticleStack = ({
  verticalArticles,
  breakpoint,
  horizontalArticles
}: {
  verticalArticles: LeadArticleProps[];
  breakpoint: BreakpointKeys;
  horizontalArticles: LeadArticleProps[];
}) => {
  const modifiedVerticalArticles = verticalArticles.map(item => ({
    ...item,
    imageTop: true,
    typographyPreset: 'editorialHeadline020'
  }));

  const modifiredHorizontalArticles = horizontalArticles.map(item => ({
    ...item,
    imageTop: true,
    typographyPreset: 'editorialHeadline020'
  }));
  const articleGridVertical = (
    <GridLayout columns={{ md: '1fr 1px 1fr' }} columnGap={{ md: 'space030' }}>
      {modifiedVerticalArticles.map(
        (article: LeadArticleProps, articleIndex, articleArr) => {
          const articleBorder = breakpoint !== 'xs' &&
            breakpoint !== 'sm' &&
            articleIndex < articleArr.length - 1 && (
              <Divider
                overrides={{
                  stylePreset: 'lightDivider'
                }}
                vertical
              />
            );

          return (
            <React.Fragment key={article.headline}>
              <Block>
                <FullWidthDividerMob>
                  <Visible xs sm>
                    <Divider
                      overrides={{
                        stylePreset: 'dashedDivider',
                        marginBlock: 'space040'
                      }}
                    />
                  </Visible>
                </FullWidthDividerMob>
                <LeadArticle {...article} />
              </Block>
              {articleBorder}
            </React.Fragment>
          );
        }
      )}
    </GridLayout>
  );

  const articleStackHorizontal = (
    <GridLayout>
      {modifiredHorizontalArticles.map(
        (article: LeadArticleProps, articleIndex: number) => {
          const articleBorder = articleIndex !== 0 && (
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlock: 'space040'
              }}
            />
          );
          return (
            <React.Fragment key={article.headline}>
              <Block>
                <FullWidthDividerMob>{articleBorder}</FullWidthDividerMob>
                <LeadArticle {...article} />
              </Block>
            </React.Fragment>
          );
        }
      )}
    </GridLayout>
  );

  return (
    <GridLayout
      columns={{ md: '1fr 1px 2fr ', xs: '1fr' }}
      columnGap={{ md: 'space030' }}
    >
      {articleStackHorizontal}
      <Divider
        overrides={{
          stylePreset: 'lightDivider'
        }}
        vertical
      />
      {articleGridVertical}
    </GridLayout>
  );
};
