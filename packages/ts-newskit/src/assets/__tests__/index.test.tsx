import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import * as icons from '../index';

describe('Icons', () => {
  Object.keys(icons).forEach(componentName => {
    // @ts-ignore
    const Component = icons[componentName];

    describe(`Component: ${componentName}`, () => {
      test(`${componentName} renders with default props`, () => {
        const { asFragment } = render(<Component />);
        expect(asFragment()).toMatchSnapshot();
      });
    });
  });
});
