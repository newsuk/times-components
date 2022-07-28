import React from 'react';
import { render } from '@testing-library/react';

import { ArticleStandard } from '../ArticleStandard';

jest.mock('../../../elements/Image/Image', () => ({
  Image: () => <div>Image</div>
}));

jest.mock('../../../elements/Headline/Headline', () => ({
  Headline: () => <div>Headline</div>
}));

describe('<ArticleStandard />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render an article correctly', () => {
    const article = {
      images: { crops: [] },
      label: 'Some text label',
      byline: 'Some author',
      headline: '',
      datePublished: '2020-08-20T12:00:00.000Z',
      url: ''
    };

    const { asFragment, getByText } = render(
      <ArticleStandard article={article} />
    );

    getByText('Image');
    getByText(article.label);
    getByText('Headline');
    getByText('August 20 2020, 1.00pm');
    getByText('Some author');

    expect(asFragment()).toMatchSnapshot();
  });
});
