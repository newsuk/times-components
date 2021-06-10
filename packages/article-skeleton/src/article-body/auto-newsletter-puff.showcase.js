import React from "react";
import { MockedProvider } from "@times-components/provider-test-tools";
import { getNewsletter } from "@times-components/provider-queries";

import AutoNewsletterPuff from "./auto-newsletter-puff";

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
      // eslint-disable-next-line react/prop-types
      component: ({ text }) => (
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
              "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F728c3e68-5311-4533-809a-b313a6503789.jpg?resize=800"
            )}
          />
        </MockedProvider>
      ),

      name: "Auto Newsletter Puff",
      platform: "web",
      type: "story"
    }
  ],
  name: "Primitives/Auto Newsletter Puff"
};
