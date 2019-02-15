import React from "react";
import PullQuotes from "../src/pull-quote";
import testParagraph from "./fixtures/paragraph.json";

const content = ["Some content", testParagraph];
const caption = "A caption";
const twitter = "@twitter";

export default renderComponent => {
  it("different colours", () => {
    const output = renderComponent(
      <PullQuotes
        caption={caption}
        onTwitterLinkPress={() => null}
        quoteColour="#850029"
        renderedChildren={["Some content"]}
        twitter={twitter}
      >
        {content}
      </PullQuotes>
    );

    expect(output).toMatchSnapshot();
  });
};
