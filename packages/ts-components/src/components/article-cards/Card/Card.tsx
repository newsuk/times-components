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
import { tealiumTrackingHandler, truncateText, replaceUrl } from '../utils';

const Card = (props: ArticleCardProps) => {
  const { article, numOfArticles, isLeadingArticle, isLastCard } = props;

  // Function to append the resize parameter to the image URL
  const appendResizeToUrl = (url: string): string => {
    if (!url) {
      return '';
    }
    return `${url}${url.includes('?') ? '&' : '?'}resize=750`;
  };

  return (
    <StyledCard $numOfArticles={numOfArticles}>
      {isLeadingArticle ? (
        <a
          href={replaceUrl(article.url)}
          onClick={() => {
            tealiumTrackingHandler(article.headline, article.headline);
          }}
        >
          <StyledMedia>
            <StyledPicture>
              <StyledImg
                loading="lazy"
                src={appendResizeToUrl(article.image.url)}
                $numOfArticles={numOfArticles}
              />
            </StyledPicture>
          </StyledMedia>
        </a>
      ) : (
        <Hidden xs>
          <a
            href={replaceUrl(article.url)}
            onClick={() => {
              tealiumTrackingHandler(article.headline, article.headline);
            }}
          >
            <StyledMedia>
              <StyledPicture>
                <StyledImg
                  loading="lazy"
                  src={appendResizeToUrl(article.image.url)}
                  $numOfArticles={numOfArticles}
                />
              </StyledPicture>
            </StyledMedia>
          </a>
        </Hidden>
      )}
      <StyledContent $numOfArticles={numOfArticles}>
        <StyledLink
          $numOfArticles={numOfArticles}
          href={replaceUrl(article.url)}
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
