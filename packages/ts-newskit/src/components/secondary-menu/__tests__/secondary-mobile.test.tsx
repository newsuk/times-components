import React from 'react';
import { customRender } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavMobile } from '../mobile';
import { cleanup, fireEvent } from '@testing-library/react';

const handleSelect = jest.fn();
const setIsExpanded = jest.fn();

describe('Secondary Menu Mobile', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it('should render the snapshot when dropdown is not expanded', () => {
    const { asFragment } = customRender(
      <SecondaryNavMobile
        data={mainMenuItems}
        isExpanded={false}
        setIsExpanded={setIsExpanded}
        isSelected="Home"
        handleSelect={handleSelect}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the snapshot when dropdown is expanded', () => {
    const { asFragment } = customRender(
      <SecondaryNavMobile
        data={mainMenuItems}
        isExpanded={true}
        setIsExpanded={setIsExpanded}
        isSelected="Home"
        handleSelect={handleSelect}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should expand the dropdown when you click on it', () => {
    const { getByText, getByTestId } = customRender(
      <SecondaryNavMobile
        data={mainMenuItems}
        isExpanded={true}
        setIsExpanded={setIsExpanded}
        isSelected="Home"
        handleSelect={handleSelect}
      />
    );
    const Button = getByTestId('menu-sub-button');
    fireEvent.click(Button);
    expect(getByText('News')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });
  it('should close the dropdown when you click on it again', () => {
    const { queryByText, getByTestId } = customRender(
      <SecondaryNavMobile
        data={mainMenuItems}
        isExpanded={false}
        setIsExpanded={setIsExpanded}
        isSelected="Home"
        handleSelect={handleSelect}
      />
    );
    const Button = getByTestId('menu-sub-button');
    fireEvent.click(Button);
    expect(queryByText('News')).not.toBeInTheDocument();
    expect(queryByText('See all')).toBeInTheDocument();
  });
  it('should render Close button when dropdown is expanded', () => {
    const { getByText, getByTestId } = customRender(
      <SecondaryNavMobile
        data={mainMenuItems}
        isExpanded={true}
        setIsExpanded={setIsExpanded}
        isSelected="Home"
        handleSelect={handleSelect}
      />
    );
    const Button = getByTestId('menu-sub-button');
    fireEvent.click(Button);
    expect(getByText('Close')).toBeInTheDocument();
  });
  it('should render See all button when dropdown is not expanded', () => {
    const { queryByText, getByTestId } = customRender(
      <SecondaryNavMobile
        data={mainMenuItems}
        isExpanded={false}
        setIsExpanded={setIsExpanded}
        isSelected="Home"
        handleSelect={handleSelect}
      />
    );
    const Button = getByTestId('menu-sub-button');
    fireEvent.click(Button);
    expect(queryByText('See all')).toBeInTheDocument();
  });
});
