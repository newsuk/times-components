import React from 'react';
import '@testing-library/jest-dom';
import { customRender } from './utils/test-utils';
import { fireEvent } from '@testing-library/react';
import NavItems from '../NavItems';
import testData from './fixtures/test-data.json';

const onExpand = jest.fn();

describe('NavItems', () => {
  it('renders the component with nested items', () => {
    const { asFragment } = customRender(<NavItems data={testData.mainMenuItems} expandedL1="News" onExpand={onExpand}/>)
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the component without nested items', () => {
    const { asFragment } = customRender(<NavItems data={testData.accountMenuItems} onExpand={onExpand}/>)
    expect(asFragment()).toMatchSnapshot();
  });
  it('shows the list of L2s when expanded is true', () => {
    const { getByText } = customRender(<NavItems data={testData.mainMenuItems} expandedL1="main-menu-2" onExpand={onExpand}/>)
    expect(getByText('Item 1')).toBeVisible();
    expect(getByText('Item 2')).toBeVisible();
  });
  it('does not show the list of L2s when expanded is false', () => {
    const { getByText } = customRender(<NavItems data={testData.mainMenuItems} expandedL1="not-an-item" onExpand={onExpand}/>)
    expect(getByText('Item 1')).not.toBeVisible();
    expect(getByText('Item 2')).not.toBeVisible();
  });
  it('calls onExpand when you click on an L1 with sub items', () => {
    const { getByTestId } = customRender(<NavItems data={testData.mainMenuItems} expandedL1="main-menu-2" onExpand={onExpand}/>)
    const Button = getByTestId('menu-sub-button')
    fireEvent.click(Button);
    expect(onExpand).toHaveBeenCalled();
  })
})