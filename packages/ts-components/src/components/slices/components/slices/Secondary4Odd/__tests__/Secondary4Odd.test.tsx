import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import Secondary4Odd from '../Secondary4Odd';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

jest.mock('../../../article/ArticleComment/ArticleComment', () => ({
  ArticleComment: () => <div>ArticleComment</div>
}));

describe('<Secondary4Odd />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a SECONDARY_4_ODD slice correctly', () => {
    const slice = getSlice('SECONDARY_4_ODD');

    const { asFragment, getAllByText } = render(
      <Secondary4Odd slice={slice} />
    );

    const article = getAllByText('Article');
    expect(article.length).toBe(4);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a SECONDARY_4_ODD_COLUMNIST slice correctly', () => {
    const slice = getSlice('SECONDARY_4_ODD_COLUMNIST');

    const { asFragment, getAllByText } = render(
      <Secondary4Odd slice={slice} />
    );

    const article = getAllByText('Article');
    expect(article.length).toBe(2);

    const comment = getAllByText('ArticleComment');
    expect(comment.length).toBe(2);

    expect(asFragment()).toMatchSnapshot();
  });
});
