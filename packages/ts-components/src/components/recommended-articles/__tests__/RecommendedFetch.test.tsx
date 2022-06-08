import React from 'react';
import { render } from '@testing-library/react';

import { RecommendedFetch } from '../RecommendedFetch';

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  FetchProvider: () => <div>FetchProvider</div>
}));

describe('<RecommendedFetch>', () => {
  it('should render correctly', () => {
    const { asFragment, getByText } = render(
      <RecommendedFetch
        articleId="1234"
        section="News"
        analyticsStream={() => ({})}
      />
    );

    expect(getByText('FetchProvider'));
    expect(asFragment()).toMatchSnapshot();
  });
});
