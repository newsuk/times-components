import React from 'react';
import {
  RelatedArticleContainer,
  RelatedArticlesImageContainer,
  SectionLabel
} from './styles';
import { InArticleLink } from '../in-article-link/InArticleLink';
import { AspectRatio } from '../aspect-ratio/AspectRatio';

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
}: RelatedArticleProps) => (
  <RelatedArticleContainer>
    <div>
      {image && (
        <RelatedArticlesImageContainer>
          <a href={link}>
            <AspectRatio ratio="16:9">
              <img src={image} />
            </AspectRatio>
          </a>
        </RelatedArticlesImageContainer>
      )}
      <SectionLabel sectionColour={sectionColour}>{label}</SectionLabel>
      <a href={link}>
        <h3>{headline}</h3>
      </a>
    </div>
    <InArticleLink link={link} linkText="Read Full Story" />
  </RelatedArticleContainer>
);
