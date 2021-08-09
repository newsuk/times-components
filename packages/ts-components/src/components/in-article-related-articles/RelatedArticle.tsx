import React from 'react';
import {
  RelatedArticleContainer,
  RelatedArticlesImageContainer,
  SectionLabel
} from './styles';
import { InArticleLink } from '../in-article-link/InArticleLink';
import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { useTrackingContext } from '../../helpers/tracking/TrackingContextProvider';
import { handleClick } from './tracking-helpers';

export type RelatedArticleType = {
  label: string;
  headline: string;
  link: string;
  image?: string;
  summary?: string;
  publishedTime?: string;
  byline?: string;
};

type RelatedArticleProps = {
  sectionColour: string;
} & RelatedArticleType;

export const RelatedArticle = ({
  label,
  headline,
  link,
  image,
  sectionColour
}: RelatedArticleProps) => {
  const { fireAnalyticsEvent } = useTrackingContext();
  return (
    <RelatedArticleContainer>
      <div>
        {image && (
          <RelatedArticlesImageContainer>
            <a
              href={link}
              onClick={() => handleClick(fireAnalyticsEvent, 'image', headline)}
            >
              <AspectRatio ratio="16:9">
                <img src={image} />
              </AspectRatio>
            </a>
          </RelatedArticlesImageContainer>
        )}
        <SectionLabel sectionColour={sectionColour}>{label}</SectionLabel>
        <a
          href={link}
          onClick={() => handleClick(fireAnalyticsEvent, 'headline', headline)}
        >
          <h3>{headline}</h3>
        </a>
      </div>
      <InArticleLink
        link={link}
        linkText="Read Full Story"
        onClick={() =>
          handleClick(fireAnalyticsEvent, 'Read Full Story', headline)
        }
      />
    </RelatedArticleContainer>
  );
};
