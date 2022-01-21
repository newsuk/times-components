import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  BaseLiveArticleFlag,
  BreakingArticleFlag,
  LiveArticleFlag
} from '../LiveArticleFlag';

describe('LiveArticleFlag', () => {
  it('should render the base live article flag', () => {
    const { baseElement, getByText } = render(
      <BaseLiveArticleFlag title="BASE" />
    );
    expect(getByText('BASE')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
  it('should render the breaking article flag', () => {
    const { baseElement, getByText } = render(<BreakingArticleFlag />);
    expect(getByText('BREAKING')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
  it('should render the live article flag', () => {
    const { baseElement, getByText } = render(<LiveArticleFlag />);
    expect(getByText('LIVE')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
