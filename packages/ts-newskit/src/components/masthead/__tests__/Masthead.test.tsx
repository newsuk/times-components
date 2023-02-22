import React from 'react';
import { render } from '@testing-library/react';

import { EditionMasthead } from "../index";

describe('EditionMasthead', () => {
  it('should render The Times masthead', () => {
    const { asFragment } = render(
      <EditionMasthead isSunday={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render The Sunday Times masthead', () => {
    const { asFragment } = render(
      <EditionMasthead isSunday={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});