import React from 'react';
import { render } from '@testing-library/react';

import { ArticleComment } from '../ArticleComment';

jest.mock('../../../elements/Image/Image', () => ({
  Image: () => <div>Image</div>
}));

jest.mock('../../../elements/Headline/Headline', () => ({
  Headline: () => <div>Headline</div>
}));

describe('<ArticleComment />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a comment article corrctly', () => {
    const article = {
      images: { crops: [] },
      label: 'Some text label',
      byline: 'John Smith',
      headline: '',
      url: ''
    };

    const { asFragment, getByText } = render(
      <ArticleComment article={article} />
    );

    getByText('Image');
    getByText(article.label);
    getByText(article.byline);
    getByText('Headline');

    expect(asFragment()).toMatchSnapshot();
  });
});
