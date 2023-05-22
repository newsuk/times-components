import React from 'react';
import { useBreakpointKey } from 'newskit';

import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { LeadStory1 } from '../index';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

const data = {
  section: { title: 'Rugby Union', href: 'https://www.thetimes.co.uk/' },
  leadArticle: {
    headline: "Saracens an inclusive club? They didn't look out for me",
    color: '#01000d',
    flag: '4 min read',
    summary:
      "Lyon lock Joel Kpoku tells Will Kelleher that he's fired up to face old team — and urges more English stars to move to France",
    subHeadline: '',
    caption: 'Credit',
    image: '/assets/main_01.jpg',
    url: 'https://www.thetimes.co.uk',
    tag: {
      label: 'Review',
      href: '/'
    },
    imageTop: true
  },
  articles: [
    {
      image: {
        src: '/assets/small_01.jpg',
        alt: 'This is ALT Text'
      },
      title:
        'European cup winner Mihajlovic dies aged 53 after battle with leukemia',
      url:
        '/article/harry-and-meghan-s-new-project-to-make-boys-less-toxic-nk5n3h70m',
      imageRight: false,
      tag: {
        label: 'Tag',
        href: '/'
      },
      flag: 'Flag1'
    },
    {
      image: {
        src: '/assets/small_02.jpg',
        alt: 'This is ALT Text'
      },
      title: 'American owners pose threat to English pyramid',
      url:
        '/article/harry-and-meghan-s-new-project-to-make-boys-less-toxic-nk5n3h70m',
      imageRight: false
    },
    {
      image: {
        src: '/assets/small_03.jpg',
        alt: 'This is ALT Text'
      },
      title: '£60m Brazilian prodigy Endrick snubs Chelsea to join Real Madrid',
      url:
        '/article/harry-and-meghan-s-new-project-to-make-boys-less-toxic-nk5n3h70m',
      imageRight: false,
      tag: {
        label: 'Tag',
        href: '/'
      }
    },
    {
      image: {
        src: '/assets/small_04.jpg',
        alt: 'This is ALT Text'
      },
      title: 'Blow for rebel clubs as court says UEFA can block Super League',
      url:
        '/article/harry-and-meghan-s-new-project-to-make-boys-less-toxic-nk5n3h70m',
      imageRight: false,
      flag: 'Flag4'
    },
    {
      image: {
        src: '/assets/small_04.jpg',
        alt: 'This is ALT Text'
      },
      title: 'Blow for rebel clubs as court says UEFA can block Super League',
      url:
        '/article/harry-and-meghan-s-new-project-to-make-boys-less-toxic-nk5n3h70m',
      imageRight: false,
      tag: {
        label: 'Tag',
        href: '/'
      },
      flag: 'Flag5'
    }
  ],
  largeArticles: [
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
      heading: 'Article 2',
      paragraph: 'Lorem ipsum dolor sit amet.',
      tag: {
        label: 'Tag 2',
        href: '/tag2'
      },
      tagL1: 'TagL1 2',
      url: '/article2',
      flag: 'Flag 2',
      listData: ['List item 1', 'List item 2']
    }
  ],
  smallArticles: [
    {
      image: {
        src: '/assets/small_01.jpg',
        alt: 'This is ALT Text'
      },
      title:
        'European cup winner Mihajlovic dies aged 53 after battle with leukemia',
      url: '/article/european-cup-winner-mihajlovic-dies',
      imageRight: false,
      tag: {
        label: 'Tag',
        href: '/'
      },
      flag: 'Flag'
    },
    {
      image: {
        src: '/assets/small_02.jpg',
        alt: 'This is ALT Text'
      },
      title: 'American owners pose threat to English pyramid',
      url: '/article/american-owners-pose-threat-to-english-pyramid',
      imageRight: false,
      flag: ''
    }
  ]
};

const renderComponent = () => render(<LeadStory1 {...data} />);

describe('Render Lead Story 1 Slice', () => {
  test('Slice matches snapshot', () => {
    (useBreakpointKey as any).mockReturnValue('xl');

    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "md"', () => {
    (useBreakpointKey as any).mockReturnValue('md');
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "xs"', () => {
    (useBreakpointKey as any).mockReturnValue('xs');
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
