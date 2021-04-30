// MyComponent.stories.js

import React from 'react';
import { action } from '@storybook/addon-actions';
import trackScrolled from './trackScrolledIntoView';

export default {
  title: "'Typescript Component/View Count Wrapper'",
  component: trackScrolled
};
const Component = () => <div>Wrapped</div>;

const WrappedComponent = trackScrolled(Component, {
  trackingName: 'name',
  getAttrs: () => ({})
});
export const Basic = () => (
  <WrappedComponent analyticsStream={() => action('analytics-action')} />
);
