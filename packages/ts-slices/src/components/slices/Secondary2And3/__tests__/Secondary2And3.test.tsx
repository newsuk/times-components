import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import Secondary2And3 from '../Secondary2And3';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

describe('<Secondary2And3 />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render an SECONDARY_2_AND_3 slice correctly', () => {
    const slice = getSlice('SECONDARY_2_AND_3');

    const { asFragment, getAllByText } = render(
      <Secondary2And3 slice={slice} />
    );

    const article = getAllByText('Article');
    expect(article.length).toBe(5);

    expect(asFragment()).toMatchSnapshot();
  });
});
