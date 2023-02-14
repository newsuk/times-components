import React from 'react';
import '@testing-library/jest-dom';
import { customRender } from './utils/test-utils';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('should render the component', () => {
    const { asFragment } = customRender(<SearchBar />)
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the placholder text', () => {
    const { getByPlaceholderText } = customRender(<SearchBar />)
    expect(getByPlaceholderText('Search times.co.uk')).toBeVisible();
  });
})