import React from 'react';
import { storiesOf } from '@storybook/react';

import { RelatedArticleSlice } from './RelatedArticleSlice';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { RelatedArticleSliceType } from '../../types/related-article-slice';
import { select } from '@storybook/addon-knobs';
import styled from 'styled-components';

const Container = styled.div`
  .RelatedArticleSlice {
    display: block !important;
  }
`;

storiesOf('Typescript Component/Article Extras', module).add(
  'Related Articles Slice',
  () => {
    const numberOfArticles = select(
      'Number of Articles',
      { Three: 3, Two: 2, One: 1 },
      3
    );

    const slice = {
      ...relatedArticleSlice,
      items: relatedArticleSlice.items.filter(
        ({}, index) => index < numberOfArticles
      )
    };
    // tslint:disable-next-line:no-console
    const handleClick = console.log;
    return (
      <Container>
        <RelatedArticleSlice
          slice={slice}
          heading="Related Articles"
          clickHandler={handleClick}
          analyticsStream={analyticsStream}
        />
      </Container>
    );
  }
);

export const relatedArticleSlice: RelatedArticleSliceType = {
  sliceName: 'StandardSlice',
  items: [
    {
      leadAsset: null,
      article: {
        leadAsset: {
          crop169: {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7547ab46-ace4-11eb-bda6-057976012425.jpg?crop=5616%2C3159%2C0%2C293'
          },
          crop32: {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7547ab46-ace4-11eb-bda6-057976012425.jpg?crop=5616%2C3744%2C0%2C0'
          },
          id: '4d75a19d-1956-473a-9474-ccbcdc5ac152',
          title: 'Steve Hewitt'
        },
        bylines: [
          {
            byline: [
              {
                name: 'inline',
                children: [
                  {
                    name: 'text',
                    children: [],
                    attributes: {
                      value: 'Steve Hewitt'
                    }
                  }
                ]
              }
            ],
            image: {
              id: '4d75a19d-1956-473a-9474-ccbcdc5ac152',
              caption: '',
              credits: '',
              title: 'Steve Hewitt',
              crop: {
                ratio: '1:1',
                url:
                  'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F60f61f90-acbe-11eb-9dc9-5a05c2885d62.jpg?crop=1055%2C1055%2C114%2C109'
              }
            }
          }
        ],
        hasVideo: false,
        headline: 'How Gymshark recruits the best young people',
        id: '7f750402-acb6-11eb-bda6-057976012425',
        label: 'Steve Hewitt | Comment',
        publicationName: 'TIMES',
        publishedTime: '2021-05-04T23:01:00.000Z',
        updatedTime: '2021-06-11T11:53:14.000Z',
        section: 'business',
        shortIdentifier: '5kksq826t',
        shortHeadline: 'How to recruit the best young people to your business',
        slug: 'how-to-recruit-the-best-young-people-to-your-business',
        url:
          'https://www.thetimes.co.uk/article/how-to-recruit-the-best-young-people-to-your-business-5kksq826t',
        summary105: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'The average age of my colleagues at Gymshark was 26 when we had 260 staff in 2018. It is now 29, but we'
                },
                children: []
              }
            ]
          }
        ],
        summary125: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'The average age of my colleagues at Gymshark was 26 when we had 260 staff in 2018. It is now 29, but we have almost tripled'
                },
                children: []
              }
            ]
          }
        ],
        summary145: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'The average age of my colleagues at Gymshark was 26 when we had 260 staff in 2018. It is now 29, but we have almost tripled in size. Half our'
                },
                children: []
              }
            ]
          }
        ],
        summary160: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'The average age of my colleagues at Gymshark was 26 when we had 260 staff in 2018. It is now 29, but we have almost tripled in size. Half our management team is'
                },
                children: []
              }
            ]
          }
        ],
        summary175: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'The average age of my colleagues at Gymshark was 26 when we had 260 staff in 2018. It is now 29, but we have almost tripled in size. Half our management team is younger than'
                },
                children: []
              }
            ]
          }
        ],
        summary225: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'The average age of my colleagues at Gymshark was 26 when we had 260 staff in 2018. It is now 29, but we have almost tripled in size. Half our management team is younger than 30, including our founder Ben, who set up the'
                },
                children: []
              }
            ]
          }
        ]
      }
    },
    {
      leadAsset: null,
      article: {
        leadAsset: {
          crop169: {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fcbfae118-aef3-11eb-9dc9-5a05c2885d62.jpg?crop=4105%2C2309%2C42%2C1828'
          },
          crop32: {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fcbfae118-aef3-11eb-9dc9-5a05c2885d62.jpg?crop=4126%2C2750%2C14%2C1764'
          },
          id: '25c7e706-1994-4692-aa1e-36701e0fb9fa',
          title: 'Susie Ma,'
        },
        bylines: [
          {
            byline: [
              {
                name: 'inline',
                children: [
                  {
                    name: 'text',
                    children: [],
                    attributes: {
                      value: 'Susie Ma'
                    }
                  }
                ]
              }
            ],
            image: {
              id: '25c7e706-1994-4692-aa1e-36701e0fb9fa',
              caption: '',
              credits: '',
              title: 'Susie Ma,',
              crop: {
                ratio: '1:1',
                url:
                  'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fcbfae118-aef3-11eb-9dc9-5a05c2885d62.jpg?crop=2778%2C2778%2C753%2C1685'
              }
            }
          }
        ],
        hasVideo: false,
        headline: 'Susie Ma: My recipe for self-belief',
        id: '5ddef020-af39-11eb-9dc9-5a05c2885d62',
        label: null,
        publicationName: 'TIMES',
        publishedTime: '2021-05-10T11:00:00.000Z',
        updatedTime: '2021-05-10T16:41:43.000Z',
        section: 'business',
        shortIdentifier: 'pstccwdxr',
        shortHeadline: 'My recipe for self-belief',
        slug: 'susie-ma-my-recipe-for-self-belief',
        url:
          'https://www.thetimes.co.uk/article/susie-ma-my-recipe-for-self-belief-pstccwdxr',
        summary105: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'I got my start aged 15 on a stall at Greenwich Market, selling a body scrub I’d made at my mum’s kitchen'
                },
                children: []
              }
            ]
          }
        ],
        summary125: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'I got my start aged 15 on a stall at Greenwich Market, selling a body scrub I’d made at my mum’s kitchen table. As I’d'
                },
                children: []
              }
            ]
          }
        ],
        summary145: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'I got my start aged 15 on a stall at Greenwich Market, selling a body scrub I’d made at my mum’s kitchen table. As I’d created the scrub for'
                },
                children: []
              }
            ]
          }
        ],
        summary160: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'I got my start aged 15 on a stall at Greenwich Market, selling a body scrub I’d made at my mum’s kitchen table. As I’d created the scrub for myself, I was my'
                },
                children: []
              }
            ]
          }
        ],
        summary175: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'I got my start aged 15 on a stall at Greenwich Market, selling a body scrub I’d made at my mum’s kitchen table. As I’d created the scrub for myself, I was my original target'
                },
                children: []
              }
            ]
          }
        ],
        summary225: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'I got my start aged 15 on a stall at Greenwich Market, selling a body scrub I’d made at my mum’s kitchen table. As I’d created the scrub for myself, I was my original target audience and I really believed in the power of my'
                },
                children: []
              }
            ]
          }
        ]
      }
    },
    {
      leadAsset: null,
      article: {
        leadAsset: {
          crop169: {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fd67cb358-cce1-11eb-9bfa-a3bc386e6928.jpg?crop=1361%2C765%2C117%2C132'
          },
          crop32: {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fd67cb358-cce1-11eb-9bfa-a3bc386e6928.jpg?crop=1175%2C784%2C277%2C106'
          },
          id: 'bcfdd93f-4385-4dcd-9451-52e191bab446',
          title: ''
        },
        bylines: [
          {
            byline: [
              {
                name: 'inline',
                children: [
                  {
                    name: 'text',
                    children: [],
                    attributes: {
                      value: 'Martin Leuw'
                    }
                  }
                ]
              }
            ],
            image: {
              id: 'bcfdd93f-4385-4dcd-9451-52e191bab446',
              caption: '',
              credits: '',
              title: '',
              crop: {
                ratio: '1:1',
                url:
                  'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fe06c0b34-cce1-11eb-9bfa-a3bc386e6928.png?crop=300%2C300%2C0%2C0'
              }
            }
          }
        ],
        hasVideo: false,
        headline: 'Why business is eating software',
        id: '94b6d85e-cce1-11eb-9bfa-a3bc386e6928',
        label: null,
        publicationName: 'TIMES',
        publishedTime: '2021-06-14T08:00:00.000Z',
        updatedTime: '2021-06-14T09:02:38.000Z',
        section: 'business',
        shortIdentifier: 'swl6j8jj3',
        shortHeadline: 'Why business is eating software',
        slug: 'why-business-is-eating-software',
        url:
          'https://www.thetimes.co.uk/article/why-business-is-eating-software-swl6j8jj3',
        summary105: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'Ten years ago this August, the renowned Silicon Valley investor Marc Andreessen’s essay entitled'
                },
                children: []
              }
            ]
          }
        ],
        summary125: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'Ten years ago this August, the renowned Silicon Valley investor Marc Andreessen’s essay entitled “Software is eating the'
                },
                children: []
              }
            ]
          }
        ],
        summary145: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'Ten years ago this August, the renowned Silicon Valley investor Marc Andreessen’s essay entitled “Software is eating the world” was published in '
                },
                children: []
              }
            ]
          }
        ],
        summary160: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'Ten years ago this August, the renowned Silicon Valley investor Marc Andreessen’s essay entitled “Software is eating the world” was published in '
                },
                children: []
              },
              {
                name: 'italic',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'The Wall Street'
                    },
                    children: []
                  }
                ]
              }
            ]
          }
        ],
        summary175: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'Ten years ago this August, the renowned Silicon Valley investor Marc Andreessen’s essay entitled “Software is eating the world” was published in '
                },
                children: []
              },
              {
                name: 'italic',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'The Wall Street Journal'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'text',
                attributes: {
                  value: '. To'
                },
                children: []
              }
            ]
          }
        ],
        summary225: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'Ten years ago this August, the renowned Silicon Valley investor Marc Andreessen’s essay entitled “Software is eating the world” was published in '
                },
                children: []
              },
              {
                name: 'italic',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'The Wall Street Journal'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'text',
                attributes: {
                  value:
                    '. To say he has been proved right by events since then is'
                },
                children: []
              }
            ]
          }
        ]
      }
    }
  ]
};
