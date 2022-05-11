import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import Secondary10 from '../Secondary10';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

describe('<Secondary10 />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a SECONDARY_10 slice correctly', () => {
    const slice = getSlice('SECONDARY_10');

    const { asFragment, getAllByText } = render(<Secondary10 slice={slice} />);

    const article = getAllByText('Article');
    expect(article.length).toBe(10);

    expect(asFragment()).toMatchSnapshot();
  });
});
