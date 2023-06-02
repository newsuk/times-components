import { Block, Divider, useBreakpointKey, Visible } from 'newskit';
import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import {
  LeadStoryDivider,
  StyledLeadStoryCell,
  CellWithCustomPadding
} from '../shared-styles';
import { ArticleStack } from './article-stacks';
import { FullWidthDividerMob } from '../../components/slices/shared-styles';
import { ComposedArticleStack } from '../shared/composed-article-stack';
import { CustomGridLayout } from '../shared/grid-layout';

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
    <CustomGridLayout>
      <StyledLeadStoryCell xs={12} md={12} lg={9} xl={8}>
        <Block>
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
      <CellWithCustomPadding xs={12} lg={3} xl={4}>
        <ComposedArticleStack
          articles={modifedArticles}
          breakpoint={breakpointKey}
        />
      </CellWithCustomPadding>
    </CustomGridLayout>
  );
};
