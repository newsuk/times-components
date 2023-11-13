import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/new-menu-items.json';
import { cleanup, waitFor, fireEvent } from '@testing-library/react';
import { CreateMenu } from '../desktop/create-menu';

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: false,
  isSelected: 'Home'
};

describe('Create Menu', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    cleanup();
  });

  const mockClickHandler = jest.fn();

  it('should render snapshot', async () => {
    const initialStateForFirstUseStateCall = mainMenuItems.L2NavItems.length - 2;
    const initialStateForSecondUseStateCall = 2;

    await waitFor(
      () =>
        (React.useState = jest
          .fn()
          .mockReturnValueOnce([initialStateForFirstUseStateCall, () => null])
          .mockReturnValueOnce([initialStateForSecondUseStateCall, () => null])
          .mockImplementation(x => [x, () => null]))
    );
    const { asFragment } = await waitFor(() =>
      render(
        <CreateMenu
          data={mainMenuItems.L2NavItems}
          options={options}
          clickHandler={mockClickHandler}
        />
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('callback is invoked after window resize event', async () => {
    const initialStateForFirstUseStateCall = mainMenuItems.L2NavItems.length;
    const initialStateForSecondUseStateCall = 1;

    await waitFor(
      () =>
        (React.useState = jest
          .fn()
          .mockReturnValueOnce([initialStateForFirstUseStateCall, () => null])
          .mockReturnValueOnce([initialStateForSecondUseStateCall, () => null])
          .mockImplementation(x => [x, () => null]))
    );
    await waitFor(() =>
      render(
        <CreateMenu
          data={mainMenuItems.L2NavItems}
          options={options}
          clickHandler={mockClickHandler}
        />
      )
    );
  });
  it('should expand on click', async () => {
    const initialStateForFirstUseStateCall = mainMenuItems.L2NavItems.length - 2;
    const initialStateForSecondUseStateCall = 2;

    await waitFor(
      () =>
        (React.useState = jest
          .fn()
          .mockReturnValueOnce([initialStateForFirstUseStateCall, () => null])
          .mockReturnValueOnce([initialStateForSecondUseStateCall, () => null])
          .mockImplementation(x => [x, () => null]))
    );
    const { findByTestId } = await waitFor(() =>
      render(
        <CreateMenu
          data={mainMenuItems.L2NavItems}
          options={options}
          clickHandler={mockClickHandler}
        />
      )
    );

    const buttonText = await findByTestId('menu-sub-button');
    expect(buttonText).toHaveTextContent('More');
    fireEvent.click(buttonText);
    expect(options.setIsExpanded).toHaveBeenCalled();
  });
  it('should render test Less', async () => {
    const initialStateForFirstUseStateCall = mainMenuItems.L2NavItems.length - 2;
    const initialStateForSecondUseStateCall = 2;

    await waitFor(
      () =>
        (React.useState = jest
          .fn()
          .mockReturnValueOnce([initialStateForFirstUseStateCall, () => null])
          .mockReturnValueOnce([initialStateForSecondUseStateCall, () => null])
          .mockImplementation(x => [x, () => null]))
    );
    const { findByTestId } = await waitFor(() =>
      render(
        <CreateMenu
          data={mainMenuItems.L2NavItems}
          options={{ ...options, isExpanded: true }}
          clickHandler={mockClickHandler}
        />
      )
    );

    const buttonText = await findByTestId('menu-sub-button');
    expect(buttonText).toHaveTextContent('Less');
  });
});
