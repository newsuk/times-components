import React from "react";
import AutoNewsletterPuff from "./auto-newsletter-puff";
import { text } from "@storybook/addon-knobs";
import { MockedProvider } from "@times-components/provider-test-tools";
import { getNewsletter } from "@times-components/provider-queries";
const mocks = [
  {
    request: {
      query: getNewsletter,
      variables: {
        code: "TNL-101"
      }
    },
    result: {
      data: {
        newsletter: {
          id: "a2l6E000000CdHzQAK",
          isSubscribed: false,
          title: "RED BOX",
          __typename: "Newsletter"
        }
      }
    }
  }
];

export default {
  children: [
    {
      component: () => (
        <MockedProvider mocks={mocks}>
          <AutoNewsletterPuff
            analyticsStream={() => {}}
            code={text("code", "TNL-101")}
            headline={text("headline", "Best of Times")}
            copy={text(
              "copy",
              "We’ll send you our top stories, across all sections, straight to your inbox. Simple as that."
            )}
            imageUri={text(
              "imageUri",
              "https%3A%2F%2Fwww.thetimes.co.uk%2Fimageserver%2Fimage%2Fmethode%252Ftimes%252Fprod%252Fweb%252Fbin%252F728c3e68-5311-4533-809a-b313a6503789.jpg%3Fresize%3D800"
            )}
          />
        </MockedProvider>
      ),

      name: "Default",
      platform: "web",
      type: "story"
    }
  ],
  name: "Primitives/AutoNewsletterPuff"
};

// const newsletterData = [
//   {
//     section: "news",
//     payload: {
//       code: "TNL-101",
//       headline: "Best of Times",
//       copy:
//         "We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.",
//       imageUri:
//         "https%3A%2F%2Fwww.thetimes.co.uk%2Fimageserver%2Fimage%2Fmethode%252Ftimes%252Fprod%252Fweb%252Fbin%252F728c3e68-5311-4533-809a-b313a6503789.jpg%3Fresize%3D800"
//     }
//   },
//   {
//     section: "comment",
//     payload: {
//       code: "TNL-104",
//       headline: "Comment and Opinion",
//       copy:
//         "Wit and wisdom from our award-winning stable of columnists and guest writers, including Caitlin Moran, Matthew Parris, Rod Liddle and Dominic Lawson.",
//       imageUri:
//         "https%3A%2F%2Fwww.thetimes.co.uk%2Fimageserver%2Fimage%2Fmethode%252Ftimes%252Fprod%252Fweb%252Fbin%252Fb49851bd-b182-43fc-bd5d-1816bcda19fe.jpg%3Fresize%3D800"
//     }
//   },
//   {
//     section: "business",
//     payload: {
//       code: "TNL-103",
//       headline: "Business briefing",
//       copy:
//         "In-depth analysis and comment on the latest financial and economic news from our award-winning Business teams.",
//       imageUri:
//         "https%3A%2F%2Fwww.thetimes.co.uk%2Fimageserver%2Fimage%2Fmethode%252Ftimes%252Fprod%252Fweb%252Fbin%252F306637af-2b6f-48fc-b264-d661b2067818.jpg%3Fresize%3D800"
//     }
//   },
//   {
//     section: "sport",
//     payload: {
//       code: "TNL-112",
//       headline: "Sport",
//       copy:
//         "Every Friday morning, Elgan Alderman takes you through the best of sport from the past week and looks ahead to the weekend, featuring exclusive interviews, agenda-setting comment and razor-sharp analysis.",
//       imageUri:
//         "https%3A%2F%2Fwww.thetimes.co.uk%2Fimageserver%2Fimage%2Fmethode%252Ftimes%252Fprod%252Fweb%252Fbin%252F8920eef8-e084-47db-a1bf-00be3d72080e.jpg%3Fresize%3D800"
//     }
//   },
//   {
//     section: "scotland",
//     payload: {
//       code: "TNL-134",
//       headline: "Editor’s Choice – Scotland",
//       copy:
//         "The biggest stories of the week from The Times and The Sunday Times Scotland, delivered directly to you every Saturday morning.",
//       imageUri:
//         "https%3A%2F%2Fwww.thetimes.co.uk%2Fimageserver%2Fimage%2Fmethode%252Ftimes%252Fprod%252Fweb%252Fbin%252F5777acf9-363f-4aa3-8176-1ea09cdae7d6.jpg%3Fresize%3D800"
//     }
//   }
// ];
