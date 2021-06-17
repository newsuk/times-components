import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useFetch } from '../../../helpers/fetch/FetchProvider';

import { InArticlePuff } from '../InArticlePuff';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';
import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';

import mockDate from 'mockdate';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <div>Placeholder</div>
}));

jest.mock('@times-components/icons', () => ({
  IconForwardChevron: (props: any) => (
    <svg className="iconForwardChevron" {...props}>
      IconForwardChevron
    </svg>
  )
}));

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  useFetch: jest.fn()
}));

const deckApiPayloadWrapper = (data: { [name: string]: string }) => ({
  data: { body: { data: [{ data }] } }
});

const requiredFields = {
  label: 'interactive',
  headline: 'Where can I get a Covid vaccine in England?',
  link: 'https://www.thetimes.co.uk'
};

const optionalFields = {
  ...requiredFields,
  image: 'https://via.placeholder.com/150',
  copy: 'Enter your postcode to find your nearest centre',
  linkText: 'Read the full article'
};

const requiredProps = {
  sectionColour: '#13354E'
};

describe('InArticlePuff', () => {
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

    const { asFragment } = render(<InArticlePuff {...requiredProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render required fields correctly', () => {
    (useFetch as jest.Mock).mockReturnValue(
      deckApiPayloadWrapper(requiredFields)
    );

    const { asFragment, getByText, queryByRole, getAllByRole } = render(
      <InArticlePuff {...requiredProps} />
    );

    expect(queryByRole('img')).toBeFalsy();
    expect(getByText(requiredFields.label));
    expect(getByText(requiredFields.headline));
    expect(getByText('Read more'));

    const links = getAllByRole('link');
    expect(links).toHaveLength(2);
    links.forEach(a => expect(a).toHaveAttribute('href', requiredFields.link));

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render optional fields correctly', () => {
    (useFetch as jest.Mock).mockReturnValue(
      deckApiPayloadWrapper(optionalFields)
    );

    const { asFragment, getByText, getByRole, getAllByRole } = render(
      <InArticlePuff {...requiredProps} />
    );

    expect(getByRole('img')).toHaveAttribute('src', optionalFields.image);
    expect(getByText(optionalFields.copy));
    expect(getByText(optionalFields.linkText));

    const links = getAllByRole('link');
    expect(links).toHaveLength(3);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the error state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ error: 'Some error occurred' });

    const { asFragment } = render(<InArticlePuff {...requiredProps} />);

    expect(asFragment().firstChild).toBeNull();
  });

  describe('tracking', () => {
    let oldIntersectionObserver: typeof IntersectionObserver;
    const analyticsStream = jest.fn();

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
      (useFetch as jest.Mock).mockReturnValue(
        deckApiPayloadWrapper(optionalFields)
      );

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
          <InArticlePuff {...requiredProps} />
        </TrackingContextProvider>
      );

      FakeIntersectionObserver.intersect();

      expect(analyticsStream).toHaveBeenCalledTimes(1);
      expect(analyticsStream).toHaveBeenCalledWith({
        action: 'Scrolled',
        component: 'ArticleSkeleton',
        object: 'InArticlePuff',
        attrs: {
          articleHeadline: 'articleHeadline',
          component_name: 'Where can I get a Covid vaccine in England?',
          component_type: 'in-article component : puff : interactive',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'scroll',
          event_navigation_name: 'in-article component displayed : puff',
          section: 'section'
        }
      });
    });

    it('fires click event when Read more clicked', () => {
      (useFetch as jest.Mock).mockReturnValue(
        deckApiPayloadWrapper(optionalFields)
      );

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
          <InArticlePuff {...requiredProps} />
        </TrackingContextProvider>
      );

      fireEvent.click(getByText('Read the full article'));

      expect(analyticsStream).toHaveBeenCalledTimes(1);
      expect(analyticsStream).toHaveBeenCalledWith({
        action: 'Clicked',

        component: 'ArticleSkeleton',
        object: 'InArticlePuff',
        attrs: {
          articleHeadline: 'articleHeadline',
          component_name: 'Where can I get a Covid vaccine in England?',
          component_type: 'in-article component : puff : interactive',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'click',
          event_navigation_name: 'button : Read the full article',
          section: 'section'
        }
      });
    });

    it('fires click event when headline clicked', () => {
      (useFetch as jest.Mock).mockReturnValue(
        deckApiPayloadWrapper(optionalFields)
      );

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
          <InArticlePuff {...requiredProps} />
        </TrackingContextProvider>
      );

      fireEvent.click(getByText('Where can I get a Covid vaccine in England?'));

      expect(analyticsStream).toHaveBeenCalledTimes(1);
      expect(analyticsStream).toHaveBeenCalledWith({
        action: 'Clicked',

        component: 'ArticleSkeleton',
        object: 'InArticlePuff',
        attrs: {
          articleHeadline: 'articleHeadline',
          component_name: 'Where can I get a Covid vaccine in England?',
          component_type: 'in-article component : puff : interactive',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'click',
          event_navigation_name: 'button : headline',
          section: 'section'
        }
      });
    });

    it('fires click event when image clicked', () => {
      (useFetch as jest.Mock).mockReturnValue(
        deckApiPayloadWrapper(optionalFields)
      );

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
          <InArticlePuff {...requiredProps} />
        </TrackingContextProvider>
      );

      fireEvent.click(getByRole('img'));

      expect(analyticsStream).toHaveBeenCalledTimes(1);
      expect(analyticsStream).toHaveBeenCalledWith({
        action: 'Clicked',
        component: 'ArticleSkeleton',
        object: 'InArticlePuff',
        attrs: {
          articleHeadline: 'articleHeadline',
          component_name: 'Where can I get a Covid vaccine in England?',
          component_type: 'in-article component : puff : interactive',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_browsing_method: 'click',
          event_navigation_name: 'button : image',
          section: 'section'
        }
      });
    });
  });
});
