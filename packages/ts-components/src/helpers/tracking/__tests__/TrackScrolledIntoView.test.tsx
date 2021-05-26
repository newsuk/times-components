import React from 'react';

import { cleanup, render } from '@testing-library/react';
import { TrackScrolledIntoView } from '../TrackScrolledIntoView';
import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';
import { TrackingContextProvider } from '../TrackingContextProvider';
import mockDate from 'mockdate';

describe('trackScrolledIntoView', () => {
  beforeEach(() => {
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
    cleanup();
  });

  it('renders the component', () => {
    const { baseElement } = render(
      <TrackingContextProvider context={{ object: 'abc' }}>
        <TrackScrolledIntoView analyticsEvent={{ action: 'viewed' }}>
          {({ intersectObserverRef }) => (
            <div ref={intersectObserverRef}>content </div>
          )}
        </TrackScrolledIntoView>
      </TrackingContextProvider>
    );

    expect(baseElement).toMatchSnapshot();
  });

  describe('intersection observer tests', () => {
    let oldIntersectionObserver: typeof IntersectionObserver;
    beforeEach(() => {
      mockDate.set(1620000000000);
      oldIntersectionObserver = window.IntersectionObserver;

      // @ts-ignore
      window.IntersectionObserver = FakeIntersectionObserver;
    });

    afterEach(() => {
      mockDate.reset();
      window.IntersectionObserver = oldIntersectionObserver;
      jest.clearAllMocks();
      cleanup();
    });
    it('analytics called when viewed', () => {
      const analyticsStream = jest.fn();
      render(
        <TrackingContextProvider
          analyticsStream={analyticsStream}
          context={{ component: 'my comp' }}
        >
          <TrackScrolledIntoView analyticsEvent={{ action: 'viewed' }}>
            {({ intersectObserverRef }) => (
              <div ref={intersectObserverRef}>content</div>
            )}
          </TrackScrolledIntoView>
        </TrackingContextProvider>
      );

      FakeIntersectionObserver.intersect();

      expect(FakeIntersectionObserver.disconnect).toHaveBeenCalled();
      expect(analyticsStream).toHaveBeenCalledWith({
        action: 'viewed',
        component: 'my comp',
        attrs: {
          eventTime: '2021-05-03T00:00:00.000Z'
        }
      });
    });

    it('analytics not called if not viewed', () => {
      const analyticsStream = jest.fn();
      render(
        <TrackingContextProvider
          analyticsStream={analyticsStream}
          context={{ component: 'my comp' }}
        >
          <TrackScrolledIntoView analyticsEvent={{ action: 'viewed' }}>
            {({ intersectObserverRef }) => (
              <div ref={intersectObserverRef}>content </div>
            )}
          </TrackScrolledIntoView>
        </TrackingContextProvider>
      );
      expect(analyticsStream).not.toHaveBeenCalled();
    });

    it('No window', () => {
      const analyticsStream = jest.fn();
      // @ts-ignore
      window.IntersectionObserver = undefined;
      render(
        <TrackingContextProvider
          analyticsStream={analyticsStream}
          context={{ component: 'my comp' }}
        >
          <TrackScrolledIntoView analyticsEvent={{ action: 'viewed' }}>
            {({ intersectObserverRef }) => (
              <div ref={intersectObserverRef}>content </div>
            )}
          </TrackScrolledIntoView>
        </TrackingContextProvider>
      );
      expect(analyticsStream).not.toHaveBeenCalled();
    });
    it('not intersecting', () => {
      const analyticsStream = jest.fn();
      render(
        <TrackingContextProvider
          analyticsStream={analyticsStream}
          context={{ component: 'my comp' }}
        >
          <TrackScrolledIntoView analyticsEvent={{ action: 'viewed' }}>
            {({ intersectObserverRef }) => (
              <div ref={intersectObserverRef}>content </div>
            )}
          </TrackScrolledIntoView>
        </TrackingContextProvider>
      );

      FakeIntersectionObserver.intersect(false);
      expect(analyticsStream).not.toHaveBeenCalled();
    });
  });
});
