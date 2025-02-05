import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CollapseIcon } from '../CollapseIcon';

jest.mock('../styles', () => ({
  Row: ({ children }: any) => <div data-testid="row">{children}</div>,
  CollapseButton: ({ children, ...props }: any) => (
    <button data-testid="collapse-button" {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@times-components/icons', () => ({
  PlayerModalIcon: () => <svg data-testid="player-modal-icon" />,
}));

describe('CollapseIcon', () => {
  const mockToggleExpand = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('does not render when allowExpandCollapse is false', () => {
    const { queryByTestId } = render(
      <CollapseIcon
        isExpanded={true}
        toggleExpand={mockToggleExpand}
        allowExpandCollapse={false}
      />
    );

    expect(queryByTestId('row')).not.toBeInTheDocument();
    expect(queryByTestId('collapse-button')).not.toBeInTheDocument();
    expect(queryByTestId('player-modal-icon')).not.toBeInTheDocument();
  });

  test('renders correctly when allowExpandCollapse is true and isExpanded is true', () => {
    const { getByTestId } = render(
      <CollapseIcon
        isExpanded={true}
        toggleExpand={mockToggleExpand}
        allowExpandCollapse={true}
      />
    );

    expect(getByTestId('row')).toBeInTheDocument();
    expect(getByTestId('collapse-button')).toBeInTheDocument();
    expect(getByTestId('player-modal-icon')).toBeInTheDocument();
    expect(getByTestId('collapse-button')).toHaveAttribute(
      'aria-label',
      'Collapse Player'
    );
  });

  test('renders correctly when allowExpandCollapse is true and isExpanded is false', () => {
    const { getByTestId } = render(
      <CollapseIcon
        isExpanded={false}
        toggleExpand={mockToggleExpand}
        allowExpandCollapse={true}
      />
    );

    expect(getByTestId('row')).toBeInTheDocument();
    expect(getByTestId('collapse-button')).toBeInTheDocument();
    expect(getByTestId('player-modal-icon')).toBeInTheDocument();
    expect(getByTestId('collapse-button')).toHaveAttribute(
      'aria-label',
      'Expand Player'
    );
  });

  test('calls toggleExpand when button is clicked', () => {
    const { getByTestId } = render(
      <CollapseIcon
        isExpanded={true}
        toggleExpand={mockToggleExpand}
        allowExpandCollapse={true}
      />
    );

    const button = getByTestId('collapse-button');
    fireEvent.click(button);
    expect(mockToggleExpand).toHaveBeenCalledTimes(1);
  });
});
