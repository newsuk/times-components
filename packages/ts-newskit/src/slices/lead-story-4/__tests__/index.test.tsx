import React from 'react';
import '@testing-library/jest-dom';
import { LeadStory4 } from '../index';
import data from '../../fixtures/lead-story4.json';
import { renderComponent } from '../../../utils';

const mockClickHandler = jest.fn();

const defaultProps = {
  ...data,
  clickHandler: mockClickHandler,
};

describe('Render Lead Story 4 Slice', () => {
  test('Slice matches snapshot', () => {
    const { asFragment } = renderComponent(<LeadStory4 {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "lg"', () => {
    const { asFragment } = renderComponent(
      <LeadStory4 {...defaultProps} />,
      'lg',
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "md"', () => {
    const { asFragment } = renderComponent(
      <LeadStory4 {...defaultProps} />,
      'md',
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "xs"', () => {
    const { asFragment } = renderComponent(
      <LeadStory4 {...defaultProps} />,
      'xs',
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "sm"', () => {
    const { asFragment } = renderComponent(
      <LeadStory4 {...defaultProps} />,
      'sm',
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
