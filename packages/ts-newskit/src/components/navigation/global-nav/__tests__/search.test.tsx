import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import NavSearch from '../search/search';
import { handleSearchSubmit } from '../search/handleSearchSubmit';

jest.mock('../search/handleSearchSubmit', () => ({
  handleSearchSubmit: jest.fn()
}));

describe('Search', () => {
  it('should update onChange', async () => {
    render(<NavSearch />);
    const searchField: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(searchField, { target: { value: 'test' } });

    expect(searchField.getAttribute('value')).toBe('test');
  });

  it('should trigger `handleSearchSubmit` onSubmit [DESKTOP]', async () => {
    render(<NavSearch />);
    handleSearchSubmit('desktop', 'Search');

    const searchForm = screen.getByRole('search');
    const searchField = screen.getByPlaceholderText('Search times.co.uk');

    fireEvent.change(searchField, {
      target: { value: 'Test Value' }
    });

    await fireEvent.submit(searchForm);

    expect(handleSearchSubmit).toHaveBeenCalled();
    expect(handleSearchSubmit).toHaveBeenCalledWith('desktop', 'Test Value');
  });

  it('should trigger `handleSearchSubmit` onSubmit [MOBILE]', async () => {
    render(<NavSearch isHamburger />);

    const searchForm = screen.getByRole('search');
    const searchField = screen.getByPlaceholderText('Search times.co.uk');

    fireEvent.change(searchField, {
      target: { value: 'Test Value' }
    });

    await fireEvent.submit(searchForm);

    expect(handleSearchSubmit).toHaveBeenCalled();
    expect(handleSearchSubmit).toHaveBeenCalledWith('mobile', 'Test Value');
  });
});
