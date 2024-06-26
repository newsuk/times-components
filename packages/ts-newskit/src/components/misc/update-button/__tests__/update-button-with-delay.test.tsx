import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { UpdateButtonWithDelay } from '../update-button-with-delay';

const handleClickMock = jest.fn();

const renderComponent = (
  delay: number,
  display: boolean,
  label: string,
  handleClick: any,
  updatedTime: string,
  articleId: string,
  update: boolean
) =>
  render(
    <UpdateButtonWithDelay
      delay={delay}
      display={display}
      label={label}
      handleClick={handleClick}
      updatedTime={updatedTime}
      articleId={articleId}
      update={update}
    />
  );

describe('Render UpdateButtonWithDelay', () => {
  it('should render the Update button component and the DelayComponent as expected when it has an update', async () => {
    const { asFragment, getByRole, queryByTestId } = renderComponent(
      800,
      true,
      'New Updates',
      handleClickMock,
      '2023-10-12T00:00:00.000Z',
      '12345',
      true
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByRole('button')).toBeVisible();
    await waitFor(() => {
      expect(queryByTestId('button')).toBeFalsy();
    });
  });

  it('should not render the Update button component and the DelayComponent as expected when it has an update', async () => {
    const { unmount, queryByTestId } = renderComponent(
      500,
      true,
      'Update Now',
      handleClickMock,
      '2023-10-12T00:00:00.000Z',
      '12345',
      false
    );

    await waitFor(
      () => {
        expect(queryByTestId('button')).toBeNull();
      },
      { timeout: 500 }
    );

    unmount();
  });
});
