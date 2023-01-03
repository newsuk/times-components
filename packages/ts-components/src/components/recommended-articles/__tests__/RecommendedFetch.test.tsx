import React from 'react';
import { render } from '@testing-library/react';

import { RecommendedFetch, getSectionText } from '../RecommendedFetch';

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

  it('should render correctly', () => {
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

  it('should render an uppercase section name', () => {
    const { getByText } = render(
      <RecommendedFetch
        articleId="1234"
        articleHeadline="Some headline"
        articleSection="scotland"
      />
    );

    expect(getByText('Today’s Scotland'));
  });
});

describe('getSectionText function', () => {
  it('will capitalise the first letter on Scotland', () => {
    const section = 'scotland';
    expect(getSectionText(section)).toEqual('Scotland');
  });
  it('will capitalise the first letter on Ireland', () => {
    const section = 'ireland';
    expect(getSectionText(section)).toEqual('Ireland');
  });
  it('will not capitalise the first letter on other sections', () => {
    const section = 'news';
    expect(getSectionText(section)).toEqual('news');
  });
});
