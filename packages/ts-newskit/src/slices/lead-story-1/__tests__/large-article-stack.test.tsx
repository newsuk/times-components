import React from 'react';
import { useBreakpointKey } from 'newskit';
import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { LargeArticles } from '../large-article-stack';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));
const largeArticles = [
  {
    heading: 'Article 1',
    paragraph: 'Lorem ipsum dolor sit amet.',
    tag: {
      label: 'Tag 1',
      href: '/tag1'
    },
    tagL1: 'TagL1 1',
    url: '/article1',
    flag: 'Flag 1',
    listData: ['List item 1', 'List item 2']
  },
  {
    heading: 'Article 1',
    paragraph: 'Lorem ipsum dolor sit amet.',
    tag: {
      label: 'Tag 1',
      href: '/tag1'
    },
    tagL1: 'TagL1 1',
    url: '/article1',
    flag: 'Flag 1',
    listData: ['List item 1', 'List item 2']
  },
  {
    heading: 'Article 1',
    paragraph: 'Lorem ipsum dolor sit amet.',
    tag: {
      label: 'Tag 1',
      href: '/tag1'
    },
    tagL1: 'TagL1 1',
    url: '/article1',
    flag: 'Flag 1',
    listData: ['List item 1', 'List item 2']
  }
];

const renderComponent = () =>
  render(<LargeArticles largeArticles={largeArticles} />);

describe('Render Lead Story 1 Slice', () => {
  test('Large Article Stack', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders the large articles correctly', () => {
    (useBreakpointKey as any).mockReturnValue('sm');

    const { getAllByText, getAllByTestId } = render(
      <LargeArticles largeArticles={largeArticles} />
    );

    largeArticles.forEach(article => {
      expect(getAllByText(article.heading)[0]).toBeInTheDocument();
      expect(getAllByText(article.paragraph)[0]).toBeInTheDocument();
      expect(getAllByText(article.tag.label)[0]).toBeInTheDocument();
    });

    const dividers = getAllByTestId('divider');
    expect(dividers.length).toBe(5);
    const divider = getAllByTestId('divider')[0];
    expect(divider).toHaveStyle({ color: 'rgb(51, 51, 51)' });
  });
});
