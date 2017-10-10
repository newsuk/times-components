// eslint-disable-next-line import/no-extraneous-dependencies
import Chance from "chance";

const chance = new Chance(88888);

const name = "Fiona Hamilton";
const jobTitle = "Legal Editor";
const image =
  "https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg";
const twitter = "jdoe";

const article = () => ({
  id: chance.guid(),
  title: chance.sentence(),
  label: "Science",
  publicationName: "TIMES",
  publishedTime: new Date("2015-03-19T23:06:34.000Z"),
  leadAsset: {
    title: "British trio stopped on the way to join Isis",
    crop: {
      url:
        "http://nu-cps-imgsrv-tnl-dev-webapp.elb.tnl-dev.ntch.co.uk/imageserver/image/90cfa89f4ebe003ab967e64b9c79c9afa520c273.jpg?crop=620%2C413%2C0%2C0"
    }
  },
  teaser: [
    {
      name: "p",
      children: [
        {
          name: "text",
          attributes: {
            value:
              "A tip-off from desperate parents led Turkish police to swoop on three British teenagers as they allegedly travelled to join Islamic State, "
          },
          children: []
        },
        {
          name: "em",
          children: [
            {
              name: "text",
              attributes: {
                value: "The Times"
              },
              children: []
            }
          ],
          attributes: {}
        },
        {
          name: "text",
          attributes: {
            value: " has learnt."
          },
          children: []
        }
      ],
      attributes: {}
    },
    {
      name: "p",
      children: [
        {
          name: "text",
          attributes: {
            value:
              "Two 17-year-old Muslim schoolboys from the Pakistani community in Brent, northwest London, and a 19-year-old man were intercepted in Istanbul at the weekend and swiftly returned to England. They were questioned by counterterrorism officials last night."
          },
          children: []
        }
      ],
      attributes: {}
    }
  ]
});

const biography = [
  {
    name: "text",
    attributes: {
      value: "Lorem "
    },
    children: []
  },
  {
    name: "b",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "ipsum"
        },
        children: []
      }
    ]
  },
  {
    name: "text",
    attributes: {
      value: " testbr "
    },
    children: []
  },
  {
    name: "br",
    attributes: {},
    children: []
  },
  {
    name: "text",
    attributes: {
      value: "More text "
    },
    children: []
  },
  {
    name: "i",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: " last "
        },
        children: []
      }
    ]
  }
];

const listOfArticles = n => {
  const list = [];
  for (let i = 0; i < n; i += 1) {
    list.push(article());
  }
  return list;
};

const articles = n => ({
  count: n,
  list: listOfArticles(n)
});

export default n => ({
  author: {
    name,
    jobTitle,
    biography,
    image,
    twitter,
    articles: articles(n),
    __typename: "Author"
  }
});
