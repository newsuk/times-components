import React from "react";
import PullQuotes from "../src/pull-quote";

const content = "Some content";
const caption = "A caption";
const twitter = "@twitter";

export default renderComponent => {
  it("should render with a caption", () => {
    const output = renderComponent(
      <PullQuotes caption={caption} content={content} />
    );

    expect(output).toMatchSnapshot("1. should render with a caption");
  });

  it("should render without a caption", () => {
    const output = renderComponent(<PullQuotes content={content} />);

    expect(output).toMatchSnapshot("2. should render without a caption");
  });

  it("should render with a twitter handle", () => {
    const output = renderComponent(
      <PullQuotes caption={caption} content={content} twitter={twitter} />
    );

    expect(output).toMatchSnapshot("3. should render with a twitter handle");
  });
};
