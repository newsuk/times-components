import React from "react";
import { iterator } from "@times-components/test-utils";
import PullQuotes from "../src/pull-quote";

const content = "Some content";
const caption = "A caption";
const twitter = "@twitter";

export default renderComponent => {
  const tests = [
    {
      name: "with a caption",
      test() {
        const output = renderComponent(
          <PullQuotes caption={caption} content={content} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "without a caption",
      test() {
        const output = renderComponent(<PullQuotes content={content} />);

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "with a twitter handle",
      test() {
        const output = renderComponent(
          <PullQuotes caption={caption} content={content} twitter={twitter} />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
