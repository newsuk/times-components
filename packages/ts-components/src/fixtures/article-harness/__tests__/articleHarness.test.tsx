import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ArticleHarness } from '../ArticleHarness';

describe('Render ArticleHarness', () => {
  it('renders the ArticleHarness', () => {
    const { asFragment } = render(
      <ArticleHarness />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
