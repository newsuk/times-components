import React from 'react';

import { cleanup, render } from '@testing-library/react';
import { TrackScrolledIntoView } from '../TrackScrolledIntoView';
import FakeIntersectionObserver from '../../../test-utils/FakeIntersectionObserver';
import { TrackingContextProvider } from '../TrackingContextProvider';

describe('trackScrolledIntoView', () => {
  let oldIntersectionObserver: typeof IntersectionObserver;
  beforeEach(() => {
    oldIntersectionObserver = window.IntersectionObserver;

    // @ts-ignore
    window.IntersectionObserver = FakeIntersectionObserver;
  });

  afterEach(() => {
    window.IntersectionObserver = oldIntersectionObserver;
    cleanup();
  });

  it('renders the component', () => {
    const analyticsStream = jest.fn() as any;
    const { baseElement } = render(
      <TrackingContextProvider context={{ analyticsStream }}>
        <TrackScrolledIntoView analyticsEvent={{ action: 'viewed' }}>
          {({ intersectObserverRef }) => (
            <div ref={intersectObserverRef}>content </div>
          )}
        </TrackScrolledIntoView>
      </TrackingContextProvider>
    );

    expect(baseElement).toMatchSnapshot();
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
      component: 'my comp'
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
