import React from 'react';
import MockDate from 'mockdate';
import { render } from '@testing-library/react';

import { Article } from '../Article';

jest.mock('../../../elements/Image/Image', () => ({
  Image: () => <div>Image</div>
}));

jest.mock('../../../elements/Headline/Headline', () => ({
  Headline: () => <div>Headline</div>
}));

describe('<Article />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render an article correctly', () => {
    MockDate.set('2020-08-20T13:00:00.000Z');

    const article = {
      images: { crops: [] },
      label: 'Some text label',
      headline: '',
      datePublished: '2020-08-20T12:00:00.000Z',
      url: ''
    };

    const { asFragment, getByText } = render(<Article article={article} />);

    getByText('Image');
    getByText(article.label);
    getByText('Headline');
    getByText('1 hour ago');

    expect(asFragment()).toMatchSnapshot();
  });
});
