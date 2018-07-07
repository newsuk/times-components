import React from "react";
import PullQuotes from "../src/pull-quote";

const content = "Some content";
const caption = "A caption";
const twitter = "@twitter";

export default renderComponent => {
  it("should render with different colours", () => {
    const output = renderComponent(
      <PullQuotes
        caption={caption}
        captionColour="#850029"
        content={content}
        quoteColour="#850029"
        twitter={twitter}
      />
    );

    expect(output).toMatchSnapshot("1. should render with different colours");
  });
};
