import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { LeadStory } from '../index';
import { leadStory } from '../../../../slices/fixtures/data.json';
import { useBreakpointKey } from 'newskit';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xs')
}));

const leadStoryData = {
  ...leadStory,
  subHeadline: 'TAG'
};

const renderComponent = () =>
  render(
    <LeadStory {...leadStoryData} hasTagOrTimeToRead={false} imageTop={false} />
  );

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

  it('should not render articleType if hasTagOrTimeToRead is false', () => {
    (useBreakpointKey as any).mockReturnValue('xs');
    const { queryByText } = renderComponent();
    const articleType = queryByText(leadStory.articleType.label);
    expect(articleType).not.toBeVisible();
  });

  it('should render articleType if hasTagOrTimeToRead is false', () => {
    (useBreakpointKey as any).mockReturnValue('xs');
    const { queryByText } = render(
      <LeadStory {...leadStoryData} hasTagOrTimeToRead={true} imageTop={true} />
    );
    const articleType = queryByText(leadStory.articleType.label);
    expect(articleType).toBeVisible();
  });
});
