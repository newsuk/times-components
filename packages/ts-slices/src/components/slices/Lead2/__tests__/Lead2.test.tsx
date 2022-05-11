import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import Lead2 from '../Lead2';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

describe('<Lead2 />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a LEAD_2 slice correctly', () => {
    const slice = getSlice('LEAD_2');

    const { asFragment, getAllByText } = render(<Lead2 slice={slice} />);

    const articles = getAllByText('Article');
    expect(articles.length).toBe(2);

    expect(asFragment()).toMatchSnapshot();
  });
});
