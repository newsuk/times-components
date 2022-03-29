import React from "react";
import PullQuotes from "../src/pull-quote";

const content = "Some content";
const caption = "A caption";
const twitter = "@twitter";

export default renderComponent => {
  it("different colours", () => {

    console.log('ADAM: before render component');

    const output = renderComponent(
      <PullQuotes
        caption={caption}
        onTwitterLinkPress={() => null}
        quoteColour="#850029"
        twitter={twitter}
      >
        {content}
      </PullQuotes>
    );

    console.log('ADAM: output', output);

    expect(output).toMatchSnapshot();
  });
};
