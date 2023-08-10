import React from 'react';
import {
  Block,
  Divider,
  GridLayout,
  Stack,
  Visible,
  BreakpointKeys
} from 'newskit';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { RelativeBlockItem } from '../shared-styles';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';

export const ArticleStack = ({
  verticalArticles,
  breakpoint,
  horizontalArticles,
  horizontalArticleContentWidth,
  clickHandler
}: {
  verticalArticles: LeadArticleProps[];
  breakpoint: BreakpointKeys;
  horizontalArticles: LeadArticleProps[];
  horizontalArticleContentWidth?: string;
  clickHandler: ClickHandlerType;
}) => {
  const modifiedHorizontalArticles = horizontalArticles.map(item => ({
    ...clearCreditsAndCaption(item),
    imageTop: true,
    headlineTypographyPreset: 'editorialHeadline020',
    hasTopBorder: false
  }));

  const modifiedVerticalArticles = verticalArticles.map(item => ({
    ...item,
    headlineTypographyPreset: 'editorialHeadline020',
    hasTopBorder: false,
    hideImage: true
  }));
  const articleStackHorizontal = (
    <GridLayout
      columns={{ md: '1px 1fr 1px 1fr' }}
      columnGap={{ md: 'space040' }}
      overrides={{ marginBlockStart: 'space000' }}
    >
      {modifiedHorizontalArticles.map(
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
                <LeadArticle article={article} clickHandler={clickHandler} />
              </Block>
              {articleBorder}
            </React.Fragment>
          );
        }
      )}
    </GridLayout>
  );

  const articleGridVertical = (
    <GridLayout
      columns={{ md: `${horizontalArticleContentWidth || '1fr'}` }}
      columnGap={{ md: 'space060' }}
      style={{ marginBlock: 'space000' }}
    >
      {modifiedVerticalArticles.map(
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
                <LeadArticle article={article} clickHandler={clickHandler} />
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
      {articleGridVertical}
      {articleStackHorizontal}
    </Stack>
  );
};
