import React from 'react';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
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

  it('should render snapshot', async () => {
    const initialStateForFirstUseStateCall = mainMenuItems.length - 2;
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
      render(<CreateMenu data={mainMenuItems} options={options} />)
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('callback is invoked after window resize event', async () => {
    const initialStateForFirstUseStateCall = mainMenuItems.length;
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
      render(<CreateMenu data={mainMenuItems} options={options} />)
    );
  });
  it('should expand on click', async () => {
    const initialStateForFirstUseStateCall = mainMenuItems.length - 2;
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
      render(<CreateMenu data={mainMenuItems} options={options} />)
    );

    const buttonText = await findByTestId('menu-sub-button');
    expect(buttonText).toHaveTextContent('More');
    fireEvent.click(buttonText);
    expect(options.setIsExpanded).toHaveBeenCalled();
  });
  it('should render test Less', async () => {
    const initialStateForFirstUseStateCall = mainMenuItems.length - 2;
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
          data={mainMenuItems}
          options={{ ...options, isExpanded: true }}
        />
      )
    );

    const buttonText = await findByTestId('menu-sub-button');
    expect(buttonText).toHaveTextContent('Less');
  });
});
