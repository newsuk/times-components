import React from 'react';
import { render } from '@testing-library/react';

import { EditionMasthead } from "../index";

describe('EditionMasthead', () => {
  it('should render The Times masthead', () => {
    const { asFragment } = render(
      <EditionMasthead isSunday={false} todaysDate="Wed Feb 22 2023 00:00:00 GMT+0000 (Greenwich Mean Time)" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render The Sunday Times masthead', () => {
    const { asFragment } = render(
      <EditionMasthead isSunday={true} todaysDate="Sun Feb 26 2023 00:00:00 GMT+0000 (Greenwich Mean Time)" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render date correctly', () => {
    const { getAllByText } = render(
      <EditionMasthead isSunday={false} todaysDate="Wed Feb 22 2023 00:00:00 GMT+0000 (Greenwich Mean Time)" />
    );
    expect(getAllByText("Wednesday February 22 2023").length).toEqual(1);
  });
});