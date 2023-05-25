import React from 'react';
import { useBreakpointKey } from 'newskit';

import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { LeadStory3 } from '../index';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));
const data = {
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

  leadArticles: [
    {
      headline: 'Short title of the card describing the main content',
      summary:
        'Short paragraph description of the article, outlining main story and focus.',
      tagL1: '',
      caption: 'Credit',
      url: 'https://www.thetimes.co.uk',
      tag: {
        label: 'Tag',
        href: '/'
      },
      flag: '4 min read 1'
    },
    {
      headline: 'Short title of the card describing the main content',
      summary:
        'Short paragraph description of the article, outlining main story and focus.',
      tagL1: '',
      caption: 'Credit',
      url: 'https://www.thetimes.co.uk',
      tag: {
        label: 'Tag',
        href: '/'
      },
      flag: '4 min read 2'
    },
    {
      headline: 'Short title of the card describing the main content',
      summary:
        'Short paragraph description of the article, outlining main story and focus.',
      tagL1: '',
      caption: 'Credit',
      url: 'https://www.thetimes.co.uk',
      tag: {
        label: 'Tag',
        href: '/'
      },
      flag: '4 min read 3'
    },
    {
      headline: 'Short title of the card describing the main content',
      summary:
        'Short paragraph description of the article, outlining main story and focus.',
      tagL1: '',
      caption: 'Credit',
      url: 'https://www.thetimes.co.uk',
      tag: {
        label: 'Tag',
        href: '/'
      },
      flag: '4 min read 4'
    }
  ],
  leadArticle: {
    headline: 'Short title of the card describing the main content',
    tagL1: '',
    image:
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7c246bf4-fa83-11ed-9be0-622d8a105167.jpg?crop=1200%2C1500%2C0%2C0&resize=747',
    caption: 'Credit',
    url: 'https://www.thetimes.co.uk',
    tag: {
      label: 'Tag',
      href: '/'
    },
    flag: '4 min read 1'
  }
};

const renderComponent = () => render(<LeadStory3 {...data} />);

describe('Render Lead Story 3 Slice', () => {
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
