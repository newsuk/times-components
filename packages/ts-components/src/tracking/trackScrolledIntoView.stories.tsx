import React, { forwardRef } from 'react';

import { showcaseConverter } from '@times-components/storybook';

import { action } from '@storybook/addon-actions';

import trackScrolled from './trackScrolledIntoView';

import styled from 'styled-components';

const ComponentWrapper = styled.div`
  align-items: center;
  background: #aaa;
  border: solid 5px #555;
  display: flex;
  height: 200px;
  justify-content: center;
  width: 200px;
`;

const StrippedContainer = styled.div`
  background: linear-gradient(#f4f4f4, #f4f4f4 50%, #eee 50%, #eee);
  background-size: 100% 20px;
  border: 30px solid #f4f4f4;
  height: 50vh;
  &.full {
    height: 100vh;
  }
`;

const Component = forwardRef<HTMLDivElement, {}>(({}, ref) => {
  return (
    <ComponentWrapper ref={ref} style={{}}>
      Wrapped
    </ComponentWrapper>
  );
});

const WrappedComponent = trackScrolled(Component, {
  trackingName: 'name',
  getAttrs: () => ({})
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
              <StrippedContainer className={height} />
              <WrappedComponent
                analyticsStream={event => {
                  // tslint:disable-next-line:no-console
                  console.log('analytics-action', event);
                  action('analytics-action')(event);
                }}
              />
              <StrippedContainer className={height} />
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
