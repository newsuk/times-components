import { formatRelatedArticles } from '../formatters';
const sample = {
  sliceName: 'StandardSlice',
  items: [
    {
      leadAsset: null,
      article: {
        leadAsset: {
          crop169: {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fb11686ce-f43d-11eb-8f01-2c678acbb979.jpg?crop=4529%2C2548%2C2%2C450'
          },
          crop32: {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fb11686ce-f43d-11eb-8f01-2c678acbb979.jpg?crop=4552%2C3035%2C0%2C0'
          },
          id: '39de6425-613f-42d9-847b-cd49b16d7e65',
          title: "Tokyo Olympics. Day 11. Cycling Track - Women's Team Pursuit"
        },
        bylines: [
          {
            byline: [
              {
                name: 'author',
                children: [
                  {
                    name: 'text',
                    children: [],
                    attributes: {
                      value: 'Rebecca Myers'
                    }
                  }
                ],
                attributes: {
                  slug: 'rebecca-myers'
                }
              }
            ],
            image: null
          },
          {
            byline: [
              {
                name: 'inline',
                children: [
                  {
                    name: 'text',
                    children: [],
                    attributes: {
                      value: ', Tokyo'
                    }
                  }
                ]
              }
            ],
            image: null
          }
        ],
        hasVideo: false,
        headline:
          'Tokyo Olympics: Super-fast rivals force Jason and Laura Kenny to settle for silver',
        id: 'fc79fad0-f43b-11eb-8f01-2c678acbb979',
        label: 'Olympics',
        publicationName: 'TIMES',
        publishedTime: '2021-08-03T16:00:00.000Z',
        updatedTime: '2021-08-03T22:51:28.000Z',
        section: 'sport',
        shortIdentifier: 'lfjbwnpw2',
        slug:
          'tokyo-olympics-jason-kenny-and-laura-kenny-have-to-settle-for-silver-as-records-tumble',
        url:
          'https://www.thetimes.co.uk/article/tokyo-olympics-jason-kenny-and-laura-kenny-have-to-settle-for-silver-as-records-tumble-lfjbwnpw2',
        summary105: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'It was a night of silver linings for Jason and Laura Kenny after the power couple of British Cycling were'
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
                    'It was a night of silver linings for Jason and Laura Kenny after the power couple of British Cycling were stunned by'
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
                    'It was a night of silver linings for Jason and Laura Kenny after the power couple of British Cycling were stunned by super-fast rivals during the'
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
                    'It was a night of silver linings for Jason and Laura Kenny after the power couple of British Cycling were stunned by super-fast rivals during the defences of'
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
                    'It was a night of silver linings for Jason and Laura Kenny after the power couple of British Cycling were stunned by super-fast rivals during the defences of their Olympic'
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
                    'It was a night of silver linings for Jason and Laura Kenny after the power couple of British Cycling were stunned by super-fast rivals during the defences of their Olympic titles. They took second place in the sprint and team'
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
          posterImage: {
            crop169: {
              url:
                'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fc2046bdc-f46e-11eb-9beb-a8c8694a90e3.jpg?crop=1278%2C719%2C0%2C0'
            },
            crop32: {
              url:
                'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fc2046bdc-f46e-11eb-9beb-a8c8694a90e3.jpg?crop=1078%2C719%2C100%2C0'
            },
            id: 'f874d69b-bd32-4734-b1f0-37f9cd36dec9',
            title: ''
          }
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
                      value: 'Ed Gorman, George Sandeman'
                    }
                  }
                ]
              }
            ],
            image: null
          }
        ],
        hasVideo: true,
        headline:
          'Team GB: Keely Hodgkinson wins 800m silver, breaking Kelly Holmes’s record',
        id: 'd84e14e2-f41e-11eb-a2a3-afea84050239',
        label: 'Olympics',
        publicationName: 'TIMES',
        publishedTime: '2021-08-03T13:50:00.000Z',
        updatedTime: '2021-08-03T16:07:58.000Z',
        section: 'sport',
        shortIdentifier: 'vxc7d03f8',
        shortHeadline:
          'Keely Hodgkinson wins 800m silver, breaking Kelly Holmes’s record',
        slug:
          'tokyo-olympics-britain-steal-gold-from-new-zealand-in-49er-class-race-before-giles-scott-triumphs-in-finn-class',
        url:
          'https://www.thetimes.co.uk/article/tokyo-olympics-britain-steal-gold-from-new-zealand-in-49er-class-race-before-giles-scott-triumphs-in-finn-class-vxc7d03f8',
        summary105: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'text',
                attributes: {
                  value:
                    'Great Britain celebrated double Olympic gold in sailing this morning, while Keely Hodgkinson broke Dame'
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
                    'Great Britain celebrated double Olympic gold in sailing this morning, while Keely Hodgkinson broke Dame Kelly Holmes’s'
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
                    'Great Britain celebrated double Olympic gold in sailing this morning, while Keely Hodgkinson broke Dame Kelly Holmes’s national record to clinch'
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
                    'Great Britain celebrated double Olympic gold in sailing this morning, while Keely Hodgkinson broke Dame Kelly Holmes’s national record to clinch silver in the'
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
                    'Great Britain celebrated double Olympic gold in sailing this morning, while Keely Hodgkinson broke Dame Kelly Holmes’s national record to clinch silver in the 800m, making the'
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
                    'Great Britain celebrated double Olympic gold in sailing this morning, while Keely Hodgkinson broke Dame Kelly Holmes’s national record to clinch silver in the 800m, making the 11th day of the Games one of the nation’s most'
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
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F45c33d56-20f7-11ea-9a1b-70ae6678484b.jpg?crop=1493%2C840%2C4%2C152'
          },
          crop32: {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F45c33d56-20f7-11ea-9a1b-70ae6678484b.jpg?crop=1500%2C1000%2C0%2C0'
          },
          id: '7781b9f1-6623-4700-9618-d012e2a40028',
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
                      value: 'Jane Edwardes and Fiona Mountford'
                    }
                  }
                ]
              }
            ],
            image: null
          }
        ],
        hasVideo: false,
        headline: 'Theatre, also showing',
        id: '7ddc2df0-20d0-11ea-81b4-b78674dd3224',
        label: 'CHRISTMAS THEATRE',
        publicationName: 'SUNDAYTIMES',
        publishedTime: '2019-12-22T00:01:00.000Z',
        updatedTime: '2019-12-22T18:04:30.000Z',
        section: 'culture',
        shortIdentifier: 'pldxw3prv',
        shortHeadline: 'Theatre, also showing',
        slug: 'theatre-also-showing',
        url:
          'https://www.thetimes.co.uk/article/theatre-also-showing-pldxw3prv',
        summary105: [
          {
            name: 'paragraph',
            children: [
              {
                name: 'bold',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Guys and Dolls'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'italic',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Crucible, Sheffield'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value: '★★★★'
                },
                children: []
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value:
                    'The Crucible has a history of staging great musicals, and while'
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
                name: 'bold',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Guys and Dolls'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'italic',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Crucible, Sheffield'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value: '★★★★'
                },
                children: []
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value:
                    'The Crucible has a history of staging great musicals, and while Frank Loesser’s classic'
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
                name: 'bold',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Guys and Dolls'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'italic',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Crucible, Sheffield'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value: '★★★★'
                },
                children: []
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value:
                    'The Crucible has a history of staging great musicals, and while Frank Loesser’s classic isn’t as radical as'
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
                name: 'bold',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Guys and Dolls'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'italic',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Crucible, Sheffield'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value: '★★★★'
                },
                children: []
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value:
                    'The Crucible has a history of staging great musicals, and while Frank Loesser’s classic isn’t as radical as some of its'
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
                name: 'bold',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Guys and Dolls'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'italic',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Crucible, Sheffield'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value: '★★★★'
                },
                children: []
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value:
                    'The Crucible has a history of staging great musicals, and while Frank Loesser’s classic isn’t as radical as some of its previous shows, it'
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
                name: 'bold',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Guys and Dolls'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'italic',
                children: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'Crucible, Sheffield'
                    },
                    children: []
                  }
                ]
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value: '★★★★'
                },
                children: []
              },
              {
                name: 'break',
                children: []
              },
              {
                name: 'text',
                attributes: {
                  value:
                    'The Crucible has a history of staging great musicals, and while Frank Loesser’s classic isn’t as radical as some of its previous shows, it still hits the spot. Broadway’s lowlife of'
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

describe('formatRelatedArticles', () => {
  it('formats', () => expect(formatRelatedArticles(sample)).toMatchSnapshot());
});
