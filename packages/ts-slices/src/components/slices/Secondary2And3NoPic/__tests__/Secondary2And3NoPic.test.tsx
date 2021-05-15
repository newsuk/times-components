import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import Secondary2And3NoPic from '../Secondary2And3NoPic';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

describe('<Secondary2And3NoPic />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render an SECONDARY_2_AND_3_NO_PIC slice correctly', () => {
    const slice = getSlice('SECONDARY_2_AND_3_NO_PIC');

    const { asFragment, getAllByText } = render(
      <Secondary2And3NoPic slice={slice} />
    );

    const article = getAllByText('Article');
    expect(article.length).toBe(5);

    expect(asFragment()).toMatchSnapshot();
  });
});
