import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';

import { TopNav } from '../topnav';
import NavSearch from '../search';

const renderComponent = (isLoggedIn?: boolean) =>
  render(<TopNav isLoggedIn={isLoggedIn} />);

describe('Render TopNav', () => {
  it('should render the component in loggedIn state', () => {
    const { asFragment } = renderComponent(true);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component in loggedOut state', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('TopNav button functions', () => {
  it('should trigger function when hamburger icon clicked', async () => {
    renderComponent();
    const hamburgerBtn = screen.getByRole('button', { name: 'Open Menu' });

    expect(hamburgerBtn).toBeVisible();

    fireEvent.click(hamburgerBtn);
    expect(hamburgerBtn.getAttribute('aria-label')).toEqual('Close Menu');
  });

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

  it('should clear value when button is clicked', async () => {
    render(<NavSearch />);
    const searchField: HTMLInputElement = screen.getByRole('textbox');
    const searchClearBtn = screen.getByRole('button');
    fireEvent.change(searchField, { target: { value: 'test' } });

    fireEvent.click(searchClearBtn);
    const updatedSearchField: HTMLInputElement = screen.getByRole('textbox');

    expect(updatedSearchField.value).toBe('');
  });
});
