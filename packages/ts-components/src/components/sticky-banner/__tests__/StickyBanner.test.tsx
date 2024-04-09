import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { StickyBanner } from '../StickyBanner';

describe('StickyBanner', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the component', () => {
    const { getByText } = render(<StickyBanner title='Title'>Text</StickyBanner>);
    expect(getByText('Title'));
    expect(getByText('Text'));
  });
});
