import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '../../../../utils/test-utils';

import { UpdateButton } from '../update-button';

const handleClickMock = jest.fn();

const renderComponent = (
  loading: boolean,
  label: string,
  handleClick: any,
  arrowUp: boolean
) =>
  render(
    <UpdateButton
      loading={loading}
      label={label}
      handleClick={handleClick}
      arrowUp={arrowUp}
    />
  );

describe('Render UpdateButton', () => {
  it('should render the component', () => {
    const { asFragment } = renderComponent(
      false,
      'New Updates',
      handleClickMock,
      true
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the loading spinner if loading is true', () => {
    const { asFragment } = renderComponent(
      true,
      'New Update',
      handleClickMock,
      true
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the label text you pass through', () => {
    const { getByText } = renderComponent(
      false,
      'Test New Updates',
      handleClickMock,
      true
    );
    expect(getByText('Test New Updates')).toBeVisible();
  });
  it('should trigger an event on click', () => {
    const { getByRole } = renderComponent(
      false,
      'New Update',
      handleClickMock,
      true
    );
    const Button = getByRole('button');
    fireEvent.click(Button);
    expect(handleClickMock).toHaveBeenCalled();
  });
  it('should render the upward facing arrow icon if arrowUp is true', () => {
    const { getByTestId } = renderComponent(
      false,
      'New Updates',
      handleClickMock,
      true
    );
    expect(getByTestId('upward-arrow')).toBeVisible();
  });
  it('should render the downward facing arrow icon if arrowUp is false', () => {
    const { getByTestId } = renderComponent(
      false,
      'New Updates',
      handleClickMock,
      false
    );
    expect(getByTestId('downward-arrow')).toBeVisible();
  });
});
