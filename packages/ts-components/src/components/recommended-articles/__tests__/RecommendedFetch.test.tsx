import React from 'react';
import { render } from '@testing-library/react';

import { RecommendedFetch, getSectionText } from '../RecommendedFetch';

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
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { search: '?recommendedArticles=1' };

    window.nuk = { getCookieValue: () => true };
    window.__TIMES_CONFIG__ = { environmentName: 'local-prod' };

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
  })
})