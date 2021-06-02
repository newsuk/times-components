import React from 'react';
import { Container } from './styles';
import { RelatedArticle, RelatedArticleType } from './RelatedArticle';

type RelatedArticlesProps = {
  sectionColour: string;
  heading?: string;
  relatedArticles: RelatedArticleType[];
};
export default ({
  heading,
  relatedArticles,
  sectionColour
}: RelatedArticlesProps) => (
  <Container sectionColour={sectionColour}>
    {heading && <div className="heading">{heading}</div>}
    <nav>
      {relatedArticles &&
        relatedArticles.map(({ label, headline, link, image }) => (
          <RelatedArticle
            label={label}
            headline={headline}
            link={link}
            image={image}
          />
        ))}
    </nav>
  </Container>
);
