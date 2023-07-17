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
  arrowUp: boolean,
  updatedTime: string,
  articleId: string
) =>
  render(
    <UpdateButtonWithDelay
      loading={loading}
      delay={delay}
      display={display}
      label={label}
      handleClick={handleClick}
      arrowUp={arrowUp}
      updatedTime={updatedTime}
      articleId={articleId}
    />
  );

describe('Render UpdateButtonWithDelay', () => {
  it.skip('should render the Update button component and the DelayComponent as expected', async () => {
    const { asFragment, getByRole, queryByTestId } = renderComponent(
      false,
      800,
      true,
      'New Updates',
      handleClickMock,
      true,
      '2023-10-12T00:00:00.000Z',
      '12345'
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByRole('button')).toBeVisible();
    await waitFor(() => {
      expect(queryByTestId('button')).toBeFalsy();
    });
  });
});
