import React from 'react';
import mockDate from 'mockdate';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { getArticles } from '../helpers';
import { useFetch } from '../../../helpers/fetch/FetchProvider';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';
import previewData from '../../../fixtures/preview-data/recommended-articles';

import { RecommendedArticles } from '../RecommendedArticles';

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  useFetch: jest.fn()
}));

jest.mock('@times-components/related-articles', () => ({
  __esModule: true,
  default: (props: any) => (
    <div>
      RelatedArticles
      <div>{props.heading}</div>
      {props.slice.items.map(({ article }: any) => (
        <div
          onClick={() => props.onPress(null, { url: article.shortIdentifier })}
        >
          {article.headline}
        </div>
      ))}
    </div>
  )
}));

const articles = previewData.recommendations.articles;

const section = 'news';
const heading = `Today's ${section}`;

const initialContext = {
  object: 'RecommendedArticles',
  attrs: {
    event_navigation_action: 'navigation',
    event_navigation_name: 'widget : relevant article',
    event_navigation_browsing_method: 'click',
    section_details: `section : ${section}`,
    article_name: 'Headline',
    widget_headline: heading.toLowerCase(),
    widget_section: section,
    widget_type: "today's section"
  }
};

describe('<RecommendedArticles>', () => {
  beforeEach(() => {
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the initial loading state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ loading: true });

    const { asFragment } = render(<RecommendedArticles heading={heading} />);

    expect(asFragment().firstChild).toBeNull();
  });

  it('should render the error state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ error: 'Some error occurred' });

    const { asFragment } = render(<RecommendedArticles heading={heading} />);

    expect(asFragment().firstChild).toBeNull();
  });

  it('should render RelatedArticles correctly with 1 article', () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: getArticles(previewData, 1)
    });

    const { asFragment, getByText } = render(
      <RecommendedArticles heading={heading} />
    );

    expect(getByText(heading));
    expect(getByText(articles[0].headline));
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render RelatedArticles correctly with 2 articles', () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: getArticles(previewData, 2)
    });

    const { asFragment, getByText } = render(
      <RecommendedArticles heading={heading} />
    );

    expect(getByText(heading));
    expect(getByText(articles[0].headline));
    expect(getByText(articles[1].headline));
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render RelatedArticles correctly with 3 articles', () => {
    (useFetch as jest.Mock).mockReturnValue({ data: previewData });

    const { asFragment, getByText } = render(
      <RecommendedArticles heading={heading} />
    );

    expect(getByText(heading));
    expect(getByText(articles[0].headline));
    expect(getByText(articles[1].headline));
    expect(getByText(articles[2].headline));
    expect(asFragment()).toMatchSnapshot();
  });

  it('should fire analytics event when an article is clicked', () => {
    const analyticsStream = jest.fn();

    (useFetch as jest.Mock).mockReturnValue({ data: previewData });

    const { getByText } = render(
      <TrackingContextProvider
        context={initialContext}
        analyticsStream={analyticsStream}
      >
        <RecommendedArticles heading={heading} />
      </TrackingContextProvider>
    );

    fireEvent.click(getByText(articles[0].headline));

    expect(analyticsStream).toHaveBeenCalledTimes(1);
    expect(analyticsStream).toHaveBeenCalledWith({
      action: 'Clicked',
      object: 'RecommendedArticles',
      attrs: {
        ...initialContext.attrs,
        eventTime: '2021-05-03T00:00:00.000Z',
        article_parent_name: articles[0].headline
      }
    });
  });
});
