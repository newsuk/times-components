import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../../utils/test-utils';
import { fireEvent } from '@testing-library/react';
import NavigationList from '../NavigationList';
import testData from '../../__tests__/fixtures/test-data.json';

const onExpand = jest.fn();
const mockClickHandler = jest.fn();

describe('NavigationList', () => {
  it('renders the component with nested items', () => {
    const { asFragment } = render(
      <NavigationList
        data={testData.mainMenuItems}
        expandedL1="News"
        onExpand={onExpand}
        clickHandler={mockClickHandler}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the component without nested items', () => {
    const { asFragment } = render(
      <NavigationList
        data={testData.accountMenuItems}
        onExpand={onExpand}
        clickHandler={mockClickHandler}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('shows the list of L2s when expanded is true', () => {
    const { getByText } = render(
      <NavigationList
        data={testData.mainMenuItems}
        expandedL1="main-menu-2"
        onExpand={onExpand}
        clickHandler={mockClickHandler}
      />
    );
    expect(getByText('Item 1')).toBeVisible();
    expect(getByText('Item 2')).toBeVisible();
  });
  it('does not show the list of L2s when expanded is false', () => {
    const { getByText } = render(
      <NavigationList
        data={testData.mainMenuItems}
        expandedL1="not-an-item"
        onExpand={onExpand}
        clickHandler={mockClickHandler}
      />
    );
    expect(getByText('Item 1')).not.toBeVisible();
    expect(getByText('Item 2')).not.toBeVisible();
  });
  it('calls onExpand when you click on an L1 with sub items', () => {
    const { getAllByTestId } = render(
      <NavigationList
        data={testData.mainMenuItems}
        expandedL1="main-menu-2"
        onExpand={onExpand}
        clickHandler={mockClickHandler}
      />
    );
    const Button = getAllByTestId('menu-sub-button')[0];
    fireEvent.click(Button);
    expect(onExpand).toHaveBeenCalled();
  });

  it('calls clickHandler when you click on an L2 item', () => {
    const { getByText } = render(
      <NavigationList
        data={testData.mainMenuItems}
        expandedL1="main-menu-2"
        onExpand={onExpand}
        clickHandler={mockClickHandler}
      />
    );
    const L2Item = getByText('Item 1');
    fireEvent.click(L2Item);
    expect(mockClickHandler).toHaveBeenCalledWith('Item 1');
  });
});
