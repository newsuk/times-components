import { Article } from '../formatters';

// TYPE

export type Byline =
  | { type: 'author'; name: string }
  | { type: 'inline'; value: string };

// HELPERS

const getByline = (byline: any) =>
  byline.type === 'author'
    ? { __typename: 'AuthorByline', type: byline.type, name: byline.name }
    : { __typename: 'TextByline', type: byline.type, value: byline.value };

const articleMock = ({
  url,
  slug,
  label,
  headline,
  publishedDateTime,
  bylines,
  summary,
  image
}: {
  url: string;
  slug: string;
  label: string;
  headline: string;
  publishedDateTime: string;
  bylines: Byline[];
  summary: string;
  image: string;
}): Article => ({
  __typename: 'Article',
  url,
  slug,
  label,
  headline,
  publishedDateTime,
  bylines: bylines.map(getByline),
  summary: {
    __typename: 'Summary',
    children: [{ __typename: 'ArticleText', text: summary }]
  },
  media: {
    __typename: 'Image',
    crops: [
      { __typename: 'ImageCrop', alt: '', url: image, aspectRatio: '16:9' }
    ]
  }
});

// MAIN

export const mockArticles: Article[] = [
  articleMock({
    url:
      'https://www.thetimes.co.uk/article/older-people-need-a-champion-to-take-on-the-digital-world-pbwpmrgxw',
    slug: 'older-people-need-a-champion-to-take-on-the-digital-world',
    label: 'Esther Rantzen',
    headline: 'Older people need a champion to take on the digital world',
    publishedDateTime: '2022-05-24T20:00:00.000Z',
    bylines: [{ name: 'Esther Rantzen', type: 'author' }],
    summary:
      'The digital revolution is causing millions of older people distress and anxiety. It’s not that we oldies resist change: many of us do our best to learn and to take on each new challenge, whether it’s',
    image:
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F65d8eb4a-db94-11ec-bcbd-e35b52e0266c.jpg?crop=1500%2C844%2C0%2C78'
  }),
  articleMock({
    url:
      'https://www.thetimes.co.uk/article/ricky-gervais-criticised-for-trans-and-aids-jokes-in-supernature-netflix-show-rx85gpjfm',
    slug:
      'ricky-gervais-criticised-for-trans-and-aids-jokes-in-supernature-netflix-show',
    label: 'UK NEWS',
    headline: 'Gervais criticised for trans and Aids jokes',
    publishedDateTime: '2022-05-25T11:25:00.000Z',
    bylines: [
      { name: 'Jake Kanter', type: 'author' },
      { value: ', Media Correspondent', type: 'inline' }
    ],
    summary:
      'Ricky Gervais’s new Netflix stand-up comedy special has been criticised for featuring “dangerous” jokes about transgender women and Aids.',
    image:
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F224cc8a4-dc18-11ec-bcbd-e35b52e0266c.jpg?crop=1539%2C865%2C303%2C54'
  }),
  articleMock({
    url:
      'https://www.thetimes.co.uk/article/chelsea-takeover-conflict-celebrities-and-eye-watering-bonuses-how-the-saga-unfolded-27gmsjwhm',
    slug:
      'chelsea-takeover-conflict-celebrities-and-eye-watering-bonuses-how-the-saga-unfolded',
    label: 'Football',
    headline:
      'Conflict, celebrities and eye-watering bonuses – how takeover unfolded',
    publishedDateTime: '2022-05-24T21:30:00.000Z',
    bylines: [
      { value: 'Matt Lawton', type: 'inline' },
      { value: ', Chief Sports Correspondent', type: 'inline' }
    ],
    summary:
      'Roman Abramovich’s arrival at Chelsea in 2003 was sudden and unexpected. As the football world focused on David Beckham’s transfer to Real Madrid, the Russian oligarch’s £140 million takeover, at the',
    image:
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fed2fc692-db7e-11ec-8de3-573a6521e09e.jpg?crop=1600%2C900%2C0%2C0'
  })
];
