import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import Lead1And2 from '../Lead1And2';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

jest.mock('../../../article/ArticleComment/ArticleComment', () => ({
  ArticleComment: () => <div>ArticleComment</div>
}));

describe('<Lead1And2 />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render an LEAD_1_AND_2 slice correctly', () => {
    const slice = getSlice('LEAD_1_AND_2');

    const { asFragment, getAllByText } = render(<Lead1And2 slice={slice} />);

    const article = getAllByText('Article');
    expect(article.length).toBe(3);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render an LEAD_1_AND_2_COLUMNIST slice correctly', () => {
    const slice = getSlice('LEAD_1_AND_2_COLUMNIST');

    const { asFragment, getAllByText } = render(<Lead1And2 slice={slice} />);

    const article = getAllByText('Article');
    expect(article.length).toBe(2);

    const articleComment = getAllByText('ArticleComment');
    expect(articleComment.length).toBe(1);

    expect(asFragment()).toMatchSnapshot();
  });
});
