import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { LeadStory } from '../index';
import { leadStory } from '../../../../slices/fixtures/data.json';

const renderComponent = () => render(<LeadStory {...leadStory} />);

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
  it('should render correct subHeadline color', () => {
    const { getByText } = renderComponent();

    const subHeadlineText = getByText('JOEL KPOKU INTERVIEW');
    expect(subHeadlineText).toHaveStyle('color: #008347');
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
  it('should render correct bylines', () => {
    const { getByText } = renderComponent();

    const bylinesText = getByText(leadStory.bylines);
    expect(bylinesText).toBeInTheDocument();
  });
  it('should render correct caption', () => {
    const { getByText } = renderComponent();

    const captionText = getByText(leadStory.caption);
    expect(captionText).toBeInTheDocument();
  });
  it('should render correct summary href', () => {
    const { getByText } = renderComponent();

    expect(getByText(leadStory.summary).closest('a')).toHaveAttribute(
      'href',
      'https://www.thetimes.co.uk'
    );
  });

  it('should render correct headline href', () => {
    const { getByText } = renderComponent();

    expect(getByText(leadStory.headline).closest('a')).toHaveAttribute(
      'href',
      'https://www.thetimes.co.uk'
    );
  });
});
