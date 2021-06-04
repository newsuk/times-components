import React from 'react';
import DatePublication from '@times-components/date-publication';

import {
  SingleRelatedArticleContainer,
  SingleRelatedArticlesImageContainer
} from './SingleRelatedArticle.styles';
import { AspectRatio } from '../aspect-ratio/AspectRatio';
import { RelatedArticleType } from './RelatedArticle';

type RelatedArticleProps = {
  sectionColour: string;
} & RelatedArticleType;

export const SingleRelatedArticle = ({
  headline,
  link,
  image,
  summary,
  publishedTime,
  byline
}: RelatedArticleProps) => (
  <SingleRelatedArticleContainer>
    {image && (
      <SingleRelatedArticlesImageContainer>
        <AspectRatio ratio="16:9">
          <img src={image} />
        </AspectRatio>
      </SingleRelatedArticlesImageContainer>
    )}
    <section>
      <a href={link}>
        <div className="headline">{headline}</div>
      </a>
      <div className="summary">{summary}</div>
      <div className="publishedTime">
        <DatePublication date={publishedTime!} showDay={false} />
      </div>
      <div className="byline">{byline}</div>
    </section>
  </SingleRelatedArticleContainer>
);
