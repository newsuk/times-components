import React from 'react';
import { render, screen } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavMobile } from '../mobile';
import { cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'newskit';
import { TimesWebLightSportTheme } from '../../../..';

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: false,
  isSelected: 'Home'
};

const mockClickHandler = jest.fn();

describe('Secondary Menu Mobile', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it('should render the snapshot when dropdown is not expanded', () => {
    const { asFragment, getByText } = render(
      <SecondaryNavMobile
        data={mainMenuItems}
        title=""
        options={options}
        clickHandler={mockClickHandler}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('See all')).not.toHaveStyle({
      color: 'rgb(255, 255, 255)'
    });
  });
  it('should render the correct title', () => {
    const { getByText } = render(
      <SecondaryNavMobile
        data={mainMenuItems}
        title="Sport"
        options={options}
        clickHandler={mockClickHandler}
      />
    );
    expect(getByText('See all Sport')).toBeInTheDocument();
  });
  it('should render the correct white text if theme color applied', () => {
    const { getByText } = render(
      <ThemeProvider theme={TimesWebLightSportTheme}>
        <SecondaryNavMobile
          data={mainMenuItems}
          title=""
          options={options}
          clickHandler={mockClickHandler}
        />
      </ThemeProvider>
    );
    expect(getByText('See all')).toHaveStyle({
      color: 'rgb(255, 255, 255)'
    });
  });

  it('should render the snapshot when dropdown is expanded', () => {
    const { asFragment } = render(
      <SecondaryNavMobile
        data={mainMenuItems}
        title=""
        options={{ ...options, isExpanded: true }}
        clickHandler={mockClickHandler}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    const Button = screen.getByTestId('menu-sub-button');
    expect(Button).toHaveAttribute('aria-label', 'Collapse Secondary Menu');
  });
  it('should close the dropdown when you click on it again', async () => {
    const onClickMock = jest.fn();
    render(
      <SecondaryNavMobile
        data={mainMenuItems}
        title=""
        options={options}
        clickHandler={mockClickHandler}
        onClick={onClickMock}
      />
    );
    const Button = screen.getByTestId('menu-sub-button');
    expect(Button).toHaveAttribute('aria-label', 'Expand Secondary Menu');
    await fireEvent.click(Button);
    expect(screen.queryByText('News')).not.toBeInTheDocument();
    expect(onClickMock).toHaveBeenCalled();
  });
});
