import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InArticleRelatedArticles } from '../InArticleRelatedArticles';
import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';

import mockDate from 'mockdate';

const relatedArticles = [
  {
    label: 'label1',
    headline: 'headline1',
    link: 'https://link1',
    image: 'https://image1.jpg'
  },
  {
    label: 'label2',
    headline: 'headline2',
    link: 'https://link2',
    image: 'https://image2.jpg'
  },
  {
    label: 'label3',
    headline: 'headline3',
    link: 'https://link3',
    image: 'https://image3.jpg'
  }
];

jest.mock('../RelatedArticle', () => ({ RelatedArticle: 'RelatedArticle' }));

jest.mock('../SingleRelatedArticle', () => ({
  SingleRelatedArticle: 'SingleRelatedArticle'
}));

describe('<RelatedArticle>', () => {
  it('default', () => {
    const { baseElement } = render(
      <InArticleRelatedArticles
        sectionColour="red"
        relatedArticles={relatedArticles}
        heading="Heading"
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('no images', () => {
    const { baseElement } = render(
      <InArticleRelatedArticles
        sectionColour="red"
        relatedArticles={relatedArticles}
        heading="Heading"
        showImages={false}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('single article', () => {
    const { baseElement } = render(
      <InArticleRelatedArticles
        sectionColour="red"
        relatedArticles={[relatedArticles[0]]}
        heading="Heading"
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('single article no image', () => {
    const { baseElement } = render(
      <InArticleRelatedArticles
        sectionColour="red"
        relatedArticles={[relatedArticles[0]]}
        heading="Heading"
        showImages={false}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});

describe('tracking', () => {
  let oldIntersectionObserver: typeof IntersectionObserver;
  const analyticsStream = jest.fn();

  beforeEach(() => {
    oldIntersectionObserver = window.IntersectionObserver;

    // @ts-ignore
    window.IntersectionObserver = FakeIntersectionObserver;
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    window.IntersectionObserver = oldIntersectionObserver;
    mockDate.reset();
    jest.resetAllMocks();
  });

  it('fires scroll event when viewed', () => {
    render(
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
        <InArticleRelatedArticles
          sectionColour="red"
          relatedArticles={relatedArticles}
          heading="Heading"
        />
      </TrackingContextProvider>
    );

    FakeIntersectionObserver.intersect();

    expect(analyticsStream).toHaveBeenCalledTimes(1);
    expect(analyticsStream).toHaveBeenCalledWith({
      action: 'Scrolled',
      component: 'ArticleSkeleton',
      object: 'InArticleRelatedArticles',
      attrs: {
        articleHeadline: 'articleHeadline',
        component_name: 'in-article component : related article : in view',
        component_type: 'in-article component : related articles : interactive',
        eventTime: '2021-05-03T00:00:00.000Z',
        event_navigation_action: 'navigation',
        event_navigation_browsing_method: 'scroll',
        event_navigation_name:
          'in-article component displayed : related article',
        section: 'section'
      }
    });
  });
});
