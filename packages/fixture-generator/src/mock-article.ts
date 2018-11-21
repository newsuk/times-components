import {
  Article,
  PublicationName,
  Url,
  Slug,
  Flag,
  SectionName,
  TemplateType
} from "./types";
import keywords from "./resolvers/keywords";
import UUID from "./resolvers/UUID";
import getPublicationName from "./resolvers/publication-name";
import MockImage from "./resolvers/image";
import { MockList } from "apollo-server";
import getArticleSlice from "./resolvers/article-slice";

const articleContent = [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "As I follow Chris Reynolds Gordon down the first floor corridor of a £27 million house, nestled between the Colombian consulate and the Swedish ambassador’s residence, we pass an ornate room full of mattresses. He smiles and closes the door as we walk past. This is the habitat of a man who is making his fortune from hosting “elite” sex parties in one of London’s wealthiest postcodes, and the room was the venue of his latest sex party. He has not read Fifty Shades of Grey but, he says, “I’m living it.”"
        },
        children: []
      }
    ]
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "The “elite” have been chosen from those who, through his Heaven SX website and social media, apply for invitations to his parties. Most applicants, he claims, are discarded because of paunch and age, and only the best-looking get to pay around £100 for a ticket. They drink, chat and then, at midnight, the women get changed into lingerie. “It’s loads of girls, all giggling, putting on their stockings, hair flowing,” he explains. “Then they walk in, the guys go, ‘Wow,’ and the mood changes. They all start disappearing and, before you know it, there are 30 girls on a bed and designer gear everywhere. When I pull it off I can’t believe I created it.”"
        },
        children: []
      }
    ]
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "Reynolds Gordon, 30, has a light beard, wears a white T-shirt, jeans and no shoes, and while self-satisfaction oozes from him, it seems to mask a fragility. We are sitting at an elegant dining table in a crimson room that mixes old and new. Oil paintings in gold frames adorn the walls. There is a sofa with a tiger-skin throw draped over it. He speaks quickly in middle-class tones. “The people coming to the parties are probably people you work with,” he says. “You’d be shocked. Absolutely shocked. It’s teachers, doctors, lawyers, journalists.”"
        },
        children: []
      }
    ]
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "His parties cater largely to couples and single girls. There are different formats – three women to two men; all women; the masquerade ball. Everyone has to be under 35. The organisers like the women to make the first move and there is a “zero tolerance policy” if any one of them complains to security. Photography is banned unless it is a “Heaven Sinema” party, where you get a nice DVD. Some people, “especially celebrities”, wear masks. “We’ve had Grammy winners,” Reynolds Gordon boasts. “We had a model who was on the cover of Vogue. This is going on all over London. Sex is a drug.”"
        },
        children: []
      }
    ]
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "This building, 33 Portland Place, comes complete with stained-glass billiard room and hydraulic wall; Amy Winehouse shot the video for Rehab here. Reynolds Gordon makes a cup of tea and sits down on a green chaise longue that was used in filming The King’s Speech. He says he pays astronomical rent, and will have to move because the owner, his friend and convicted fraudster Edward “Fast Eddie” Davenport, got out of prison last year, to be faced with a £12 million confiscation order."
        },
        children: []
      }
    ]
  },
  {
    name: "ad",
    attributes: {},
    children: []
  }
];
class MockArticle {
  article: Article;

  constructor() {
    this.article = {
      hasVideo: false,
      commentsEnabled: false,
      isBookmarked: false,
      commercialTags: ["commercial tag"],
      id: UUID(),
      keywords: keywords(),
      publicationName: getPublicationName(),
      paywalledContent: articleContent,
      url: "/article/123" as Url,
      // slug: `british-trio-stopped-on-the-way-to-join-isis`,
      commentCount: 65,
      template: TemplateType.mainstandard,
      byline: [
        {
          name: "inline",
          attributes: {},
          children: [
            {
              name: "text",
              attributes: {
                value: "Rick Broadbent"
              },
              children: []
            }
          ]
        }
      ],
      flags: [Flag.EXCLUSIVE],
      label: "label",
      content: articleContent,
      headline: "test headline",
      publishedTime: new Date(0),
      section: SectionName.business,
      shortHeadline: "shortheadline",
      shortIdentifier: "37b27qd2s",
      standfirst: "standfirst",
      title: "title",
      // summary: [
      //   {
      //     name: "paragraph",
      //     attributes: {},
      //     children: [
      //       {
      //         name: "text",
      //         attributes: {
      //           value:
      //             "More than 200 motorists are still on the road after celebrating their 100th birthday as older people"
      //         },
      //         children: []
      //       }
      //     ]
      //   }
      // ],
      // topics: [
      //   {
      //     name: "Islington",
      //     slug: "islington"
      //   },
      //   {
      //     name: "Chelsea",
      //     slug: "chelsea"
      //   }
      // ]
    };
  }

  withImageLeadAsset() {
    this.article.leadAsset = new MockImage().create();
    return this;
  }

  withRelatedArticles(count = 3) {
    this.article.relatedArticleSlice = getArticleSlice(count);
    return this;
  }

  withSundayTimes() {
    this.article.publicationName = getPublicationName(
      PublicationName.SUNDAYTIMES
    );
    return this;
  }

  create() {
    return this.article;
  }
}

export default MockArticle;
