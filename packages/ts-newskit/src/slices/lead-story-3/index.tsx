import { Block, Divider, Hidden, useBreakpointKey, Visible } from 'newskit';
import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ArticleProps } from '../../components/slices/article';
import { LeadStoryDivider, StackItem, BlockItem } from '../shared-styles';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { ComposedArticleStack } from '../shared/composed-article-stack';
import { ArticleStack } from './article-stack';
import { ArticleStackLeadStory, CustomStackLayout } from '../shared';

export interface LeadStory3Props {
  leadArticle: LeadArticleProps;
  articles: ArticleProps[];
  leadArticles: LeadArticleProps[];
}

export const LeadStory3 = ({
  leadArticle,
  articles,
  leadArticles
}: LeadStory3Props) => {
  const breakpointKey = useBreakpointKey();

  const modifedArticles =
    breakpointKey === 'xl'
      ? articles.map(article => ({
          ...article,
          imageRight: true
        }))
      : articles;

  const screenXsAndSm = breakpointKey === 'xs' || breakpointKey === 'sm';

  const modifedLeadArticles = {
    ...leadArticle,
    typographyPreset: 'editorialHeadline040',
    imageTop: true,
    loadingAspectRatio: '4:5'
  };

  const LeadStoryLayout: React.FC = ({ children }) => {
    return (
      <Block marginBlockEnd={{ xs: 'space040', md: 'space000' }}>
        <Visible lg xl>
          <LeadStoryDivider
            overrides={{ stylePreset: 'lightDivider' }}
            vertical
            position="right"
          />
        </Visible>
        {children}
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
    );
  };

  return (
    <CustomStackLayout>
      <StackItem
        $width={{
          xs: '100%',
          md: '292px'
        }}
      >
        <ArticleStack
          leadArticles={leadArticles}
          breakpointKey={breakpointKey}
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
          <FullWidthBlock>
            <Divider
              overrides={{
                stylePreset: 'dashedDivider',
                marginBlockEnd: 'space040'
              }}
            />
          </FullWidthBlock>
        </Hidden>
        <Block>
          <LeadStoryLayout>
            <LeadArticle {...modifedLeadArticles} />
          </LeadStoryLayout>
        </Block>
      </StackItem>
      {screenXsAndSm ? (
        <BlockItem>
          <ComposedArticleStack
            articles={modifedArticles}
            breakpoint={breakpointKey}
          />
        </BlockItem>
      ) : (
        <ArticleStackLeadStory
          mdWidth="752px"
          modifedArticles={modifedArticles}
          breakpoint={breakpointKey}
        />
      )}
    </CustomStackLayout>
  );
};
