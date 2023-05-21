import React from 'react';
import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import data from '../../fixtures/lead-story.json';
import LeadStory1 from '../index';

const renderComponent = () => render(<LeadStory1 {...data} />);

describe('Render Lead Story 1 Slice', () => {
  test('Slice matches snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
