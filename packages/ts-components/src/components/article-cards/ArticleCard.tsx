import React, { FC, Fragment } from 'react';
import Card from './Card/Card';
import { Container, Divider, Grid, Title } from './styles';
import { ArticleCardsProps, ArticleProps } from './types';

export const ArticleCard: FC<ArticleCardsProps> = ({ element }) => {
  const decodedArticles: ArticleProps[] = JSON.parse(
    atob(element.articles || '')
  );
  const numOfArticles = element.articles.length;

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
