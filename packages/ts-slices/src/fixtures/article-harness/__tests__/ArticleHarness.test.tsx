import React from 'react';
import { render } from '@testing-library/react';
import { ArticleHarness } from '../ArticleHarness';

describe('ArticleHarness', () => {
  it('should render as expected', () => {
    const { getByText } = render(
      <ArticleHarness>
        <div>hello world</div>
      </ArticleHarness>
    );
    expect(getByText('hello world'));
  });
});
