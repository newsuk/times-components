import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { LargeArticle, LargeArticleProps } from '../index';

const renderComponent = (props: LargeArticleProps) =>
  render(<LargeArticle {...props} />);

const defaultProps = {
  heading: 'Short title of the card describing the main content',
  paragraph:
    'Short paragraph description of the article, outlining main story and focus.',
  tag: {
    label: 'Tag',
    href: '/'
  },
  tagL1: 'TAG',
  url: '#',
  flag: 'Flag',
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

  it('items should not render TAG', () => {
    const { queryByText } = renderComponent({
      ...defaultProps,
      tagL1: ''
    });
    const articleType = queryByText('TAG');
    expect(articleType).not.toBeInTheDocument();
  });

  it('items should not render Tag', () => {
    const { queryByText } = renderComponent({
      ...defaultProps,
      tag: {
        label: '',
        href: ''
      }
    });
    const articleType = queryByText('Tag');
    expect(articleType).not.toBeInTheDocument();
  });

  it('should not render tag or flag if they are not provided', () => {
    const formatedDefaultProps = {
      heading: 'Short title of the card describing the main content',
      paragraph:
        'Short paragraph description of the article, outlining main story and focus.',

      tagL1: 'TAG',
      url: '#',
      listData: ['Unordered list item']
    };

    const { queryByText } = render(<LargeArticle {...formatedDefaultProps} />);
    const tag = queryByText('Tag');
    const flag = queryByText('Flag');

    expect(tag).not.toBeInTheDocument();
    expect(flag).not.toBeInTheDocument();
  });
});
