import React from 'react';
import { renderComponent } from '../../../../utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
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
    const { asFragment } = await waitFor(() =>
      renderComponent(
        <CreateMenu
          data={mainMenuItems}
          options={options}
          clickHandler={mockClickHandler}
        />,
        'xl'
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should expand on click', async () => {
    const { findByTestId } = await waitFor(() =>
      renderComponent(
        <CreateMenu
          data={mainMenuItems}
          options={options}
          clickHandler={mockClickHandler}
        />,
        'xl'
      )
    );

    const buttonText = await findByTestId('menu-sub-button');
    expect(buttonText).toHaveTextContent('More');
    fireEvent.click(buttonText);
    expect(options.setIsExpanded).toHaveBeenCalled();
  });

  it('should render test Less', async () => {
    const { findByTestId } = await waitFor(() =>
      renderComponent(
        <CreateMenu
          data={mainMenuItems}
          options={{ ...options, isExpanded: true }}
          clickHandler={mockClickHandler}
        />,
        'xl'
      )
    );

    const buttonText = await findByTestId('menu-sub-button');
    expect(buttonText).toHaveTextContent('Less');
  });
});
