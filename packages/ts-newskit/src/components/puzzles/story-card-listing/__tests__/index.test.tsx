import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { StoryCardListing } from '../index';
import data from '../fixtures/data.json';
const { articles } = data;

const renderComponent = () =>
  render(<StoryCardListing {...{ articles }} sectionTitle="Recent stories" />);

describe('Render puzzles story card', () => {
  it('should render a snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
