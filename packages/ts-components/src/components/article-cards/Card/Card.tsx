import React from 'react';
import {
  StyledCard,
  StyledContent,
  StyledDivider,
  StyledImg,
  StyledLink,
  StyledMedia,
  StyledPicture,
  StyledText,
  Hidden
} from './styles';
import { ArticleCardProps } from '../types';

const Card = (props: ArticleCardProps) => {
  const { article, numOfArticles, isLeadingArticle, isLastCard } = props;

  return (
    <StyledCard $numOfArticles={numOfArticles}>
      {isLeadingArticle ? (
        <a
          href={article.url}
          onClick={() => {
            // tslint:disable-next-line:no-console
            console.log(article.headline);
          }}
        >
          <StyledMedia>
            <StyledPicture>
              <StyledImg src={article.image.url} />
            </StyledPicture>
          </StyledMedia>
        </a>
      ) : (
        <Hidden xs>
          <a
            href={article.url}
            onClick={() => {
              // tslint:disable-next-line:no-console
              console.log(article.url);
            }}
          >
            <StyledMedia>
              <StyledPicture>
                <StyledImg src={article.image.url} />
              </StyledPicture>
            </StyledMedia>
          </a>
        </Hidden>
      )}
      <StyledContent $numOfArticles={numOfArticles}>
        <StyledLink $numOfArticles={numOfArticles} href={article.url}>
          {article.headline}
        </StyledLink>
        <StyledText $numOfArticles={numOfArticles}>
          {article.summary}
        </StyledText>
        {!isLastCard && <StyledDivider />}
      </StyledContent>
    </StyledCard>
  );
};

export default Card;
