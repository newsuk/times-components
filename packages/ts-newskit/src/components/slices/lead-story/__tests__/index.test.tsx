import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { LeadStory } from '../index';
import { leadStory } from '../../../../slices/fixtures/data.json';

const leadStoryData = {
  ...leadStory,
  subHeadline: 'TAG'
};

const renderComponent = () => render(<LeadStory {...leadStoryData} />);

describe('Render Component one', () => {
  it('should render a snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct headline', () => {
    const { getByText } = renderComponent();
    const headlineText = getByText(leadStory.headline);
    expect(headlineText).toBeInTheDocument();
  });

  it('should render correct summary', () => {
    const { getByText } = renderComponent();

    const summaryText = getByText(leadStory.summary);
    expect(summaryText).toBeInTheDocument();
  });
  it('should render correct readingTime', () => {
    const { getByText } = renderComponent();

    const readingTimeText = getByText(leadStory.readingTime);
    expect(readingTimeText).toBeInTheDocument();
  });
  it('should render correct caption', () => {
    const { getByText } = renderComponent();

    const captionText = getByText(leadStory.caption);
    expect(captionText).toBeInTheDocument();
  });
  it('should render subHeadline if passed as props', () => {
    const { getByText } = renderComponent();

    const subHeadline = getByText('TAG');
    expect(subHeadline).toBeInTheDocument();
  });
});
