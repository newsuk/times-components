import React from 'react';
import { render } from '@testing-library/react';

import { SectionHeader } from "../index";

describe('Section Header', () => {
  it('should render News Section Header', () => {
    const { asFragment } = render(
      <SectionHeader title={'News'} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});