import { Block, Divider, Visible } from 'newskit';
import React from 'react';
import { StackItem, BlockItem, LeadStoryContainer } from '../shared-styles';
import { ArticleStackLarge } from '../shared';
import {
  LeadArticleProps,
  LeadArticle
} from '../../components/slices/lead-article';
import { ArticleProps, Article } from '../../components/slices/article';
import { ClickHandlerType } from '../types';

export interface LeadStory4Mobile {
  leadArticle: LeadArticleProps;
  articlesFrom5To9: ArticleProps[];
  article234: ArticleProps[];
  clickHandler: ClickHandlerType;
}

export const LeadStory4Mobile = ({
  leadArticle,
  clickHandler,
  articlesFrom5To9,
  article234
}: LeadStory4Mobile) => {
  return (
    <LeadStoryContainer>
      <StackItem
        $width={{
          xs: '100%',
          md: '69.5%',
          lg: '50%',
          xl: '50%'
        }}
        marginInlineEnd={{
          md: 'space060'
        }}
      >
        <LeadArticle article={leadArticle} clickHandler={clickHandler} />
      </StackItem>
      <StackItem
        $width={{
          xs: '100%',
          md: '30.5%',
          lg: '50%',
          xl: '50%'
        }}
      >
        <Visible xs sm>
          {article234.map((article: ArticleProps) => {
            return (
              <React.Fragment key={article.headline}>
                <Block marginBlockStart="space040">
                  <Article
                    article={{
                      ...article,
                      hasTopBorder: true,
                      isLeadImage: true,
                      titleTypographyPreset: 'editorialHeadline030'
                    }}
                    clickHandler={clickHandler}
                  />
                </Block>
              </React.Fragment>
            );
          })}
        </Visible>
      </StackItem>
      <Divider
        overrides={{
          marginBlock: 'space040',
          stylePreset: 'dashedDivider'
        }}
        aria-label="article-divider-horizontal"
      />
      <BlockItem>
        <ArticleStackLarge
          articles={articlesFrom5To9}
          clickHandler={clickHandler}
        />
      </BlockItem>
    </LeadStoryContainer>
  );
};
