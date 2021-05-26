import { cleanup, fireEvent, render } from '@testing-library/react';
import { TrackingContextProvider } from '../TrackingContextProvider';
import React from 'react';
import mockDate from 'mockdate';

describe('<TrackingContextProvider>', () => {
  beforeEach(() => {
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    mockDate.reset();
    jest.clearAllMocks();
    cleanup();
  });

  it('multilevel nesting', async () => {
    const analyticsStream = jest.fn();
    const component = render(
      <TrackingContextProvider
        analyticsStream={analyticsStream}
        context={{
          component: 'component 1',
          object: 'object 1',
          attrs: { level1: '3', level2: '3', level3: '3' }
        }}
      >
        <TrackingContextProvider
          analyticsStream={analyticsStream}
          context={{ object: 'object 2', attrs: { level1: '2', level2: '2' } }}
        >
          <TrackingContextProvider
            analyticsStream={analyticsStream}
            context={{ action: 'action 3', attrs: { level1: '1' } }}
          >
            {({ fireAnalyticsEvent }) => (
              <button onClick={() => fireAnalyticsEvent({})}>button</button>
            )}
          </TrackingContextProvider>
        </TrackingContextProvider>
      </TrackingContextProvider>
    );

    const button = component.queryByText('button');
    fireEvent.click(button!);
    expect(analyticsStream).toBeCalledWith({
      action: 'action 3',
      component: 'component 1',
      object: 'object 2',
      attrs: {
        eventTime: '2021-05-03T00:00:00.000Z',
        level1: '1',
        level2: '2',
        level3: '3'
      }
    });
  });
});
