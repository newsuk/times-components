import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '../../../../utils/test-utils';

import { UpdateButtonWithDelay } from '../update-button-with-delay';

const handleClickMock = jest.fn();

const renderComponent = (
  loading: boolean,
  delay: number,
  display: boolean,
  label: string,
  handleClick: any,
  arrowUp: boolean
) =>
  render(
    <UpdateButtonWithDelay
      loading={loading}
      delay={delay}
      display={display}
      label={label}
      handleClick={handleClick}
      arrowUp={arrowUp}
    />
  );

describe('Render UpdateButtonWithDelay', () => {
  it('should render the Update button component and the DelayComponent as expected', async () => {
    const { asFragment, getByRole, queryByTestId } = renderComponent(
      false,
      800,
      true,
      'New Updates',
      handleClickMock,
      true
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByRole('button')).toBeVisible();
    await waitFor(() => {
      expect(queryByTestId('button')).toBeFalsy();
    });
  });
});
