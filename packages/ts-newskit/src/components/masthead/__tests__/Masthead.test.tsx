import React from 'react';
import mockDate from 'mockdate';
import { render } from '@testing-library/react';

import { EditionMasthead } from "../index";

describe('EditionMasthead', () => {
  beforeEach(() => {
    mockDate.reset();
    mockDate.set(new Date('2023-02-22 00:00:00'));
  });

  afterEach(() => {
    mockDate.reset();
  });

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

  it('should render date correctly', () => {
    const { getAllByText } = render(
      <EditionMasthead isSunday={false} />
    );
    expect(getAllByText("Wednesday February 22 2023").length).toEqual(1);
  });
});