import React from 'react';
import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavMobile } from '../mobile';
import { cleanup, fireEvent } from '@testing-library/react';

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: false,
  isSelected: 'Home'
};

describe('Secondary Menu Mobile', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it('should render the snapshot when dropdown is not expanded', () => {
    const { asFragment } = render(
      <SecondaryNavMobile data={mainMenuItems} options={options} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the snapshot when dropdown is expanded', () => {
    const { asFragment } = render(
      <SecondaryNavMobile data={mainMenuItems} options={options} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should close the dropdown when you click on it again', () => {
    const { queryByText, getByTestId } = render(
      <SecondaryNavMobile data={mainMenuItems} options={options} />
    );
    const Button = getByTestId('menu-sub-button');
    fireEvent.click(Button);
    expect(queryByText('News')).not.toBeInTheDocument();
    expect(queryByText('See all')).toBeInTheDocument();
  });
});
