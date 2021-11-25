import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LiveArticleFlag } from '../LiveArticleFlag';

describe('<LiveArticleFlag>', () => {
  it('should render the component', () => {
    const { baseElement, getByText } = render(<LiveArticleFlag />);
    expect(getByText('LIVE')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
