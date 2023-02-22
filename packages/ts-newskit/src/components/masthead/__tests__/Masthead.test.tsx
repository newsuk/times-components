import React from 'react';
import { render } from '@testing-library/react';

import { EditionMasthead } from "../index";

describe('EditionMasthead', () => {
  it('should render the component', () => {
    const { asFragment } = render(
      <EditionMasthead isSunday={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});