import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { LeadArticle, LeadArticleProps } from '../index';

const renderComponent = (props: LeadArticleProps) =>
  render(<LeadArticle {...props} />);

const defaultProps = {
  heading: 'Short title of the card describing the main content',
  paragraph:
    'Short paragraph description of the article, outlining main story and focus.',
  articleType: 'Tag',
  readingTime: 'Flag',
  url: '#',
  listData: ['Unordered list item']
};

describe('Render Lead Article Item', () => {
  it('should render a snapshot', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the component heading', () => {
    const { getByText } = renderComponent(defaultProps);
    const articleHeading = getByText(
      'Short title of the card describing the main content'
    );
    expect(articleHeading).toBeInTheDocument();
  });

  it('should render the component paragraph', () => {
    const { getByText } = renderComponent(defaultProps);
    const articleParagraph = getByText(
      'Short paragraph description of the article, outlining main story and focus.'
    );
    expect(articleParagraph).toBeInTheDocument();
  });

  it('items should render Tag', () => {
    const { getAllByText } = renderComponent(defaultProps);
    const articleListUrl = getAllByText('Tag');
    expect(articleListUrl[0]).toBeInTheDocument();
  });
  it('items should render Flag', () => {
    const { getByText } = renderComponent(defaultProps);
    const articleListUrl = getByText('Flag');
    expect(articleListUrl).toBeInTheDocument();
  });
});
