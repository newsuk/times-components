import React from 'react';
import { render } from '@testing-library/react';

import { RecommendedFetch } from '../RecommendedFetch';

jest.mock('../RecommendedArticles', () => ({
  RecommendedArticles: () => <div>RecommendedArticles</div>
}));

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  FetchProvider: (props: any) => (
    <div>
      FetchProvider
      {props.children}
    </div>
  )
}));

describe('<RecommendedFetch>', () => {
  it('should render correctly', () => {
    const { asFragment, getByText } = render(
      <RecommendedFetch
        articleId="1234"
        articleHeadline="Some headline"
        articleSection="News"
      />
    );

    expect(getByText('FetchProvider'));
    expect(getByText('RecommendedArticles'));
    expect(asFragment()).toMatchSnapshot();
  });
});
