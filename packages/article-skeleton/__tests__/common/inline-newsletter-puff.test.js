import React from "react";
import { View } from "react-native";
import TestRenderer from "react-test-renderer";

import InlineNewsletterPuff from "../../src/article-body/inline-newsletter-puff";

jest.mock("@times-components/image", () => ({
    __esModule: true,
    Placeholder: () => <View>Mock</View>
}));

describe("Inline Newsletter Puff", () => {
  const props = {
    label: "STRAIGHT IN YOUR INBOX",
    headline: "Politics. Explained.",
    copy:
      "Sign up to receive our brilliant Red Box newsletter, Matt Chorley`s poke at politics delivered every weekday morning at 8am."
  };

  it("renders correctly", () => {
    const component = TestRenderer.create(<InlineNewsletterPuff {...props} />);
    expect(component).toMatchSnapshot();
  });
});
