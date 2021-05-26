import React from 'react';

import { showcaseConverter } from '@times-components/storybook';

import { action } from '@storybook/addon-actions';

import styled from 'styled-components';
import { TrackScrolledIntoView } from './TrackScrolledIntoView';
import { TrackingContextProvider } from './TrackingContextProvider';

const Component = styled.div`
  align-items: center;
  background: #aaa;
  border: solid 5px #555;
  display: flex;
  height: 200px;
  justify-content: center;
  width: 200px;
`;

const StripedContainer = styled.div`
  background: linear-gradient(#f4f4f4, #f4f4f4 50%, #eee 50%, #eee);
  background-size: 100% 20px;
  border: 30px solid #f4f4f4;
  height: 50vh;
  &.full {
    height: 100vh;
  }
`;

const analyticsStream = (event: any) => {
  // tslint:disable-next-line:no-console
  console.log('analytics-action', event);
  action('analytics-action')(event);
};

const scrollEvent = ({ headline }: any) => ({
  attrs: {
    component_name: `${headline}`,
    component_type: 'interactive',
    event_navigation_action: 'navigation',
    event_navigation_name: 'in article puff cta clicked',
    event_navigation_browsing_method: 'click'
  }
});

const showcase = {
  children: [
    {
      component: ({ boolean: bool, select }: any) => {
        const show = bool('show', true);
        const height = select(
          'Content size above component',
          {
            'Half Viewport': 'half',
            'Full Viewport': 'full'
          },
          'half'
        );
        return (
          show && (
            <>
              <TrackingContextProvider
                context={{
                  attrs: {
                    articleHeadline: 'articleHeadline',
                    section: 'section'
                  }
                }}
                analyticsStream={analyticsStream}
              >
                <StripedContainer className={height} />
                <TrackScrolledIntoView
                  analyticsEvent={scrollEvent({
                    headline: 'headline1'
                  })}
                >
                  {({ intersectObserverRef }) => (
                    <Component ref={intersectObserverRef}>Wrapped 1</Component>
                  )}
                </TrackScrolledIntoView>
                <StripedContainer className={height} />
                <TrackingContextProvider
                  context={{
                    attrs: { section: 'a different section' }
                  }}
                >
                  <TrackScrolledIntoView
                    analyticsEvent={scrollEvent({
                      headline: 'headline2'
                    })}
                  >
                    {({ intersectObserverRef }) => (
                      <Component ref={intersectObserverRef}>
                        Wrapped 2
                      </Component>
                    )}
                  </TrackScrolledIntoView>
                </TrackingContextProvider>
                <StripedContainer className={height} />
              </TrackingContextProvider>
            </>
          )
        );
      },
      name: 'Basic',
      platform: 'web',
      type: 'story'
    }
  ],
  name: 'Typescript Component/Track Scrolled into View'
};

// @ts-ignore
showcaseConverter(module, showcase);
