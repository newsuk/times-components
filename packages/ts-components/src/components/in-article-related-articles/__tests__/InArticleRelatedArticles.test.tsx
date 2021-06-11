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
    expect(baseElement.getElementsByTagName('img').length).toEqual(3);
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
    expect(baseElement.getElementsByTagName('img').length).toEqual(0);
  });
});
