import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import Secondary2And2 from '../Secondary2And2';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

jest.mock('../../../article/ArticleComment/ArticleComment', () => ({
  ArticleComment: () => <div>ArticleComment</div>
}));

describe('<Secondary2And2 />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render an SECONDARY_2_AND_2 slice correctly', () => {
    const slice = getSlice('SECONDARY_2_AND_2');

    const { asFragment, getAllByText } = render(
      <Secondary2And2 slice={slice} />
    );

    const article = getAllByText('Article');
    expect(article.length).toBe(3);

    const comment = getAllByText('ArticleComment');
    expect(comment.length).toBe(1);

    expect(asFragment()).toMatchSnapshot();
  });
});
