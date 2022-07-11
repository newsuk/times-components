import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useFetch } from '../../../helpers/fetch/FetchProvider';

import { GalleryCarousel, GalleryCarouselProps } from '../GalleryCarousel';
import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';
import mockDate from 'mockdate';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <div>Placeholder</div>
}));

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  useFetch: jest.fn()
}));

const deckApiPayloadWrapper = () => ({
  data: testData
});

const testData = {
  deck_id: 43434,
  deck_name: 'Best British hotels',
  deck_type: 'Image Gallery',
  version: 18,
  updated_at: {
    date: '2021-07-15 11:29:34.000000',
    timezone_type: 3,
    timezone: 'UTC'
  },
  fields: {
    label: 'Label 1',
    headline: 'Gallery Headline',
    size: '4033'
  },
  body: {
    data: [
      {
        type: 'image',
        data: {
          image:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F46cebe30-c82d-11eb-b6f5-fed739e7c1ca.jpg?crop=6676%2C3755%2C65%2C707&resize=1180',
          credit: 'Michael Clarke',
          copy: 'Copy 1',
          imageTitle: 'Birch'
        }
      },
      {
        type: 'image',
        data: {
          image:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F0f831cea-0317-11eb-910e-49261a8ea333.jpg?crop=2250%2C1500%2C0%2C0&resize=1500',
          credit: 'John Doe',
          copy: 'Copy 2',
          imageTitle: 'Crockers at Henley'
        }
      }
    ]
  },
  html:
    '<!DOCTYPE html> <html> <head> <title>The Times - Image Gallery</title></head> <body> </body> </html>'
};

const renderCarousel = (
  additionalProps?: Partial<GalleryCarouselProps>,
  analyticsStream?: (evt: any) => void
) =>
  render(
    <TrackingContextProvider
      context={{
        component: 'ArticleSkeleton',
        attrs: {
          article_name: 'Headline',
          section_details: 'Section'
        }
      }}
      analyticsStream={analyticsStream}
    >
      <GalleryCarousel sectionColour={'#000'} {...additionalProps} />
    </TrackingContextProvider>
  );
describe('GalleryCarousel', () => {
  beforeEach(() => {
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the component', () => {
    (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
    const { asFragment } = renderCarousel();
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the first slide on load', () => {
    const { queryAllByText, getAllByRole } = renderCarousel();
    expect(queryAllByText('Label')).toBeTruthy();
    expect(queryAllByText('Gallery Headline')).toBeTruthy();
    expect(queryAllByText('Copy 1')).toBeTruthy();
    expect(getAllByRole('img')[0]).toHaveAttribute(
      'src',
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F46cebe30-c82d-11eb-b6f5-fed739e7c1ca.jpg?crop=6676%2C3755%2C65%2C707&resize=1180'
    );
  });
  describe('tracking', () => {
    (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
    let oldIntersectionObserver: typeof IntersectionObserver;

    beforeEach(() => {
      oldIntersectionObserver = window.IntersectionObserver;

      // @ts-ignore
      window.IntersectionObserver = FakeIntersectionObserver;
    });

    afterEach(() => {
      window.IntersectionObserver = oldIntersectionObserver;

      jest.resetAllMocks();
    });

    it('fires scroll event when viewed', () => {
      (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
      const analyticsStream = jest.fn();
      renderCarousel({}, analyticsStream);

      FakeIntersectionObserver.intersect();

      expect(analyticsStream).toHaveBeenCalledTimes(1);
      expect(analyticsStream).toHaveBeenCalledWith({
        action: 'Scrolled',
        component: 'ArticleSkeleton',
        object: 'GalleryCarousel',
        attrs: {
          article_name: 'Headline',
          component_name: 'Gallery Headline',
          component_type: 'in-article component : gallery : interactive',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'scroll',
          event_navigation_name: 'in-article component displayed : gallery',
          section_details: 'Section'
        }
      });
    });

    it('click previous button', async () => {
      (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
      const analyticsStream = jest.fn();

      const { getAllByTestId } = renderCarousel(
        { initialIndex: 1 },
        analyticsStream
      );

      const previousButton = getAllByTestId('Previous button')[0];
      const nextButton = getAllByTestId('Next Button')[0];

      fireEvent.click(nextButton);

      expect(previousButton).not.toHaveAttribute('disabled');
      expect(nextButton).toHaveAttribute('disabled');

      analyticsStream.mockClear();

      fireEvent.click(previousButton);

      expect(analyticsStream).toHaveBeenCalledTimes(1);
      expect(analyticsStream).toHaveBeenCalledWith({
        attrs: {
          article_name: 'Headline',
          component_name: 'Gallery Headline',
          component_type: 'in-article component : gallery : interactive',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'click',
          event_navigation_name: 'button : left',
          section_details: 'Section'
        },
        component: 'ArticleSkeleton',
        object: 'GalleryCarousel'
      });

      expect(previousButton).toHaveAttribute('disabled');
      expect(nextButton).not.toHaveAttribute('disabled');
    });
    it('click next button', async () => {
      (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
      const analyticsStream = jest.fn();

      const { getAllByTestId } = renderCarousel({}, analyticsStream);

      const previousButton = getAllByTestId('Previous button')[0];
      const nextButton = getAllByTestId('Next Button')[0];

      expect(previousButton).toHaveAttribute('disabled');
      expect(nextButton).not.toHaveAttribute('disabled');

      fireEvent.click(nextButton);

      expect(analyticsStream).toHaveBeenCalledTimes(1);
      expect(analyticsStream).toHaveBeenCalledWith({
        attrs: {
          article_name: 'Headline',
          component_name: 'Gallery Headline',
          component_type: 'in-article component : gallery : interactive',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_name: 'button : right',
          event_navigation_browsing_method: 'click',
          section_details: 'Section'
        },
        component: 'ArticleSkeleton',
        object: 'GalleryCarousel'
      });
      expect(previousButton).not.toHaveAttribute('disabled');
      expect(nextButton).toHaveAttribute('disabled');
    });

    it('page indicator button', async () => {
      (useFetch as jest.Mock).mockReturnValue(deckApiPayloadWrapper());
      const analyticsStream = jest.fn();

      const { getAllByTestId } = renderCarousel({}, analyticsStream);

      const previousButton = getAllByTestId('Previous button')[0];
      const nextButton = getAllByTestId('Next Button')[0];

      expect(previousButton).toHaveAttribute('disabled');
      expect(nextButton).not.toHaveAttribute('disabled');

      fireEvent.click(getAllByTestId('Page Indicator')[1]);

      expect(analyticsStream).toHaveBeenCalledTimes(0);
      expect(previousButton).not.toHaveAttribute('disabled');
      expect(nextButton).toHaveAttribute('disabled');
    });
  });
});
