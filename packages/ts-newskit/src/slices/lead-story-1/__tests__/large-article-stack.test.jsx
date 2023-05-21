import React from 'react';
import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { largeArticles } from '../../fixtures/lead-story.json';
import { LargeArticles } from '../large-article-stack';

const renderComponent = () =>
  render(<LargeArticles largeArticles={largeArticles} />);

describe('Render Lead Story 1 Slice', () => {
  test('Large Article Stack', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
