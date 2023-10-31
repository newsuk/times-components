import React from 'react';
import '@testing-library/jest-dom';
import { LeadStory1 } from '../index';
import data from '../../fixtures/lead-story.json';
import { renderComponent } from '../../../utils';

const mockClickHandler = jest.fn();

const defaultProps = {
  ...data,
  clickHandler: mockClickHandler
};

describe('Render Lead Story 1 Slice', () => {
  test('Slice matches snapshot', () => {
    const { asFragment } = renderComponent(<LeadStory1 {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "md"', () => {
    const { asFragment } = renderComponent(
      <LeadStory1 {...defaultProps} />,
      'md'
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "xs"', () => {
    const { asFragment } = renderComponent(
      <LeadStory1 {...defaultProps} />,
      'xs'
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "sm"', () => {
    const { asFragment } = renderComponent(
      <LeadStory1 {...defaultProps} />,
      'sm'
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when `singleLeadArticle` are passed', () => {
    const { asFragment } = renderComponent(
      <LeadStory1 {...defaultProps} />,
      'lg'
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
