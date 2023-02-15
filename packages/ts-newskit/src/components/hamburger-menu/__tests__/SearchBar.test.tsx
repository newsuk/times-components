import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('should render the component', () => {
    const { asFragment } = render(<SearchBar />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the placholder text', () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    expect(getByPlaceholderText('Search times.co.uk')).toBeVisible();
  });
});
