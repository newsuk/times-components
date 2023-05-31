import { Block, Cell, Divider, Grid, useBreakpointKey, Visible } from 'newskit';
import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import { LeadStoryDivider, StyledLeadStoryCell } from '../shared-styles';
import { ArticleStack } from './article-stacks';
import { FullWidthDividerMob } from '../../components/slices/shared-styles';
import { ComposedArticleStack } from '../shared/composed-article-stack';

export interface LeadStory2Props {
  leadArticle: LeadArticleProps;
  articles: ArticleProps[];
  verticalArticles: LeadArticleProps[];
  horizontalArticles: LeadArticleProps[];
}

export const LeadStory2 = ({
  leadArticle,
  articles,
  verticalArticles,
  horizontalArticles
}: LeadStory2Props) => {
  const breakpointKey = useBreakpointKey();

  const modifedArticles =
    breakpointKey === 'xl'
      ? articles.map(article => ({
          ...article,
          imageRight: true
        }))
      : articles;

  const screenXsAndSm = breakpointKey === 'xs' || breakpointKey === 'sm';

  const modifiedLeadArticle = {
    ...leadArticle,
    imageTop: !!screenXsAndSm,
    hasTopBorder: false
  };

  return (
    <Grid xsMargin="space045" mdMargin="space050">
      <StyledLeadStoryCell xs={12} md={12} lg={9} xl={8}>
        <Block marginInline={{ xs: 'space000', md: 'space020' }}>
          <Visible lg xl>
            <LeadStoryDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
              position="right"
            />
          </Visible>
          <LeadArticle {...modifiedLeadArticle} />
          {screenXsAndSm ? (
            <FullWidthDividerMob>
              <Divider
                overrides={{
                  stylePreset: 'dashedDivider',
                  marginBlockStart: 'space040',
                  marginBlockEnd: 'space040'
                }}
              />
            </FullWidthDividerMob>
          ) : (
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlock: 'space040'
              }}
            />
          )}
          <ArticleStack
            verticalArticles={verticalArticles}
            breakpoint={breakpointKey}
            horizontalArticles={horizontalArticles}
          />
        </Block>
      </StyledLeadStoryCell>
      <Cell xs={12} lg={3} xl={4}>
        <ComposedArticleStack
          articles={modifedArticles}
          breakpoint={breakpointKey}
        />
      </Cell>
    </Grid>
  );
};
