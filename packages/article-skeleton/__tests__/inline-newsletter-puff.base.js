import React from "react";
import TestRenderer from "react-test-renderer";

import InlineNewsletterPuff from "../src/article-body/inline-newsletter-puff";

jest.mock("@times-components/image", () => "Image");

export default () => {
  describe("Inline Newsletter Puff", () => {
    const props = {
      label: "STRAIGHT IN YOUR INBOX",
      headline: "Politics. Explained.",
      copy:
        "Sign up to receive our brilliant Red Box newsletter, Matt Chorley`s poke at politics delivered every weekday morning at 8am."
    };

    it("renders the Signup view when the user is NOT subscribed to the newsletter", () => {
      const component = TestRenderer.create(
        <InlineNewsletterPuff {...props} isSubscribedToNewsletter={false} />
      );
      expect(component).toMatchSnapshot();
    });

    it("renders the subscribed view when the user is subscribed to the newsletter", () => {
      const component = TestRenderer.create(
        <InlineNewsletterPuff {...props} isSubscribedToNewsletter />
      );
      expect(component).toMatchSnapshot();
    });
  });
};
