import React from "react";
import { create } from "react-test-renderer";
import wait from "waait";

import { MockedProvider } from "@times-components/provider-test-tools";

import Button from "@times-components/button";
import {
  InlineNewsletterPuff,
  GET_NEWSLETTER,
  SUBSCRIBE_NEWSLETTER
} from "../src/article-body/inline-newsletter-puff";

const renderComponent = (
  mocks = [
    {
      request: {
        query: GET_NEWSLETTER,
        variables: {
          id: "a2l6E000000CdHzQAK"
        }
      },
      result: {
        data: {
          newsletter: {
            id: "a2l6E000000CdHzQAK",
            isSubscribed: false,
            __typename: "Newsletter"
          }
        }
      }
    }
  ]
) =>
  create(
    <MockedProvider mocks={mocks}>
      <InlineNewsletterPuff
        {...{
          newsletterId: "a2l6E000000CdHzQAK",
          label: "STRAIGHT IN YOUR INBOX",
          headline: "Politics. Explained.",
          copy:
            "Sign up to receive our brilliant Red Box newsletter, Matt Chorley`s poke at politics delivered every weekday morning at 8am.",
          imageUri:
            "https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/2aa9050e6c3d4de682f11a4802ebba96.jpg"
        }}
      />
    </MockedProvider>
  );

export default () => {
  describe("Inline Newsletter Puff", () => {
    it("renders placeholder when loading", () => {
      const component = renderComponent();
      expect(component).toMatchSnapshot();
    });

    it("renders signup state", async () => {
      const component = renderComponent();

      await wait(0);

      expect(component).toMatchSnapshot();
    });

    it("renders null when is already subscribed", async () => {
      const component = renderComponent([
        {
          request: {
            query: GET_NEWSLETTER,
            variables: {
              id: "a2l6E000000CdHzQAK"
            }
          },
          result: {
            data: {
              newsletter: {
                id: "a2l6E000000CdHzQAK",
                isSubscribed: true,
                __typename: "Newsletter"
              }
            }
          }
        }
      ]);

      await wait(0);

      expect(component).toMatchSnapshot();
    });

    it("renders puff when not already subscribed", async () => {
      const component = renderComponent();

      await wait(0);

      expect(component).toMatchSnapshot();
    });

    it("renders saving when the button is clicked", async () => {
      const component = renderComponent();

      await wait(0);

      component.root.findByType(Button).props.onPress();

      expect(component).toMatchSnapshot();
    });

    it("renders the success view ", async () => {
      const component = renderComponent([
        {
          request: {
            query: GET_NEWSLETTER,
            variables: {
              id: "a2l6E000000CdHzQAK"
            }
          },
          result: {
            data: {
              newsletter: {
                id: "a2l6E000000CdHzQAK",
                isSubscribed: false,
                __typename: "Newsletter"
              }
            }
          }
        },
        {
          request: {
            query: SUBSCRIBE_NEWSLETTER,
            variables: {
              id: "a2l6E000000CdHzQAK"
            }
          },
          result: {
            data: {
              subscribeNewsletter: {
                id: "a2l6E000000CdHzQAK",
                isSubscribed: true,
                __typename: "Newsletter"
              }
            }
          }
        }
      ]);

      await wait(0);

      component.root.findByType(Button).props.onPress();

      await wait(3);

      expect(component).toMatchSnapshot();
    });
  });
};
