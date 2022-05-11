import React from 'react';
import { render } from '@testing-library/react';

import { getSlice } from '../../../../fixtures/getSlice';

import Secondary4 from '../Secondary4';

jest.mock('../../../article/Article/Article', () => ({
  Article: () => <div>Article</div>
}));

describe('<Secondary4 />', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a SECONDARY_4 slice correctly', () => {
    const slice = getSlice('SECONDARY_4');

    const { asFragment, getAllByText } = render(<Secondary4 slice={slice} />);

    const article = getAllByText('Article');
    expect(article.length).toBe(4);

    expect(asFragment()).toMatchSnapshot();
  });
});
