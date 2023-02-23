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
    const { asFragment, getByText } = render(
      <EditionMasthead isSunday={true} todaysDate="Sun Feb 26 2023 00:00:00 GMT+0000 (Greenwich Mean Time)" />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText("Sunday February 26 2023")).toBeVisible();
  });

  it('should render date correctly', () => {
    const { getByText } = render(
      <EditionMasthead isSunday={false} todaysDate="Wed Feb 22 2023 00:00:00 GMT+0000 (Greenwich Mean Time)" />
    );
    expect(getByText("Wednesday February 22 2023")).toBeVisible();
  });
});