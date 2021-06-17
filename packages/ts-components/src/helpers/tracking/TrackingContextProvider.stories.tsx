import React from 'react';

import { showcaseConverter } from '@times-components/storybook';

import { TrackingContextProvider } from './TrackingContextProvider';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

const showcase = {
  children: [
    {
      component: () => {
        return (
          <TrackingContextProvider
            context={{
              attrs: {
                articleHeadline: 'articleHeadline',
                section: 'section'
              }
            }}
            analyticsStream={analyticsStream}
          >
            {({ fireAnalyticsEvent }) => (
              <div>
                <div>
                  <button
                    onClick={() =>
                      fireAnalyticsEvent({
                        component: 'button 1',
                        action: 'click'
                      })
                    }
                  >
                    Click
                  </button>
                </div>
                <TrackingContextProvider
                  context={{
                    attrs: { subsection: 'nested' }
                  }}
                  analyticsStream={analyticsStream}
                >
                  {({ fireAnalyticsEvent: fireNestedAnalyticsEvent }) => (
                    <button
                      onClick={() =>
                        fireNestedAnalyticsEvent({
                          component: 'button nested',
                          action: 'click'
                        })
                      }
                    >
                      Nested Click
                    </button>
                  )}
                </TrackingContextProvider>
              </div>
            )}
          </TrackingContextProvider>
        );
      },
      name: 'Tracking Context Provider',
      platform: 'web',
      type: 'story'
    }
  ],
  name: 'Typescript Component/Helpers'
};

showcaseConverter(module, showcase);
