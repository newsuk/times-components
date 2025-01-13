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
import { tealiumTrackingHandler, truncateText } from '../utils';

const Card = (props: ArticleCardProps) => {
  const { article, numOfArticles, isLeadingArticle, isLastCard } = props;

  return (
    <StyledCard $numOfArticles={numOfArticles}>
      {isLeadingArticle ? (
        <a
          href={article.url}
          onClick={() => {
            tealiumTrackingHandler(article.headline, article.headline);
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
              tealiumTrackingHandler(article.headline, article.headline);
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
        <StyledLink
          $numOfArticles={numOfArticles}
          href={article.url}
          onClick={() =>
            tealiumTrackingHandler(article.headline, article.headline)
          }
        >
          {article.headline}
        </StyledLink>
        <StyledText $numOfArticles={numOfArticles}>
          {truncateText(article.summary, 160)}
        </StyledText>
        {!isLastCard && <StyledDivider />}
      </StyledContent>
    </StyledCard>
  );
};

export default Card;
