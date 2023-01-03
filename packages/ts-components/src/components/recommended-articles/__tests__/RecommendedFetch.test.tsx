import React from 'react';
import { render } from '@testing-library/react';

import { RecommendedFetch } from '../RecommendedFetch';

jest.mock('../RecommendedArticles', () => ({
  RecommendedArticles: (props: any) => (
    <div>
      <div>RecommendedArticles</div>
      <div>{props.heading}</div>
    </div>
  )
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
  beforeEach(() => {
    window.nuk = { getCookieValue: () => true };
    window.__TIMES_CONFIG__ = { environmentName: 'local-prod' };
  });

  it('should render headers in lowercase correctly', () => {
    const { asFragment, getByText } = render(
      <RecommendedFetch
        articleId="1234"
        articleHeadline="Some headline"
        articleSection="news"
      />
    );

    expect(getByText('FetchProvider'));
    expect(getByText('RecommendedArticles'));
    expect(getByText('Today’s news'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render an uppercase section name for Scotland', () => {
    const { getByText } = render(
      <RecommendedFetch
        articleId="1234"
        articleHeadline="Some headline"
        articleSection="scotland"
      />
    );

    expect(getByText('Today’s Scotland'));
  });

  it('should render an uppercase section name for Ireland', () => {
    const { getByText } = render(
      <RecommendedFetch
        articleId="1234"
        articleHeadline="Some headline"
        articleSection="ireland"
      />
    );

    expect(getByText('Today’s Ireland'));
  });
});
