import React from 'react';
import {
  RelatedArticleContainer,
  RelatedArticlesImageContainer
} from './styles';
import { InArticleLink } from '../in-article-link/InArticleLink';
import { AspectRatio } from '../aspect-ratio/AspectRatio';

export type RelatedArticleType = {
  label: string;
  headline: string;
  link: string;
  image?: string;
};
export const RelatedArticle = ({
  label,
  headline,
  link,
  image
}: RelatedArticleType) => (
  <RelatedArticleContainer>
    <div>
      {image && (
        <RelatedArticlesImageContainer>
          <AspectRatio ratio="3:2">
            <img src={image} />
          </AspectRatio>
        </RelatedArticlesImageContainer>
      )}
      <div className="label">{label}</div>
      <div className="headline">{headline}</div>
    </div>
    <InArticleLink link={link} linkText="Read Full Story" />
  </RelatedArticleContainer>
);
