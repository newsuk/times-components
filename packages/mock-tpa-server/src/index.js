/* eslint-disable no-console */

import { ApolloServer } from "apollo-server";
import { MockArticle }  from "../../fixture-generator/dist/index";
import wholeschema from "../../schema/schema.json" 
import { printSchema, buildClientSchema } from "graphql/utilities";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";


const serviceName = "Mock TPA server";

let server;

export function start() {
  return new Promise(resolve => {
    const __schema = wholeschema.data.__schema
    const schemaSDL = printSchema(buildClientSchema({__schema}));

    const schema = makeExecutableSchema({
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      typeDefs: schemaSDL
    });


   const article = new MockArticle().withSundayTimes().withImageLeadAsset().withRelatedArticles().fetch();
   console.log(article.relatedArticleSlice.items)

    addMockFunctionsToSchema({
      mocks: {
        Article: () => article,
        Media: () => ({__typename: "Image"}),
        Slug: () => "some-slug",
        ArticleSlice: () => ({
          __typename: "StandardSlice",
        }),
        Markup: () => [
          {
            "name": "paragraph",
            "attributes": {},
            "children": [
              {
                "name": "text",
                "attributes": {
                  "value": "As I follow Chris Reynolds Gordon down the first floor corridor of a £27 million house, nestled between the Colombian consulate and the Swedish ambassador’s residence, we pass an ornate room full of mattresses. He smiles and closes the door as we walk past. This is the habitat of a man who is making his fortune from hosting “elite” sex parties in one of London’s wealthiest postcodes, and the room was the venue of his latest sex party. He has not read Fifty Shades of Grey but, he says, “I’m living it.”"
                },
                "children": []
              }
            ]
          },
          {
            "name": "paragraph",
            "attributes": {},
            "children": [
              {
                "name": "text",
                "attributes": {
                  "value": "The “elite” have been chosen from those who, through his Heaven SX website and social media, apply for invitations to his parties. Most applicants, he claims, are discarded because of paunch and age, and only the best-looking get to pay around £100 for a ticket. They drink, chat and then, at midnight, the women get changed into lingerie. “It’s loads of girls, all giggling, putting on their stockings, hair flowing,” he explains. “Then they walk in, the guys go, ‘Wow,’ and the mood changes. They all start disappearing and, before you know it, there are 30 girls on a bed and designer gear everywhere. When I pull it off I can’t believe I created it.”"
                },
                "children": []
              }
            ]
          },
          {
            "name": "paragraph",
            "attributes": {},
            "children": [
              {
                "name": "text",
                "attributes": {
                  "value": "Reynolds Gordon, 30, has a light beard, wears a white T-shirt, jeans and no shoes, and while self-satisfaction oozes from him, it seems to mask a fragility. We are sitting at an elegant dining table in a crimson room that mixes old and new. Oil paintings in gold frames adorn the walls. There is a sofa with a tiger-skin throw draped over it. He speaks quickly in middle-class tones. “The people coming to the parties are probably people you work with,” he says. “You’d be shocked. Absolutely shocked. It’s teachers, doctors, lawyers, journalists.”"
                },
                "children": []
              }
            ]
          },
          {
            "name": "paragraph",
            "attributes": {},
            "children": [
              {
                "name": "text",
                "attributes": {
                  "value": "His parties cater largely to couples and single girls. There are different formats – three women to two men; all women; the masquerade ball. Everyone has to be under 35. The organisers like the women to make the first move and there is a “zero tolerance policy” if any one of them complains to security. Photography is banned unless it is a “Heaven Sinema” party, where you get a nice DVD. Some people, “especially celebrities”, wear masks. “We’ve had Grammy winners,” Reynolds Gordon boasts. “We had a model who was on the cover of Vogue. This is going on all over London. Sex is a drug.”"
                },
                "children": []
              }
            ]
          },
          {
            "name": "paragraph",
            "attributes": {},
            "children": [
              {
                "name": "text",
                "attributes": {
                  "value": "This building, 33 Portland Place, comes complete with stained-glass billiard room and hydraulic wall; Amy Winehouse shot the video for Rehab here. Reynolds Gordon makes a cup of tea and sits down on a green chaise longue that was used in filming The King’s Speech. He says he pays astronomical rent, and will have to move because the owner, his friend and convicted fraudster Edward “Fast Eddie” Davenport, got out of prison last year, to be faced with a £12 million confiscation order."
                },
                "children": []
              }
            ]
          },
          {
            "name": "ad",
            "attributes": {},
            "children": []
          }
        ]
      },
      preserveResolvers: true,
      schema
    });

      server = new ApolloServer({ schema });

      server.listen().then(({ url }) => {
        console.log(`🚀  ${serviceName} ready at ${url}`);
        resolve(true)
      });
   })
}

export function stop() {
  if (server) {
    server.stop();
    console.log(`${serviceName} closed`);
  }
}

