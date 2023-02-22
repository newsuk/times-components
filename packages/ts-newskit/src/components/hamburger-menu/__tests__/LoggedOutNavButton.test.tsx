import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import LoggedOutNavButton from '../LoggedOutNavButton';

describe('LoggedOutNavButton', () => {
  it('should render the component', () => {
    const { asFragment } = render(
      <LoggedOutNavButton title="title" preset="buttonSolidPrimary" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the title passed as a prop', () => {
    const { getByText } = render(
      <LoggedOutNavButton title="Test title" preset="buttonSolidPrimary" />
    );
    expect(getByText('Test title')).toBeVisible();
  });
  it('should change the style based on the preset prop passed - Primary', () => {
    const { getByRole } = render(
      <LoggedOutNavButton title="title" preset="buttonSolidPrimary" />
    );
    expect(getByRole('button')).toHaveStyle(
      'background-color: rgba(21,115,162,1)'
    );
  });
  it('should change the style based on the preset prop passed - Secondary', () => {
    const { getByRole } = render(
      <LoggedOutNavButton title="title" preset="buttonSolidSecondary" />
    );
    expect(getByRole('button')).toHaveStyle(
      'background-color: rgba(29,29,27,1)'
    );
  });
});
