import gql from "graphql-tag";

export default gql`
  query ArticleQuery($id: ID!) {
    article(id: $id) {
      id
      headline
      keywords
      publicationName
      publishedTime
      label
      standfirst
      flags
      byline
      content
      section
      url
      commentsEnabled
      commentCount
      leadAsset {
        ... on Video {
          brightcovePolicyKey
          brightcoveVideoId
          brightcoveAccountId
          type: __typename
          posterImage {
            ...imageProps
          }
          brightcoveAccountId
          brightcoveVideoId
          brightcovePolicyKey
        }
        ... on Image {
          type: __typename
          ...imageProps
        }
      }
      relatedArticleSlice {
        ... on StandardSlice {
          items {
            article {
              id
              headline
              section
              byline
              label
              publicationName
              publishedTime
              summary105: summary(maxCharCount: 105)
              summary125: summary(maxCharCount: 125)
              summary145: summary(maxCharCount: 145)
              summary160: summary(maxCharCount: 160)
              summary175: summary(maxCharCount: 175)
              summary225: summary(maxCharCount: 225)
              leadAsset {
                ... on Image {
                  id
                  title
                  crop169: crop(ratio: "16:9") {
                    url
                  }
                  crop32: crop(ratio: "3:2") {
                    url
                  }
                }
                ... on Video {
                  posterImage {
                    id
                    title
                    crop169: crop(ratio: "16:9") {
                      url
                    }
                    crop32: crop(ratio: "3:2") {
                      url
                    }
                  }
                }
              }
              url
            }
          }
        }
        ... on LeadOneAndTwoSlice {
          lead {
            article {
              id
              headline
              section
              byline
              label
              publicationName
              publishedTime
              summary105: summary(maxCharCount: 105)
              summary125: summary(maxCharCount: 125)
              summary145: summary(maxCharCount: 145)
              summary160: summary(maxCharCount: 160)
              summary175: summary(maxCharCount: 175)
              summary225: summary(maxCharCount: 225)
              leadAsset {
                ... on Image {
                  id
                  title
                  crop169: crop(ratio: "16:9") {
                    url
                  }
                  crop32: crop(ratio: "3:2") {
                    url
                  }
                }
                ... on Video {
                  posterImage {
                    id
                    title
                    crop169: crop(ratio: "16:9") {
                      url
                    }
                    crop32: crop(ratio: "3:2") {
                      url
                    }
                  }
                }
              }
              url
            }
          }
          support1 {
            article {
              id
              headline
              section
              byline
              label
              publicationName
              publishedTime
              summary105: summary(maxCharCount: 105)
              summary125: summary(maxCharCount: 125)
              summary145: summary(maxCharCount: 145)
              summary160: summary(maxCharCount: 160)
              summary175: summary(maxCharCount: 175)
              summary225: summary(maxCharCount: 225)
              leadAsset {
                ... on Image {
                  id
                  title
                  crop169: crop(ratio: "16:9") {
                    url
                  }
                  crop32: crop(ratio: "3:2") {
                    url
                  }
                }
                ... on Video {
                  posterImage {
                    id
                    title
                    crop169: crop(ratio: "16:9") {
                      url
                    }
                    crop32: crop(ratio: "3:2") {
                      url
                    }
                  }
                }
              }
              url
            }
          }
          support2 {
            article {
              id
              headline
              section
              byline
              label
              publicationName
              publishedTime
              summary105: summary(maxCharCount: 105)
              summary125: summary(maxCharCount: 125)
              summary145: summary(maxCharCount: 145)
              summary160: summary(maxCharCount: 160)
              summary175: summary(maxCharCount: 175)
              summary225: summary(maxCharCount: 225)
              leadAsset {
                ... on Image {
                  id
                  title
                  crop169: crop(ratio: "16:9") {
                    url
                  }
                  crop32: crop(ratio: "3:2") {
                    url
                  }
                }
                ... on Video {
                  posterImage {
                    id
                    title
                    crop169: crop(ratio: "16:9") {
                      url
                    }
                    crop32: crop(ratio: "3:2") {
                      url
                    }
                  }
                }
              }
              url
            }
          }
        }
        ... on OpinionOneAndTwoSlice {
          opinion {
            article {
              id
              headline
              section
              byline
              label
              publicationName
              publishedTime
              summary105: summary(maxCharCount: 105)
              summary125: summary(maxCharCount: 125)
              summary145: summary(maxCharCount: 145)
              summary160: summary(maxCharCount: 160)
              summary175: summary(maxCharCount: 175)
              summary225: summary(maxCharCount: 225)
              leadAsset {
                ... on Image {
                  id
                  title
                  crop169: crop(ratio: "16:9") {
                    url
                  }
                  crop32: crop(ratio: "3:2") {
                    url
                  }
                }
                ... on Video {
                  posterImage {
                    id
                    title
                    crop169: crop(ratio: "16:9") {
                      url
                    }
                    crop32: crop(ratio: "3:2") {
                      url
                    }
                  }
                }
              }
              url
            }
          }
          support1 {
            article {
              id
              headline
              section
              byline
              label
              publicationName
              publishedTime
              summary105: summary(maxCharCount: 105)
              summary125: summary(maxCharCount: 125)
              summary145: summary(maxCharCount: 145)
              summary160: summary(maxCharCount: 160)
              summary175: summary(maxCharCount: 175)
              summary225: summary(maxCharCount: 225)
              leadAsset {
                ... on Image {
                  id
                  title
                  crop169: crop(ratio: "16:9") {
                    url
                  }
                  crop32: crop(ratio: "3:2") {
                    url
                  }
                }
                ... on Video {
                  posterImage {
                    id
                    title
                    crop169: crop(ratio: "16:9") {
                      url
                    }
                    crop32: crop(ratio: "3:2") {
                      url
                    }
                  }
                }
              }
              url
            }
          }
          support2 {
            article {
              id
              headline
              section
              byline
              label
              publicationName
              publishedTime
              summary105: summary(maxCharCount: 105)
              summary125: summary(maxCharCount: 125)
              summary145: summary(maxCharCount: 145)
              summary160: summary(maxCharCount: 160)
              summary175: summary(maxCharCount: 175)
              summary225: summary(maxCharCount: 225)
              leadAsset {
                ... on Image {
                  id
                  title
                  crop169: crop(ratio: "16:9") {
                    url
                  }
                  crop32: crop(ratio: "3:2") {
                    url
                  }
                }
                ... on Video {
                  posterImage {
                    id
                    title
                    crop169: crop(ratio: "16:9") {
                      url
                    }
                    crop32: crop(ratio: "3:2") {
                      url
                    }
                  }
                }
              }
              url
            }
          }
        }
      }
      topics(maxCount: 5) {
        name
        slug
      }
    }
  }

  fragment imageProps on Image {
    id
    title
    credits
    caption
    crop(ratio: "16:9") {
      ratio
      url
    }
  }
`;
