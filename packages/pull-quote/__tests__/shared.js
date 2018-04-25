import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import PullQuotes from "../src/pull-quote";

const content =
  "[The judgement was] taken because of the evidence available in the court today, that the grandmother is an appropriate carer for the child";
const caption = "Judge Sapnara";
const twitter = "@henrywinter";

export default () => {
  it("should render PullQuotes with a Caption", () => {
    const tree = renderer
      .create(<PullQuotes caption={caption} content={content} />)
      .toJSON();

    expect(tree).toMatchSnapshot("1. Renders default layout");
  });

  it("should render PullQuotes without a Caption", () => {
    const tree = renderer.create(<PullQuotes content={content} />).toJSON();

    expect(tree).toMatchSnapshot("2. Renders without a caption");
  });

  it("should render PullQuotes with a Twitter handle", () => {
    const tree = renderer
      .create(
        <PullQuotes caption={caption} content={content} twitter={twitter} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot("3. Renders with a twitter handle");
  });

  it("should render PullQuotes with different colours", () => {
    const tree = renderer
      .create(
        <PullQuotes
          caption={caption}
          captionColour="#850029"
          content={content}
          quoteColour="#850029"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot("4. Renders with different colours");
  });
};
