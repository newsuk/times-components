import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { TopNav } from '../topnav';
import NavSearch from '../../search';
import data from '../../fixtures/data.json';

const renderComponent = (isLoggedIn?: boolean, isSunday?: boolean) =>
  render(
    <TopNav
      isLoggedIn={isLoggedIn}
      isSunday={isSunday}
      mainMenu={data.mainMenuItems}
      accountMenu={data.accountMenuItems}
      isHamburgerOpen={false}
      toggleHamburger={jest.fn}
    />
  );

describe('Render TopNav', () => {
  it('should render the component in loggedIn state', () => {
    const { asFragment } = renderComponent(true);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component in loggedOut state', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component with Sunday Times Logo', () => {
    const { asFragment } = renderComponent(true, true);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('TopNav button functions', () => {
  it('should trigger function when search icon clicked', async () => {
    renderComponent();
    const searchBtn = screen.getByRole('button', {
      name: 'Open Search',
      hidden: true
    });

    fireEvent.click(searchBtn);
    expect(searchBtn.getAttribute('aria-label')).toEqual('Close Search');
  });
});

describe('Search field', () => {
  it('should update onChange', async () => {
    render(<NavSearch />);
    const searchField: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(searchField, { target: { value: 'test' } });

    expect(searchField.getAttribute('value')).toBe('test');
  });
});
