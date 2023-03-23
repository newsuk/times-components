import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../utils/test-utils';
import { LeadStory } from '../index';
import {
  headline,
  color,
  readingTime,
  summary,
  bylines,
  subHeadline,
  caption,
  image,
  url
} from '../../fixture/data.json';

describe('Render Component one', () => {
  it('should render a snapshot', () => {
    const { asFragment } = render(
      <LeadStory
        headline={headline}
        color={color}
        readingTime={readingTime}
        summary={summary}
        bylines={bylines}
        subHeadline={subHeadline}
        caption={caption}
        image={image}
        url={url}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct headline', () => {
    const { getByText } = render(
      <LeadStory
        headline={headline}
        color={color}
        readingTime={readingTime}
        summary={summary}
        bylines={bylines}
        subHeadline={subHeadline}
        caption={caption}
        image={image}
        url={url}
      />
    );
    const headlineText = getByText(headline);
    expect(headlineText).toBeInTheDocument();
  });
  it('should render correct subHeadline color', () => {
    const { getByText } = render(
      <LeadStory
        headline={headline}
        color={color}
        readingTime={readingTime}
        summary={summary}
        bylines={bylines}
        subHeadline={subHeadline}
        caption={caption}
        image={image}
        url={url}
      />
    );

    const subHeadlineText = getByText('JOEL KPOKU INTERVIEW');
    expect(subHeadlineText).toHaveStyle('color: #008347');
  });
  it('should render correct summary', () => {
    const { getByText } = render(
      <LeadStory
        headline={headline}
        color={color}
        readingTime={readingTime}
        summary={summary}
        bylines={bylines}
        subHeadline={subHeadline}
        caption={caption}
        image={image}
        url={url}
      />
    );

    const summaryText = getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });
  it('should render correct readingTime', () => {
    const { getByText } = render(
      <LeadStory
        headline={headline}
        color={color}
        readingTime={readingTime}
        summary={summary}
        bylines={bylines}
        subHeadline={subHeadline}
        caption={caption}
        image={image}
        url={url}
      />
    );

    const readingTimeText = getByText(readingTime);
    expect(readingTimeText).toBeInTheDocument();
  });
  it('should render correct bylines', () => {
    const { getByText } = render(
      <LeadStory
        headline={headline}
        color={color}
        readingTime={readingTime}
        summary={summary}
        bylines={bylines}
        subHeadline={subHeadline}
        caption={caption}
        image={image}
        url={url}
      />
    );

    const bylinesText = getByText(bylines);
    expect(bylinesText).toBeInTheDocument();
  });
  it('should render correct caption', () => {
    const { getByText } = render(
      <LeadStory
        headline={headline}
        color={color}
        readingTime={readingTime}
        summary={summary}
        bylines={bylines}
        subHeadline={subHeadline}
        caption={caption}
        image={image}
        url={url}
      />
    );

    const captionText = getByText(caption);
    expect(captionText).toBeInTheDocument();
  });
  it('should render correct summary href', () => {
    const { getByText } = render(
      <LeadStory
        headline={headline}
        color={color}
        readingTime={readingTime}
        summary={summary}
        bylines={bylines}
        subHeadline={subHeadline}
        caption={caption}
        image={image}
        url={url}
      />
    );

    expect(getByText(summary).closest('a')).toHaveAttribute(
      'href',
      'https://www.thetimes.co.uk'
    );
  });

  it('should render correct headline href', () => {
    const { getByText } = render(
      <LeadStory
        headline={headline}
        color={color}
        readingTime={readingTime}
        summary={summary}
        bylines={bylines}
        subHeadline={subHeadline}
        caption={caption}
        image={image}
        url={url}
      />
    );

    expect(getByText(headline).closest('a')).toHaveAttribute(
      'href',
      'https://www.thetimes.co.uk'
    );
  });
});
