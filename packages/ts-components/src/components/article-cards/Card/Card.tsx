import React from 'react';
import {
  StyledCard,
  StyledContent,
  StyledDivider,
  StyledImg,
  StyledLink,
  StyledMedia,
  StyledPicture,
  StyledText
} from './styles';
import { ArticleCardProps } from '../types';

const Card = (props: ArticleCardProps) => {
  const article = props.article;

  return (
    <StyledCard $numOfArticles={props.numOfArticles}>
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
      <StyledContent $numOfArticles={props.numOfArticles}>
        <StyledLink $numOfArticles={props.numOfArticles} href={article.url}>
          {article.headline}
        </StyledLink>
        <StyledText $numOfArticles={props.numOfArticles}>
          {article.summary}
        </StyledText>
        {!props.isLastCard && <StyledDivider data-testid="divider" />}
      </StyledContent>
    </StyledCard>
  );
};

export default Card;
