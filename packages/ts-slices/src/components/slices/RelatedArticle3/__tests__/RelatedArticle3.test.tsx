import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import RelatedArticle3 from '../RelatedArticle3';

jest.mock('../../../article/ArticleStandard/ArticleStandard', () => ({
  ArticleStandard: () => <div>ArticleStandard</div>
}));

describe('<RelatedArticle3 />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render an RELATED_ARTICLE_3 slice correctly', () => {
    const slice = getSlice('RELATED_ARTICLE_3');

    const { asFragment, getAllByText } = render(
      <RelatedArticle3 slice={slice} />
    );

    const article = getAllByText('ArticleStandard');
    expect(article.length).toBe(3);

    expect(asFragment()).toMatchSnapshot();
  });
});
