import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RelatedArticle } from '../RelatedArticle';

const article1 = {
  label: 'VIDEO',
  headline: 'Who is Juan Guaido, the man who declared president?',
  link:
    'https://www.thetimes.co.uk/article/china-yunnan-mobilises-as-herd-of-15-marauding-elephants-approaches-capital-qvgttzz2w',
  image:
    'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fe7a2f8f2-c3ec-11eb-8601-6a2ece3e4634.jpg?crop=3888%2C2187%2C0%2C202&resize=480'
};

describe('<RelatedArticle>', () => {
  it('renders', () => {
    const { baseElement } = render(
      <RelatedArticle sectionColour="red" {...article1} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
