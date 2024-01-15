import React from 'react';
import { render, screen, fireEvent } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import data from '../fixtures/data.json';
import {
  GlobalNav,
  GlobalNavWithCustomDrawer,
  TSNewskitDrawer
} from '../index';

const mockClickHandler = jest.fn();
const mockOnClick = jest.fn();

const renderComponent = (isLoggedIn?: boolean) =>
  render(
    <GlobalNav
      {...{ isLoggedIn, data }}
      clickHandler={mockClickHandler}
      onClick={mockOnClick}
    />
  );

describe('Render GlobalNav', () => {
  it('should render the component in loggedIn state', () => {
    const { asFragment } = renderComponent(true);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component in loggedOut state', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should triger onClick event', () => {
    renderComponent();
    const hamburgerBtn = screen.getByRole('button', { name: 'Open Menu' });

    fireEvent.click(hamburgerBtn);
    expect(mockOnClick).toBeCalled();
  });
});

describe('Hamburger toggle', () => {
  it('should trigger function when hamburger icon clicked', async () => {
    renderComponent();
    const hamburgerBtn = screen.getByRole('button', { name: 'Open Menu' });

    expect(hamburgerBtn).toBeVisible();

    fireEvent.click(hamburgerBtn);
    expect(hamburgerBtn.getAttribute('aria-label')).toEqual('Close Menu');
  });

  it('should close HamburgerMenu when overlay is clicked', async () => {
    renderComponent();
    const hamburgerBtn = screen.getByRole('button', { name: 'Open Menu' });

    fireEvent.click(hamburgerBtn);

    const hamburgerOverlay = screen.getByTestId('overlay');
    fireEvent.click(hamburgerOverlay);

    expect(hamburgerBtn.getAttribute('aria-label')).toEqual('Open Menu');
  });
});

describe('GlobalNavWithCustomDrawer', () => {
  it('renders', () => {
    const { asFragment } = render(
      <GlobalNavWithCustomDrawer
        data={data}
        isLoggedIn={false}
        isSunday={false}
        clickHandler={mockClickHandler}
        onClick={mockOnClick}
      />
    );
    expect(asFragment()).toBeTruthy();
  });

  it('matches snapshot when logged in', () => {
    const { asFragment } = render(
      <GlobalNavWithCustomDrawer
        data={data}
        isLoggedIn={true}
        isSunday={false}
        clickHandler={mockClickHandler}
        onClick={mockOnClick}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when logged out', () => {
    const { asFragment } = render(
      <GlobalNavWithCustomDrawer
        data={data}
        isSunday={false}
        clickHandler={mockClickHandler}
        onClick={mockOnClick}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should triger onClick event', () => {
    render(
      <GlobalNavWithCustomDrawer
        data={data}
        isSunday={false}
        clickHandler={mockClickHandler}
        onClick={mockOnClick}
      />
    );
    const hamburgerBtn = screen.getByRole('button', { name: 'Open Menu' });

    fireEvent.click(hamburgerBtn);
    expect(mockOnClick).toBeCalled();
  });
});

describe('TSNewskitDrawer', () => {
  it('renders', () => {
    const { asFragment } = render(
      <TSNewskitDrawer
        open={true}
        onDismiss={() => {
          '';
        }}
      >
        <div>hi</div>
      </TSNewskitDrawer>
    );
    expect(asFragment()).toBeTruthy();
  });
});
