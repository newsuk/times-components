import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SingleRelatedArticle } from '../SingleRelatedArticle';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';
import mockDate from 'mockdate';

const article1 = {
  label: 'Environment',
  headline: 'Scientists discover ‘chocolate frogs’ in New Guinea',
  link:
    'https://www.thetimes.co.uk/article/scientists-discover-chocolate-frogs-in-new-guinea-bt3z986bj',
  image:
    'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F464a9dfe-c453-11eb-8601-6a2ece3e4634.jpg?crop=3586%2C2017%2C0%2C187&resize=663',
  summary:
    'Popularised by the Harry Potter books, the chocolate frog, it has emerged, is far from fictional. A living version of the confectionery shop favourite has been discovered in the jungles of New Guinea.',
  publishedTime: '2021-06-03T11:00:00.000Z',
  byline: 'Roger Maynard, Sydney'
};

describe('<SingleRelatedArticle>', () => {
  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        // @ts-ignore
        resolvedOptions: () => ({ timeZone: 'Europe/London' })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  it('renders', () => {
    const { baseElement } = render(
      <SingleRelatedArticle sectionColour="red" {...article1} />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('renders no image', () => {
    const { baseElement } = render(
      <SingleRelatedArticle
        sectionColour="red"
        {...article1}
        image={undefined}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});

describe('tracking', () => {
  beforeEach(() => {
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    mockDate.reset();
  });
  it('fires click event when the image is clicked', () => {
    const analyticsStream = jest.fn();
    const { getByRole } = render(
      <TrackingContextProvider
        context={{
          component: 'ArticleSkeleton',
          attrs: {
            articleHeadline: 'articleHeadline',
            section: 'section'
          }
        }}
        analyticsStream={analyticsStream}
      >
        <SingleRelatedArticle sectionColour="red" {...article1} />
      </TrackingContextProvider>
    );
    fireEvent.click(getByRole('img'));
    expect(analyticsStream).toHaveBeenCalledTimes(1);
    expect(analyticsStream).toHaveBeenCalledWith({
      action: 'Clicked',
      component: 'ArticleSkeleton',
      object: 'InArticleRelatedArticles',
      attrs: {
        articleHeadline: 'articleHeadline',
        component_name:
          'related article : Scientists discover ‘chocolate frogs’ in New Guinea',
        eventTime: '2021-05-03T00:00:00.000Z',
        event_navigation_browsing_method: 'click',
        event_navigation_name:
          'button : image : Scientists discover ‘chocolate frogs’ in New Guinea',
        section: 'section'
      }
    });
  });
  it('fires click event when the headline is clicked', () => {
    const analyticsStream = jest.fn();
    const { getByText } = render(
      <TrackingContextProvider
        context={{
          component: 'ArticleSkeleton',
          attrs: {
            articleHeadline: 'articleHeadline',
            section: 'section'
          }
        }}
        analyticsStream={analyticsStream}
      >
        <SingleRelatedArticle sectionColour="red" {...article1} />
      </TrackingContextProvider>
    );
    fireEvent.click(
      getByText('Scientists discover ‘chocolate frogs’ in New Guinea')
    );
    expect(analyticsStream).toHaveBeenCalledTimes(1);
    expect(analyticsStream).toHaveBeenCalledWith({
      action: 'Clicked',
      component: 'ArticleSkeleton',
      object: 'InArticleRelatedArticles',
      attrs: {
        articleHeadline: 'articleHeadline',
        component_name:
          'related article : Scientists discover ‘chocolate frogs’ in New Guinea',
        eventTime: '2021-05-03T00:00:00.000Z',
        event_navigation_browsing_method: 'click',
        event_navigation_name:
          'button : headline : Scientists discover ‘chocolate frogs’ in New Guinea',
        section: 'section'
      }
    });
  });
});
