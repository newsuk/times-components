import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '../../../../utils/test-utils';
import { LeadArticle } from '../index';
import { leadArticle } from '../../../../slices/fixtures/data.json';
import { useBreakpointKey } from 'newskit';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xs')
}));

const mockClickHandler = jest.fn();

const renderComponent = () =>
  render(
    <LeadArticle
      article={{ ...leadArticle, imageTop: false }}
      clickHandler={mockClickHandler}
    />
  );

describe('Render Component one', () => {
  it('should render a snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render correct headline', () => {
    const { getByText } = renderComponent();
    const headlineText = getByText(leadArticle.headline);
    expect(headlineText).toBeInTheDocument();
  });

  it('should render correct shortSummary', () => {
    const { getByText } = renderComponent();

    const shortSummaryText = getByText(leadArticle.shortSummary);
    expect(shortSummaryText).toBeInTheDocument();
  });
  it('should render correct readingTime', () => {
    const { getByText } = renderComponent();

    const readingTimeText = getByText(leadArticle.tag.label);
    expect(readingTimeText).toBeInTheDocument();
  });
  it('should render correct caption', () => {
    const { getByText } = renderComponent();

    const captionText = getByText(leadArticle.images.caption);
    expect(captionText).toBeInTheDocument();
  });

  it('should render tag if tag is provided', () => {
    (useBreakpointKey as any).mockReturnValue('xs');
    const { queryByText } = render(
      <LeadArticle
        article={{ ...leadArticle, imageTop: true }}
        clickHandler={mockClickHandler}
      />
    );
    const tag = queryByText(leadArticle.tag.label);
    expect(tag).toBeVisible();
  });

  it('should not render tag or flag if they are not provided', () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    const leadArticleNoFlags = {
      ...leadArticle,
      tag: undefined,
      flag: undefined
    };

    const { queryByText } = render(
      <LeadArticle
        article={leadArticleNoFlags}
        clickHandler={mockClickHandler}
      />
    );
    const tag = queryByText('Tag');
    const flag = queryByText('Flag');

    expect(tag).not.toBeInTheDocument();
    expect(flag).not.toBeInTheDocument();
  });

  it('should use corrrect spacing if `contentTop` is set', () => {
    const { getByText } = render(
      <LeadArticle
        article={{ ...leadArticle, contentTop: true }}
        clickHandler={mockClickHandler}
      />
    );
    const headline = getByText(leadArticle.headline);
    const cardContainer = headline.closest('div');

    expect(cardContainer).toHaveStyle({
      marginBlockEnd: '16px'
    });
  });

  it('should render StyledSpan if caption not provided', () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    const leadStoryDataWithCaption = {
      ...leadArticle,
      images: {
        ...leadArticle.images,
        caption: '',
        credits: 'test'
      }
    };
    const { container } = render(
      <LeadArticle
        article={leadStoryDataWithCaption}
        clickHandler={mockClickHandler}
      />
    );

    const styledSpan = container.querySelector('span');
    expect(styledSpan).toBeInTheDocument();
  });
  it('should render StyledSpan with if caption provided', () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    const leadStoryDataWithCaption = {
      ...leadArticle,
      images: {
        ...leadArticle.images,
        caption: 'caption',
        credits: 'test'
      }
    };
    const { container } = render(
      <LeadArticle
        article={{ ...leadStoryDataWithCaption }}
        clickHandler={mockClickHandler}
      />
    );

    const styledSpan = container.querySelector('span');
    expect(styledSpan).toBeInTheDocument();
  });
  it('should call the clickHandler when clicked', () => {
    const { getByText } = renderComponent();
    fireEvent.click(
      getByText('Sarcacens an inclusive club? They didnt look out for me')
    );
    expect(mockClickHandler).toHaveBeenCalled();
  });
});
