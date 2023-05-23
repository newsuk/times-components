import React from 'react';
import { useBreakpointKey } from 'newskit';

import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { LeadStory2 } from '../index';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));
const data = {
  leadArticle: {
    headline: 'Sarcacens an inclusive club? They didnt look out for me',
    summary:
      'Short paragraph description of the article, outlining main story and focus.',
    subHeadline: '',
    caption: 'Credit',
    image: '/assets/main_01.jpg',
    url: 'https://www.thetimes.co.uk',
    tag: {
      label: 'Tag',
      href: '/'
    },
    flag: '4 min read',
    imageTop: true
  },
  articles: [
    {
      image: {
        src: '/assets/small_01.jpg',
        alt: 'This is ALT Text'
      },
      title:
        'European cup winner Mihajlovic dies aged 53 after battle with leukaemia',
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
      title: 'Blow for rebel clubs as court says Uefa can block Super League',
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
      title: 'Blow for rebel clubs as court says Uefa can block Super League',
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

  verticalArticles: [
    {
      headline: 'Short title of the card describing the main content',
      summary:
        'Short paragraph description of the article, outlining main story and focus.',
      subHeadline: '',
      caption: 'Credit',
      image: '/assets/main_01.jpg',
      url: 'https://www.thetimes.co.uk',
      tag: {
        label: 'Tag',
        href: '/'
      },
      flag: '4 min read'
    },
    {
      headline: 'Short title of the card describing the main content',
      summary:
        'Short paragraph description of the article, outlining main story and focus.',
      subHeadline: '',
      caption: 'Credit',
      image: '/assets/main_01.jpg',
      url: 'https://www.thetimes.co.uk',
      tag: {
        label: 'Tag',
        href: '/'
      },
      flag: '4 min read'
    }
  ],
  horizontalArticles: [
    {
      headline: 'Short title of the card describing the main content',
      summary:
        'Short paragraph description of the article, outlining main story and focus.',
      subHeadline: '',
      caption: 'Credit',
      url: 'https://www.thetimes.co.uk',
      tag: {
        label: 'Tag',
        href: '/'
      },
      flag: '4 min read'
    },
    {
      headline: 'Short title of the card describing the main content',
      summary:
        'Short paragraph description of the article, outlining main story and focus.',
      subHeadline: '',
      caption: 'Credit',
      url: 'https://www.thetimes.co.uk',
      tag: {
        label: 'Tag',
        href: '/'
      },
      flag: '4 min read'
    }
  ]
};

const renderComponent = () => render(<LeadStory2 {...data} />);

describe('Render Lead Story 2 Slice', () => {
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
