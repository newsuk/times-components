/* eslint-disable sort-keys */
export default ({ imageUrl } = {}) => ({
  __typename: "LeadOneAndOneSlice",
  lead: {
    article: {
      id: "7c4883d4-1a88-11e9-944c-54b267eb465b",
      shortHeadline: "Prince Philip ‘could be prosecuted’ over car crash",
      headline: "Prince Philip ‘could be prosecuted’ over car crash",
      template: "mainstandard",
      publishedTime: "2019-01-18T12:00:00.000Z",
      updatedTime: "2019-01-18T12:52:41.000Z",
      label: "ROYALS",
      flags: ["NEW"],
      standfirst: null,
      leadAsset: {
        crop169: {
          url:
            imageUrl ||
            "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8c1333a8-1aa2-11e9-944c-54b267eb465b.jpg?crop=1556%2C875%2C189%2C119"
        },
        crop32: {
          url:
            imageUrl ||
            "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8c1333a8-1aa2-11e9-944c-54b267eb465b.jpg?crop=1556%2C1037%2C189%2C38"
        },
        crop45: {
          ratio: "4:5",
          url: "http://image.io/4by5"
        },
        id: "372bc095-34c4-47e4-8b1e-d352f5641ee5",
        title:
          "PREMIUM EXCLUSIVE - Prince Philip's overturned SUV after it crashed (Mega is representing the exclusive licensing and syndication rights to the images in question.)"
      },
      summary125: [
        {
          name: "paragraph",
          children: [
            {
              name: "text",
              attributes: {
                value: "The "
              },
              children: []
            },
            {
              name: "link",
              attributes: {
                href: "https://www.thetimes.co.uk/topic/prince-philip",
                type: "topic"
              },
              children: [
                {
                  name: "text",
                  attributes: {
                    value: "Duke of Edinburgh"
                  },
                  children: []
                }
              ]
            },
            {
              name: "text",
              attributes: {
                value:
                  " could be charged with driving without due care and attention after his car accident yesterday"
              },
              children: []
            }
          ]
        }
      ]
    }
  },
  support: {
    article: {
      id: "30acec50-1a77-11e9-abc2-c39e91e3ea05",
      shortHeadline: "GCHQ gives girls free cyber-classes to tackle gender gap",
      headline: "GCHQ gives girls free cyber-classes to tackle gender gap",
      template: "mainstandard",
      publishedTime: "2019-01-17T17:00:00.000Z",
      updatedTime: "2019-01-18T16:00:34.000Z",
      label: "CYBER CRIME",
      flags: ["UPDATED"],
      standfirst: null,
      leadAsset: {
        crop169: {
          url:
            imageUrl ||
            "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fde5b8008-1a5b-11e9-944c-54b267eb465b.jpg?crop=2000%2C1125%2C0%2C104"
        },
        crop32: {
          url:
            imageUrl ||
            "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fde5b8008-1a5b-11e9-944c-54b267eb465b.jpg?crop=2000%2C1333%2C0%2C0"
        },
        id: "3ab8acf9-ef69-4c06-df64-57521b07d79c",
        title: "GCHQ warns British political parties of Russian hacking threat"
      },
      summary125: [
        {
          name: "paragraph",
          children: [
            {
              name: "text",
              attributes: {
                value:
                  "GCHQ will give free cyber-classes to hundreds of girls in an attempt to boost diversity in the tech industry."
              },
              children: []
            }
          ]
        },
        {
          name: "paragraph",
          children: [
            {
              name: "text",
              attributes: {
                value: "The intelligence"
              },
              children: []
            }
          ]
        }
      ]
    }
  }
});
