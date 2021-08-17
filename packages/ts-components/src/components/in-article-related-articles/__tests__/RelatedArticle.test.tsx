import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RelatedArticle } from '../RelatedArticle';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';
import mockDate from 'mockdate';

const article1 = {
  label: 'VIDEO',
  headline: 'Who is Juan Guaido, the man who declared president?',
  link:
    'https://www.thetimes.co.uk/article/china-yunnan-mobilises-as-herd-of-15-marauding-elephants-approaches-capital-qvgttzz2w',
  image:
    'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fe7a2f8f2-c3ec-11eb-8601-6a2ece3e4634.jpg?crop=3888%2C2187%2C0%2C202&resize=480'
};

describe('<RelatedArticle>', () => {
  it('renders', () => {
    const { baseElement } = render(
      <RelatedArticle sectionColour="red" {...article1} />
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
        <RelatedArticle sectionColour="red" {...article1} />
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
          'related article : Who is Juan Guaido, the man who declared president?',
        eventTime: '2021-05-03T00:00:00.000Z',
        event_navigation_browsing_method: 'click',
        event_navigation_name:
          'button : image : Who is Juan Guaido, the man who declared president?',
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
        <RelatedArticle sectionColour="red" {...article1} />
      </TrackingContextProvider>
    );
    fireEvent.click(
      getByText('Who is Juan Guaido, the man who declared president?')
    );
    expect(analyticsStream).toHaveBeenCalledTimes(1);
    expect(analyticsStream).toHaveBeenCalledWith({
      action: 'Clicked',
      component: 'ArticleSkeleton',
      object: 'InArticleRelatedArticles',
      attrs: {
        articleHeadline: 'articleHeadline',
        component_name:
          'related article : Who is Juan Guaido, the man who declared president?',
        eventTime: '2021-05-03T00:00:00.000Z',
        event_navigation_browsing_method: 'click',
        event_navigation_name:
          'button : headline : Who is Juan Guaido, the man who declared president?',
        section: 'section'
      }
    });
  });
  it('fires click event when "Read Full Story" link is clicked', () => {
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
        <RelatedArticle sectionColour="red" {...article1} />
      </TrackingContextProvider>
    );
    fireEvent.click(getByText('Read Full Story'));
    expect(analyticsStream).toHaveBeenCalledTimes(1);
    expect(analyticsStream).toHaveBeenCalledWith({
      action: 'Clicked',
      component: 'ArticleSkeleton',
      object: 'InArticleRelatedArticles',
      attrs: {
        articleHeadline: 'articleHeadline',
        component_name:
          'related article : Who is Juan Guaido, the man who declared president?',
        eventTime: '2021-05-03T00:00:00.000Z',
        event_navigation_browsing_method: 'click',
        event_navigation_name: 'button : Read Full Story',
        section: 'section'
      }
    });
  });
});
