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
          <AspectRatio ratio="16:9">
            <img src={image} />
          </AspectRatio>
        </RelatedArticlesImageContainer>
      )}
      <SectionLabel sectionColour={sectionColour}>{label}</SectionLabel>
      <div className="headline">{headline}</div>
    </div>
    <InArticleLink link={link} linkText="Read Full Story" />
  </RelatedArticleContainer>
);
