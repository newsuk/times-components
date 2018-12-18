import React from "react";
import TestRenderer from "react-test-renderer";
import { themeFactory } from "@times-components/styleguide";
import PullQuotes from "../src/pull-quote";

const content = "Some content";
const caption = "A caption";
const text = "Some extra text";

export default [
  {
    name: "pull quote in culture magazine",
    test: () => {
      const theme = themeFactory("culture", "magazinestandard");
      const testInstance = TestRenderer.create(
        <PullQuotes
          caption={caption}
          font={theme.pullQuoteFont}
          onTwitterLinkPress={() => null}
          text={text}
        >
          {content}
        </PullQuotes>
      );
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "pull quote in style magazine",
    test: async () => {
      const theme = themeFactory("style", "magazinestandard");
      const testInstance = TestRenderer.create(
        <PullQuotes
          caption={caption}
          font={theme.pullQuoteFont}
          onTwitterLinkPress={() => null}
          text={text}
        >
          {content}
        </PullQuotes>
      );
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "pull quote in the sunday times magazine",
    test: async () => {
      const theme = themeFactory("thesundaytimesmagazine", "magazinestandard");
      const testInstance = TestRenderer.create(
        <PullQuotes
          caption={caption}
          font={theme.pullQuoteFont}
          onTwitterLinkPress={() => null}
          text={text}
        >
          {content}
        </PullQuotes>
      );
      expect(testInstance).toMatchSnapshot();
    }
  }
];
