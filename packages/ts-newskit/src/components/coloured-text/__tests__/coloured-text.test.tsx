import React from 'react';
import { render, screen } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { ColouredText, TCThemeProvider } from '../../..';

const renderComponent = (color?: string) =>
  render(
    <TCThemeProvider>
      <ColouredText $color={color}>Test Text</ColouredText>
    </TCThemeProvider>,
  );

test('ColouredText renders without a colour applied', () => {
  renderComponent();
  const component = screen.getByText('Test Text');

  expect(component).not.toHaveStyle({
    color: 'rgb(1, 0, 13)',
  });
});

test('ColouredText renders with a colour applied', () => {
  renderComponent('inkContrast');
  const component = screen.getByText('Test Text');

  expect(component).toHaveStyle({
    color: 'rgb(1, 0, 13)',
  });
});
