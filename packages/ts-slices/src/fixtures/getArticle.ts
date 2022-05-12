import shuffle from 'lodash.shuffle';

import { SliceArticle } from '../types/slice';

const sportArticles: SliceArticle[] = [
  {
    id: '64ef2c48-e191-11ea-9a3a-c45f6db42dc9',
    images: {
      alt:
        'FC Internazionale v Shakhtar Donetsk - UEFA Europa League Semi Final',
      crops: [
        {
          ratio: '16:9',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fa505cdb4-e191-11ea-9a3a-c45f6db42dc9.jpg?crop=4203%2C2364%2C32%2C196'
        },
        {
          ratio: '3:2',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fa505cdb4-e191-11ea-9a3a-c45f6db42dc9.jpg?crop=4203%2C2802%2C32%2C21'
        }
      ]
    },
    label: 'Europa League',
    byline: 'Alasdair Mackenzie',
    headline:
      'Antonio Conte’s misfits show Premier League what it’s been missing',
    datePublished: '2021-05-22T23:01:00.000Z',
    dateUpdated: '2021-05-23T01:50:23.000Z',
    url:
      'https://www.thetimes.co.uk/article/antonio-contes-misfits-show-premier-league-what-its-been-missing-h77bz7n73'
  },
  {
    id: '225c4dce-e21e-11ea-980d-ea124c352a60',
    images: {
      alt:
        'FC Internazionale v Shakhtar Donetsk - UEFA Europa League Semi Final',
      crops: [
        {
          ratio: '16:9',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fae513a54-e22f-11ea-980d-ea124c352a60.jpg?crop=4384%2C2466%2C137%2C155'
        },
        {
          ratio: '3:2',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fae513a54-e22f-11ea-980d-ea124c352a60.jpg?crop=4603%2C3069%2C0%2C0'
        }
      ]
    },
    label: 'Football',
    byline: 'Molly Hudson',
    headline:
      'From a teenage dream to battling the biggest clubs in Europe, the rise of Glasgow City',
    datePublished: '2021-05-14T16:00:00.000Z',
    dateUpdated: '2021-05-14T17:25:08.000Z',
    url:
      'https://www.thetimes.co.uk/article/from-a-teenage-dream-to-battling-the-biggest-clubs-in-europe-the-rise-of-glasgow-city-c72gvbhgj'
  },
  {
    id: '44bb39b0-df13-11ea-a18f-15f41f6d2fa7',
    images: {
      alt: 'Bath v London Irish - Gallagher Premiership - Recreation Ground',
      crops: [
        {
          ratio: '16:9',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2Fa17d0694-df16-11ea-a18f-15f41f6d2fa7.jpg?crop=3254%2C1830%2C43%2C361'
        },
        {
          ratio: '3:2',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2Fa17d0694-df16-11ea-a18f-15f41f6d2fa7.jpg?crop=3352%2C2235%2C0%2C0'
        }
      ]
    },
    label: 'Rugby union',
    byline: 'Stuart Barnes',
    headline: 'Ben Spencer shines on his debut as Bath dominate London Irish',
    datePublished: '2020-08-15T23:01:00.000Z',
    dateUpdated: '2020-08-15T20:39:04.000Z',
    url:
      'https://www.thetimes.co.uk/article/ben-spencer-shines-on-his-debut-as-bath-dominate-london-irish-9kq9gj3pk'
  },
  {
    id: '199af56e-dca6-11ea-be0a-064b00f2181c',
    images: {
      alt: '2020 World TeamTennis',
      crops: [
        {
          ratio: '16:9',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Feb034180-dcae-11ea-be0a-064b00f2181c.jpg?crop=2923%2C1644%2C32%2C231'
        },
        {
          ratio: '3:2',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fceab2304-dcae-11ea-be0a-064b00f2181c.jpg?crop=2967%2C1978%2C0%2C0'
        }
      ]
    },
    label: 'Tennis',
    byline: 'Stuart Fraser',
    headline: 'Even at 40, Venus Williams can still serve up something new',
    datePublished: '2020-08-12T23:01:00.000Z',
    dateUpdated: '2020-08-13T02:41:59.000Z',
    url:
      'https://www.thetimes.co.uk/article/even-at-40-venus-williams-can-still-serve-up-something-new-kzxlxnxtg'
  },
  {
    id: '975fffa6-d8d4-11ea-a099-b011877a86c1',
    images: {
      alt:
        'DWC Carnival Meeting, Horse Racing, Meydan, Dubai, United Arab Emirates - 16 Jan 2020',
      crops: [
        {
          ratio: '16:9',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F6394f40a-d8d5-11ea-a099-b011877a86c1.jpg?crop=2804%2C1577%2C14%2C155'
        },
        {
          ratio: '3:2',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F6394f40a-d8d5-11ea-a099-b011877a86c1.jpg?crop=2804%2C1869%2C14%2C9'
        }
      ]
    },
    label: 'Racing',
    byline: 'Rob Wright',
    headline: 'Danny Tudhope can upset form book to complete double at Ascot',
    datePublished: '2020-08-07T23:01:00.000Z',
    dateUpdated: '2020-08-07T22:18:31.000Z',
    url:
      'https://www.thetimes.co.uk/article/danny-tudhope-can-upset-form-book-to-complete-double-at-ascot-zmshctw73'
  },
  {
    id: '296c4da8-dada-11ea-8d9c-6a97b944a97b',
    images: {
      alt: 'PGA Championship - Final Round',
      crops: [
        {
          ratio: '16:9',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F687165ce-dada-11ea-8d9c-6a97b944a97b.jpg?crop=3037%2C1708%2C295%2C66'
        },
        {
          ratio: '3:2',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F687165ce-dada-11ea-8d9c-6a97b944a97b.jpg?crop=3037%2C2024%2C263%2C66'
        }
      ]
    },
    label: 'Golf',
    byline: 'Rick Broadbent',
    headline:
      '‘Maybe I’m not as good as I was’ – Rory McIlroy ponders major drought',
    datePublished: '2020-08-10T08:00:00.000Z',
    dateUpdated: '2020-08-10T09:35:26.000Z',
    url:
      'https://www.thetimes.co.uk/article/maybe-im-not-as-good-as-i-was-rory-mcilroy-ponders-major-drought-gdtvb3gr9'
  },
  {
    id: 'bf8c09e2-d65f-11ea-ae2c-1f6a5007a0a3',
    images: {
      alt:
        'Melbourne, Australia. 12th March, 2020. Lando Norris of McLaren F1 Team before the 2020 Formula 1 Australian Grand Prix Credit: Chris Putnam/ZUMA Wire/Alamy Live News',
      crops: [
        {
          ratio: '16:9',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F7fe41d12-da50-11ea-8bfe-166b156f6daa.jpg?crop=4646%2C2613%2C116%2C502'
        },
        {
          ratio: '3:2',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F7fe41d12-da50-11ea-8bfe-166b156f6daa.jpg?crop=4878%2C3252%2C0%2C0'
        }
      ]
    },
    label: 'A life in the day',
    byline: 'Jeremy Taylor',
    headline:
      'Lando Norris, the Formula One boy wonder racing in today’s grand prix',
    datePublished: '2020-08-08T23:01:00.000Z',
    dateUpdated: '2020-08-09T14:57:04.000Z',
    url:
      'https://www.thetimes.co.uk/article/lando-norris-formula-one-mclaren-silverstone-grand-prix-zrzb9cv9q'
  },
  {
    id: '862a106a-dffe-11ea-9a3a-c45f6db42dc9',
    images: {
      alt:
        'Melbourne, Australia. 12th March, 2020. Lando Norris of McLaren F1 Team before the 2020 Formula 1 Australian Grand Prix Credit: Chris Putnam/ZUMA Wire/Alamy Live News',
      crops: [
        {
          ratio: '16:9',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fb64edc3c-e001-11ea-9a3a-c45f6db42dc9.jpg?crop=2758%2C1551%2C633%2C278'
        },
        {
          ratio: '3:2',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fb64edc3c-e001-11ea-9a3a-c45f6db42dc9.jpg?crop=2626%2C1751%2C782%2C277'
        }
      ]
    },
    label: 'Athletics',
    byline: 'Matt Lawton',
    headline: 'Nike may drop 36 British athletes',
    datePublished: '2020-08-16T23:01:00.000Z',
    dateUpdated: '2020-08-16T22:51:54.000Z',
    url:
      'https://www.thetimes.co.uk/article/nike-may-drop-36-british-athletes-x5x9c3dg2'
  }
];

const sportCommentArticles: SliceArticle[] = [
  {
    id: 'dfd94c6c-e0cf-11ea-9a3a-c45f6db42dc9',
    images: {
      crops: [
        {
          ratio: '1:1',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F5e3d6642-e0d0-11ea-9a3a-c45f6db42dc9.png?crop=420%2C420%2C2327%2C1042'
        }
      ]
    },
    byline: 'Tony Cascarino',
    headline: 'Why Manchester United win so many penalties',
    datePublished: '2020-08-18T16:00:00.000Z',
    dateUpdated: '2020-08-17T22:58:03.000Z',
    template: 'maincomment',
    url:
      'https://www.thetimes.co.uk/article/why-manchester-united-win-so-many-penalties-nzgzkdtj8'
  },
  {
    id: '6416fad8-e22e-11ea-9a3a-c45f6db42dc9',
    images: {
      alt: 'Bath v London Irish - Gallagher Premiership - Recreation Ground',
      crops: [
        {
          ratio: '1:1',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0ec9e850-e234-11ea-980d-ea124c352a60.jpg?crop=1586%2C1586%2C272%2C180'
        }
      ]
    },
    label: 'Cricket',
    byline: 'Mike Atherton',
    headline: 'Welcome, Fawad Alam, to the ministry of silly stances',
    datePublished: '2021-05-14T16:00:00.000Z',
    dateUpdated: '2021-05-14T17:25:07.000Z',
    template: 'maincomment',
    url:
      'https://www.thetimes.co.uk/article/welcome-fawad-alam-to-the-ministry-of-silly-stances-50zvt5b92'
  },
  {
    id: '7eaa3842-dfdb-11ea-9a3a-c45f6db42dc9',
    images: {
      alt: 'Bath v London Irish - Gallagher Premiership - Recreation Ground',
      crops: [
        {
          ratio: '1:1',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fb6874c8e-dfde-11ea-9a3a-c45f6db42dc9.jpg?crop=1460%2C1460%2C1337%2C338'
        }
      ]
    },
    label: 'Rugby Union',
    byline: 'Stuart Barnes',
    headline: 'Marcus Smith is a class act now but do not ignore Ben Spencer',
    datePublished: '2020-08-16T23:01:00.000Z',
    dateUpdated: '2020-08-16T22:33:56.000Z',
    template: 'magazinecomment',
    url:
      'https://www.thetimes.co.uk/article/marcus-smith-is-a-class-act-now-but-do-not-ignore-ben-spencer-d3v320mm6'
  }
];

const summary =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend quis purus eget consequat. Maecenas pellentesque lorem at ipsum egestas sagittis.';

export const getArticle = () => shuffle(sportArticles)[0];
export const getArticleWithSummary = () => ({
  ...shuffle(sportArticles)[0],
  summary
});
export const getCommentArticle = () => shuffle(sportCommentArticles)[0];
