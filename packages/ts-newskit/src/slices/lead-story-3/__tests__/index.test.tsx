import React from 'react';
import '@testing-library/jest-dom';
import { LeadStory3 } from '../index';
import data from '../../fixtures/lead-story3.json';
import { renderComponent } from '../../../utils';

const mockClickHandler = jest.fn();

const defaultProps = {
  ...data,
  clickHandler: mockClickHandler,
};

describe('Render Lead Story 3 Slice', () => {
  test('Slice matches snapshot', () => {
    const { asFragment } = renderComponent(<LeadStory3 {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "lg"', () => {
    const { asFragment } = renderComponent(
      <LeadStory3 {...defaultProps} />,
      'lg',
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "md"', () => {
    const { asFragment } = renderComponent(
      <LeadStory3 {...defaultProps} />,
      'md',
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "xs"', () => {
    const { asFragment } = renderComponent(
      <LeadStory3 {...defaultProps} />,
      'xs',
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "sm"', () => {
    const { asFragment } = renderComponent(
      <LeadStory3 {...defaultProps} />,
      'sm',
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
