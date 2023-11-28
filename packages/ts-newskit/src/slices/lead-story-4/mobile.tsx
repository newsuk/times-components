import { Block, Divider, Visible } from 'newskit';
import React from 'react';
import { StackItem, BlockItem, LeadStoryContainer } from '../shared-styles';
import { ArticleStackLarge } from '../shared';
import {
  LeadArticleProps,
  LeadArticle,
} from '../../components/slices/lead-article';
import { ArticleProps, Article } from '../../components/slices/article';
import { ClickHandlerType } from '../types';
import { FullWidthBlock } from '../../components/slices/shared-styles/index';

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
  article234,
}: LeadStory4Mobile) => {
  return (
    <LeadStoryContainer marginBlockEnd="space000">
      <StackItem
        $width={{
          xs: '100%',
        }}
      >
        <LeadArticle article={leadArticle} clickHandler={clickHandler} />
      </StackItem>
      <StackItem
        $width={{
          xs: '100%',
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
                      titleTypographyPreset: 'editorialHeadline030',
                    }}
                    clickHandler={clickHandler}
                  />
                </Block>
              </React.Fragment>
            );
          })}
        </Visible>
      </StackItem>
      <FullWidthBlock
        paddingInlineStart={{
          xs: 'space045',
        }}
        marginBlockStart="space040"
      >
        <Divider
          overrides={{
            marginBlockEnd: 'space040',
            stylePreset: 'dashedDivider',
          }}
        />
      </FullWidthBlock>
      <BlockItem>
        <ArticleStackLarge
          articles={articlesFrom5To9}
          clickHandler={clickHandler}
        />
      </BlockItem>
    </LeadStoryContainer>
  );
};
