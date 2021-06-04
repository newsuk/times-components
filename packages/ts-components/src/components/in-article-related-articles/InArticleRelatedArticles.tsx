import React from 'react';
import { Container } from './styles';
import { RelatedArticle, RelatedArticleType } from './RelatedArticle';
import { SingleRelatedArticle } from './SingleRelatedArticle';

type RelatedArticlesProps = {
  sectionColour: string;
  heading: string;
  relatedArticles: RelatedArticleType[];
  showImages?: boolean;
};
export const InArticleRelatedArticles = ({
  heading,
  relatedArticles,
  sectionColour,
  showImages = true
}: RelatedArticlesProps) => (
  <Container sectionColour={sectionColour}>
    {heading && <div className="heading">{heading}</div>}
    <nav>
      {relatedArticles &&
        relatedArticles.map(
          ({ label, headline, link, image, summary, byline, publishedTime }) =>
            relatedArticles.length > 1 ? (
              <RelatedArticle
                key={headline + ' ' + link}
                sectionColour={sectionColour}
                label={label}
                headline={headline}
                link={link}
                image={showImages ? image : undefined}
              />
            ) : (
              <SingleRelatedArticle
                key={headline + ' ' + link}
                sectionColour={sectionColour}
                label={label}
                headline={headline}
                summary={summary}
                byline={byline}
                publishedTime={publishedTime}
                link={link}
                image={showImages ? image : undefined}
              />
            )
        )}
    </nav>
  </Container>
);
