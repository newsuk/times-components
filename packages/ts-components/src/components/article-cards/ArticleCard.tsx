import React, { FC, Fragment } from 'react';
import { Divider, GridLayout, TextBlock } from 'newskit';
import Card from './Card/Card';

export type ArticleProps = {
  id: number;
  image: {
    alt: string;
    url: string;
  };
  label: string;
  headline: string;
  summary: string;
  url: string;
};

export interface ArticleCardProps {
  article: ArticleProps;
  sectionTitle: string;
  // numOfArticles: number;
  // isLeadingArticle: boolean;
  // isLastCard: boolean;
}

export interface ArticleCardsProps {
  articles: ArticleProps[];
  title: string;
}

export const ArticleCard: FC<ArticleCardsProps> = props => {
  // Extracting data safely with default values
  const articles: ArticleProps[] = props.articles || [];
  const title: string = props.title || '';
  const numOfArticles: number = articles.length;

  // console.log('props', props);
  // console.log('numOfArticles', numOfArticles);

  return (
    <>
      <GridLayout
        overrides={{
          maxWidth: '1144px',
          paddingInline: {
            xs: '10px',
            md: 'space050',
            lg: 'space045',
            xl: 'space000'
          },
          marginInline: 'auto'
        }}
      >
        <Divider
          overrides={{
            stylePreset: {
              xs: 'solidDividerPreset020',
              md: 'solidDividerPreset010'
            }
          }}
        />
        {title && (
          <TextBlock
            as="span"
            marginBlock={{ xs: 'space045', md: 'space050' }}
            stylePreset="labelPreset010"
            typographyPreset={{
              xs: 'editorialDisplay003',
              md: 'editorialDisplay004'
            }}
          >
            {title}
          </TextBlock>
        )}
        <GridLayout
          columns={{
            sm: '1fr',
            md: `repeat(${numOfArticles}, 1fr)`
          }}
          columnGap="space060"
          rowGap={{ md: 'space060' }}
          overrides={{ paddingBlockEnd: 'space050' }}
        >
          {articles.map((article, index) => (
            <Fragment key={article.id}>
              <Card
                article={article}
                sectionTitle={title}
                numOfArticles={numOfArticles}
                isLeadingArticle={index === 0}
                isLastCard={index === numOfArticles - 1}
              />
            </Fragment>
          ))}
        </GridLayout>
      </GridLayout>
    </>
  );
};
