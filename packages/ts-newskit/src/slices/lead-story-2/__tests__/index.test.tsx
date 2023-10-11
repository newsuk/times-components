import React from 'react';
import '@testing-library/jest-dom';
import { LeadStory2 } from '../index';
import data from '../../fixtures/lead-story.json';
import { renderComponent } from '../../../utils/responsiveRender';

const mockClickHandler = jest.fn();

const defaultProps = {
  ...data,
  clickHandler: mockClickHandler
};

describe('Render Lead Story 2 Slice', () => {
  test('Slice matches snapshot', () => {
    const { asFragment } = renderComponent(
      <LeadStory2 {...defaultProps} />,
      'xl'
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "md"', () => {
    const { asFragment } = renderComponent(
      <LeadStory2 {...defaultProps} />,
      'md'
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "xs"', () => {
    const { asFragment } = renderComponent(
      <LeadStory2 {...defaultProps} />,
      'xs'
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "sm"', () => {
    const { asFragment } = renderComponent(
      <LeadStory2 {...defaultProps} />,
      'sm'
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
