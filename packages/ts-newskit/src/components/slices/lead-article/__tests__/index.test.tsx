import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { LeadArticle, LeadArticleProps } from '../index';
import { leadArticle } from '../../../../slices/fixtures/data.json';
import { useBreakpointKey } from 'newskit';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xs')
}));

const leadStoryData: LeadArticleProps = {
  ...leadArticle
};

const renderComponent = () =>
  render(<LeadArticle {...leadStoryData} imageTop={false} />);

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
      <LeadArticle {...leadStoryData} imageTop={true} />
    );
    const tag = queryByText(leadArticle.tag.label);
    expect(tag).toBeVisible();
  });

  it('should not render tag or flag if they are not provided', () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    delete leadStoryData.tag;
    delete leadStoryData.flag;

    const { queryByText } = render(<LeadArticle {...leadStoryData} />);
    const tag = queryByText('Tag');
    const flag = queryByText('Flag');

    expect(tag).not.toBeInTheDocument();
    expect(flag).not.toBeInTheDocument();
  });

  it('should use corrrect spacing if `contentTop` is set', () => {
    const { getByText } = render(<LeadArticle {...leadStoryData} contentTop />);
    const headline = getByText(leadStoryData.headline);
    const cardContainer = headline.closest('div');

    expect(cardContainer).toHaveStyle({
      marginBlockEnd: '16px'
    });
  });

  it('should select image with correct ratio when loadingAspectRatio matches', () => {
    const { getByAltText } = render(<LeadArticle {...leadStoryData} />);
    const imageElement = getByAltText(
      leadStoryData.headline
    ) as HTMLImageElement;
    expect(imageElement.src).toBe(
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=3844%2C2563%2C188%2C173'
    );
  });

  it('should fall back to 3:2 ratio when loadingAspectRatio does not match any crop', () => {
    const loadingAspectRatio = '4:5';

    const { getByAltText } = render(
      <LeadArticle {...leadStoryData} loadingAspectRatio={loadingAspectRatio} />
    );
    const imageElement = getByAltText(
      leadStoryData.headline
    ) as HTMLImageElement;

    expect(imageElement.src).toBe(
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=2050%2C2563%2C1085%2C173'
    );
  });
  it('should render StyledSpan if caption not provided', () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    const leadStoryDataWithCaption = {
      ...leadStoryData,
      images: {
        ...leadStoryData.images,
        caption: '',
        credits: 'test'
      }
    };
    const { container } = render(<LeadArticle {...leadStoryDataWithCaption} />);

    const styledSpan = container.querySelector('span');
    expect(styledSpan).toBeInTheDocument();
  });
  it('should render StyledSpan with if caption provided', () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    const leadStoryDataWithCaption = {
      ...leadStoryData,
      images: {
        ...leadStoryData.images,
        caption: 'caption',
        credits: 'test'
      }
    };
    const { container } = render(<LeadArticle {...leadStoryDataWithCaption} />);

    const styledSpan = container.querySelector('span');
    expect(styledSpan).toBeInTheDocument();
  });
});
