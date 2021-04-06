import React from "react";
import { MockedProvider } from "@times-components/provider-test-tools";
import { getNewsletter } from "@times-components/provider-queries";

import AutoNewsletterPuff from "./auto-newsletter-puff";
import ViewCountWrapper from "./view-count-wrapper";

const setCookieConsent = value => {
  window.document.cookie = `nuk-consent-personalisation=${
    value ? 1 : ";max-age=0"
  }`;
};

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

let storage = {};

class MockStorage {
  getItem = key => {
    const value = storage[key] || null;
    return value;
  };

  setItem = (key, value) => {
    storage = { ...storage, [key]: value };
  };
}

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
    },

    {
      component: ({ boolean, select }) => {
        const mockStorage = new MockStorage();
        const trackingName = "counter";
        const show = boolean("show", true);
        const consent = boolean("Set Constent Cookie", true);

        setCookieConsent(consent);

        const height = select(
          "Content size above component",
          {
            "Half Viewport": "50vh",
            "Full Viewport": "100vh"
          },
          "50vh"
        );
        const contentStyle = {
          background: "linear-gradient(#f4f4f4, #f4f4f4 50%, #eee 50%, #eee)",
          backgroundSize: "100% 20px",
          border: "30px solid #f4f4f4",
          height
        };
        return (
          <>
            Current Count = {mockStorage.getItem("view-count")}
            <div style={contentStyle} />
            {show && (
              <ViewCountWrapper
                trackingName={trackingName}
                displayFunction={count => [1, 3, 5, 7, 9].includes(count)}
                storageProvider={mockStorage}
              >
                <div
                  style={{
                    background: "#aaa",
                    width: 200,
                    height: 200,
                    border: "solid 5px #555",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  The Puff
                </div>
              </ViewCountWrapper>
            )}
            <div style={contentStyle} />
          </>
        );
      },
      name: "View Count Wrapper in a scroller",
      platform: "web",
      type: "story"
    }
  ],
  name: "Primitives/Auto Newsletter Puff"
};
