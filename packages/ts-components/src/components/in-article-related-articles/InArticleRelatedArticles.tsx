import React from 'react';
import { Container } from './styles';
import { RelatedArticle, RelatedArticleType } from './RelatedArticle';

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
        relatedArticles.map(({ label, headline, link, image }) => (
          <RelatedArticle
            key={headline + ' ' + link}
            sectionColour={sectionColour}
            label={label}
            headline={headline}
            link={link}
            image={showImages ? image : undefined}
          />
        ))}
    </nav>
  </Container>
);
