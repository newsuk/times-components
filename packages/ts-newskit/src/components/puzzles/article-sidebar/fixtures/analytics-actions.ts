import { action } from '@storybook/addon-actions';

export default (event: any | any[]) => {
  // tslint:disable-next-line:no-console
  console.log('analytics-event', event);
  action('analytics-event')(event);
};
