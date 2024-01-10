import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

import { SectionHeader } from '../index';

describe('Section Header', () => {
  it('should render News Section Header', () => {
    const { asFragment } = render(<SectionHeader>News</SectionHeader>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Section Header text correctly', () => {
    const { getByText } = render(<SectionHeader>Business</SectionHeader>);
    expect(getByText('Business')).toBeVisible();
  });
});
