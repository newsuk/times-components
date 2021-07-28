import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InArticleRelatedArticles } from '../InArticleRelatedArticles';

const relatedArticles = [
  {
    label: 'label1',
    headline: 'headline1',
    link: 'https://link1',
    image: 'https://image1.jpg'
  },
  {
    label: 'label2',
    headline: 'headline2',
    link: 'https://link2',
    image: 'https://image2.jpg'
  },
  {
    label: 'label3',
    headline: 'headline3',
    link: 'https://link3',
    image: 'https://image3.jpg'
  }
];

jest.mock('../RelatedArticle', () => ({ RelatedArticle: 'RelatedArticle' }));

jest.mock('../SingleRelatedArticle', () => ({
  SingleRelatedArticle: 'SingleRelatedArticle'
}));

describe('<RelatedArticle>', () => {
  it('default', () => {
    const { baseElement } = render(
      <InArticleRelatedArticles
        sectionColour="red"
        relatedArticles={relatedArticles}
        heading="Heading"
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('no images', () => {
    const { baseElement } = render(
      <InArticleRelatedArticles
        sectionColour="red"
        relatedArticles={relatedArticles}
        heading="Heading"
        showImages={false}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('single article', () => {
    const { baseElement } = render(
      <InArticleRelatedArticles
        sectionColour="red"
        relatedArticles={[relatedArticles[0]]}
        heading="Heading"
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('single article no image', () => {
    const { baseElement } = render(
      <InArticleRelatedArticles
        sectionColour="red"
        relatedArticles={[relatedArticles[0]]}
        heading="Heading"
        showImages={false}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
