import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import RelatedArticle1 from '../RelatedArticle1';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

describe('<RelatedArticle1 />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render an RELATED_ARTICLE_1 slice correctly', () => {
    const slice = getSlice('RELATED_ARTICLE_1');

    const { asFragment, getAllByText } = render(
      <RelatedArticle1 slice={slice} />
    );

    const article = getAllByText('Article');
    expect(article.length).toBe(1);

    expect(asFragment()).toMatchSnapshot();
  });
});
