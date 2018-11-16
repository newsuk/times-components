import React from "react";
import PullQuotes from "../src/pull-quote";

const content = "Some content";
const caption = "A caption";
const twitter = "@twitter";

export default renderComponent => {
  it("different colours", () => {
    const output = renderComponent(
      <PullQuotes
        caption={caption}
        captionColour="#850029"
        onTwitterLinkPress={() => null}
        quoteColour="#850029"
        twitter={twitter}
      >
        {content}
      </PullQuotes>
    );

    expect(output).toMatchSnapshot();
  });
};
