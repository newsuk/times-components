import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import Secondary3 from '../Secondary3';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

describe('<Secondary3 />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a SECONDARY_3 slice correctly', () => {
    const slice = getSlice('SECONDARY_3');

    const { asFragment, getAllByText } = render(<Secondary3 slice={slice} />);

    const article = getAllByText('Article');
    expect(article.length).toBe(3);

    expect(asFragment()).toMatchSnapshot();
  });
});
