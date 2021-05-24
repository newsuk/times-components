import React from 'react';

import { showcaseConverter } from '@times-components/storybook';

import { action } from '@storybook/addon-actions';

import { TrackingContextProvider } from './TrackingContextProvider';

const analyticsStream = (event: any) => {
  // tslint:disable-next-line:no-console
  console.log('analytics-action', event);
  action('analytics-action')(event);
};

const showcase = {
  children: [
    {
      component: () => {
        return (
          <TrackingContextProvider
            context={{
              articleHeadline: 'articleHeadline',
              section: 'section'
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
                    subsection: 'nested'
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
      name: 'Basic',
      platform: 'web',
      type: 'story'
    }
  ],
  name: 'Typescript Component/Tracking Context Provider'
};

// @ts-ignore
showcaseConverter(module, showcase);
