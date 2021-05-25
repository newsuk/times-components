import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import Lead1 from '../Lead1';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

describe('<Lead1 />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render an LEAD_1 slice correctly', () => {
    const slice = getSlice('LEAD_1');

    const { asFragment, getAllByText } = render(<Lead1 slice={slice} />);

    const article = getAllByText('Article');
    expect(article.length).toBe(1);

    expect(asFragment()).toMatchSnapshot();
  });
});
