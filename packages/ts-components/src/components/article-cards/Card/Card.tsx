import React, { FC } from 'react';
import { Hidden, LinkStandalone } from 'newskit';
import {
  StyledCardComposable,
  StyledCardMedia,
  StyledCardContent,
  StyledSummaryText
} from './styles';
import { tealiumTrackingHandler, truncateText } from '../utils';

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
  numOfArticles: number;
  isLeadingArticle: boolean;
  isLastCard: boolean;
}

const Card: FC<ArticleCardProps> = ({
  article,
  sectionTitle,
  numOfArticles,
  isLeadingArticle
  // isLastCard,
}) => {
  return (
    <StyledCardComposable $numOfArticles={numOfArticles}>
      {isLeadingArticle ? (
        <LinkStandalone
          href={article.url}
          external={false}
          onClick={() => tealiumTrackingHandler(article.headline, sectionTitle)}
        >
          <StyledCardMedia
            media={{
              src: article.image.url,
              fit: 'cover'
            }}
          />
        </LinkStandalone>
      ) : (
        <Hidden xs sm>
          <LinkStandalone
            href={article.url}
            external={false}
            onClick={() =>
              tealiumTrackingHandler(article.headline, sectionTitle)
            }
          >
            <StyledCardMedia
              media={{
                src: article.image.url,
                fit: 'cover'
              }}
            />
          </LinkStandalone>
        </Hidden>
      )}
      <StyledCardContent $numOfArticles={numOfArticles}>
        <LinkStandalone
          href={article.url}
          external={false}
          overrides={{
            typographyPreset: {
              xs: 'editorialHeadline020',
              md:
                numOfArticles === 1 ? 'editorialHeadline040' : 'articleCard020',
              lg:
                numOfArticles <= 2 ? 'editorialHeadline040' : 'articleCard020',
              xl: numOfArticles <= 2 ? 'editorialHeadline040' : 'articleCard020'
            },
            stylePreset: 'articleHeadlinePreset',
            marginBlockStart: {
              xs: `${isLeadingArticle ? 'space045' : 'space000'}`,
              md: 'space030',
              lg: 'space040'
            }
          }}
          onClick={() => tealiumTrackingHandler(article.headline, sectionTitle)}
        >
          {article.headline}
        </LinkStandalone>
        <StyledSummaryText
          as="span"
          typographyPreset="editorialParagraph010"
          stylePreset="articleSummaryPreset"
          marginBlockStart="space045"
          $numOfArticles={numOfArticles}
        >
          {truncateText(article.summary, 160)}
        </StyledSummaryText>
        {/* {!isLastCard && (
          <StyledDivider
            overrides={{
              marginBlock: numOfArticles === 1 ? 'space060' : 'space045',
            }}
          />
        )} */}
      </StyledCardContent>
    </StyledCardComposable>
  );
};

export default Card;
