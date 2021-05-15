import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import Lead1And3Reversed from '../Lead1And3Reversed';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

describe('<Lead1And3Reversed />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render an LEAD_1_AND_3_REVERSED slice correctly', () => {
    const slice = getSlice('LEAD_1_AND_3_REVERSED');

    const { asFragment, getAllByText } = render(
      <Lead1And3Reversed slice={slice} />
    );

    const articles = getAllByText('Article');
    expect(articles.length).toBe(4);

    expect(asFragment()).toMatchSnapshot();
  });
});
