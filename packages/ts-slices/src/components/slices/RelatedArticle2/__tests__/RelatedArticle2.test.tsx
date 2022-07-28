import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import RelatedArticle2 from '../RelatedArticle2';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

describe('<RelatedArticle2 />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render an RELATED_ARTICLE_2 slice correctly', () => {
    const slice = getSlice('RELATED_ARTICLE_2');

    const { asFragment, getAllByText } = render(
      <RelatedArticle2 slice={slice} />
    );

    const article = getAllByText('Article');
    expect(article.length).toBe(2);

    expect(asFragment()).toMatchSnapshot();
  });
});
