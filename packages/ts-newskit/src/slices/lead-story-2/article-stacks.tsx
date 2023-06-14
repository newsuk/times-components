import React from 'react';
import {
  Block,
  BreakpointKeys,
  Divider,
  GridLayout,
  Stack,
  Visible
} from 'newskit';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { RelativeBlockItem } from '../shared-styles';

export const ArticleStack = ({
  verticalArticles,
  breakpoint,
  horizontalArticles,
  horizontalArticleContentWidth
}: {
  verticalArticles: LeadArticleProps[];
  breakpoint: BreakpointKeys;
  horizontalArticles: LeadArticleProps[];
  horizontalArticleContentWidth?: string;
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
    <GridLayout
      columns={{ md: '1px 1fr 1px 1fr' }}
      columnGap={{ md: 'space040' }}
      overrides={{ marginBlockStart: 'space000' }}
    >
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
              {articleBorder}
              <Block>
                <FullWidthBlock>
                  <Visible xs sm>
                    <Divider
                      overrides={{
                        stylePreset: 'dashedDivider',
                        marginBlock: 'space040'
                      }}
                    />
                  </Visible>
                </FullWidthBlock>
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
    <GridLayout
      columns={{ md: `${horizontalArticleContentWidth || '1fr'}` }}
      columnGap={{ md: 'space060' }}
      style={{ marginBlock: 'space000' }}
    >
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
            <RelativeBlockItem key={article.headline}>
              <Block>
                <FullWidthBlock>{articleBorder}</FullWidthBlock>
                <LeadArticle {...article} />
              </Block>
            </RelativeBlockItem>
          );
        }
      )}
    </GridLayout>
  );

  return (
    <Stack
      stackDistribution="flex-start"
      flow={
        breakpoint !== 'xs' && breakpoint !== 'sm'
          ? 'horizontal-top'
          : 'vertical-left'
      }
      spaceInline={
        breakpoint === 'xs' || breakpoint === 'sm' ? 'space000' : 'space040'
      }
    >
      {articleStackHorizontal}
      {articleGridVertical}
    </Stack>
  );
};
