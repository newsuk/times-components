import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '../../../../utils/test-utils';

import { UpdateButton } from '../update-button';

const handleClickMock = jest.fn();

const renderComponent = (
  label: string,
  handleClick: any,
) =>
  render(
    <UpdateButton
      label={label}
      handleClick={handleClick}
    />
  );

describe('Render UpdateButton', () => {
  it('should render the component', () => {
    const { asFragment } = renderComponent(
      'New Updates',
      handleClickMock,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the loading spinner if loading is true', () => {
    const { asFragment } = renderComponent(
      'New Update',
      handleClickMock,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the label text you pass through', () => {
    const { getByText } = renderComponent(
      'Test New Updates',
      handleClickMock,
    );
    expect(getByText('Test New Updates')).toBeVisible();
  });
  it('should trigger an event on click', () => {
    const { getByRole } = renderComponent(
      'New Update',
      handleClickMock,
    );
    const Button = getByRole('button');
    fireEvent.click(Button);
    expect(handleClickMock).toHaveBeenCalled();
  });
  it('should render the upward facing arrow icon', () => {
    const { getByTestId } = renderComponent(
      'New Updates',
      handleClickMock,
    );
    expect(getByTestId('upward-arrow')).toBeVisible();
  });
});
