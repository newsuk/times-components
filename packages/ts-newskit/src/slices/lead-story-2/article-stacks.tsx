// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React from 'react';
import {
  Block,
  Divider,
  GridLayout,
  Stack,
  Visible,
  Hidden,
  MQ
} from 'newskit';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { RelativeBlockItem } from '../shared-styles';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';

interface ArticleStackProps {
  verticalArticles: LeadArticleProps[];
  horizontalArticles: LeadArticleProps[];
  horizontalArticleContentWidth?: MQ<string> | string;
  clickHandler: ClickHandlerType;
}

export const ArticleStack = ({
  verticalArticles,
  horizontalArticles,
  horizontalArticleContentWidth,
  clickHandler
}: ArticleStackProps) => {
  const modifiedHorizontalArticles = horizontalArticles.map(item => ({
    ...clearCreditsAndCaption(item),
    imageTop: true,
    headlineTypographyPreset: {
      xs: 'editorialHeadline030',
      md: 'editorialHeadline020'
    },
    hasTopBorder: false
  }));

  const modifiedVerticalArticles = verticalArticles.map(item => ({
    ...item,
    headlineTypographyPreset: {
      xs: 'editorialHeadline030',
      md: 'editorialHeadline020'
    },
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
          const articleBorder = articleIndex < articleArr.length - 1 && (
            <Hidden xs sm>
              <Divider
                overrides={{
                  stylePreset: 'lightDivider'
                }}
                vertical
              />
            </Hidden>
          );

          return (
            <React.Fragment key={article.headline}>
              {articleBorder}
              <Block>
                <FullWidthBlock
                  paddingInline={{
                    xs: 'space045',
                    md: 'space000'
                  }}
                >
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
      columns={horizontalArticleContentWidth || '1fr'}
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
                <FullWidthBlock
                  paddingInline={{
                    xs: 'space045',
                    md: 'space000'
                  }}
                >
                  {articleBorder}
                </FullWidthBlock>
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
      flow={{ xs: 'vertical-left', md: 'horizontal-top' }}
      spaceInline={{ xs: 'space000', md: 'space040' }}
    >
      {articleGridVertical}
      {articleStackHorizontal}
    </Stack>
  );
};
