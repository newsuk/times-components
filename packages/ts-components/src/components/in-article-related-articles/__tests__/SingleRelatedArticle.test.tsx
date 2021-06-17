import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SingleRelatedArticle } from '../SingleRelatedArticle';

const article1 = {
  label: 'Environment',
  headline: 'Scientists discover ‘chocolate frogs’ in New Guinea',
  link:
    'https://www.thetimes.co.uk/article/scientists-discover-chocolate-frogs-in-new-guinea-bt3z986bj',
  image:
    'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F464a9dfe-c453-11eb-8601-6a2ece3e4634.jpg?crop=3586%2C2017%2C0%2C187&resize=663',
  summary:
    'Popularised by the Harry Potter books, the chocolate frog, it has emerged, is far from fictional. A living version of the confectionery shop favourite has been discovered in the jungles of New Guinea.',
  publishedTime: '2021-06-03T11:00:00.000Z',
  byline: 'Roger Maynard, Sydney'
};

describe('<SingleRelatedArticle>', () => {
  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        // @ts-ignore
        resolvedOptions: () => ({ timeZone: 'Europe/London' })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  it('renders', () => {
    const { baseElement } = render(
      <SingleRelatedArticle sectionColour="red" {...article1} />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('renders no image', () => {
    const { baseElement } = render(
      <SingleRelatedArticle
        sectionColour="red"
        {...article1}
        image={undefined}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
