import React, { FC, Fragment } from 'react';
import Card from './Card/Card';
import { Container, Divider, Grid, Title } from './styles';
import { ArticleCardsProps, ArticleProps } from './types';

export const ArticleCard: FC<ArticleCardsProps> = ({ element }) => {
  const decodeBase64 = (value: string): string => {
    try {
      const binaryString = atob(value);

      const textDecoder = new TextDecoder('utf-8');
      const binaryArray = Uint8Array.from(binaryString, (char) =>
        char.charCodeAt(0)
      );

      return textDecoder.decode(binaryArray);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error('Failed to decode base64 string:', value, error);
      return value;
    }
  };

  const decodedArticles: ArticleProps[] = JSON.parse(
    atob(element.articles || '')
  ).map((article: ArticleProps) => ({
    id: decodeBase64(article.id),
    headline: decodeBase64(article.headline),
    summary: decodeBase64(article.summary),
    label: decodeBase64(article.label),
    url: decodeBase64(article.url),
    image: {
      alt: decodeBase64(article.image.alt),
      url: decodeBase64(article.image.url),
    },
  }));

  const numOfArticles = decodedArticles.length;

  return (
    <Container>
      <Divider />
      <Title>{element.title}</Title>
      <Grid columns={numOfArticles}>
        {decodedArticles.map((article, index) => {
          return (
            <Fragment key={article.id}>
              <Card
                article={article}
                sectionTitle={article.headline}
                numOfArticles={numOfArticles}
                isLeadingArticle={index === 0}
                isLastCard={index === numOfArticles - 1}
              />
            </Fragment>
          );
        })}
      </Grid>
    </Container>
  );
};
