import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import PullQuotes from "../pull-quote";

const content =
  "[The judgement was] taken because of the evidence available in the court today, that the grandmother is an appropriate carer for the child";
const caption = "Judge Sapnara";
const twitter = "@henrywinter";

module.exports = () => {
  it("Pull Quotes with a Caption", () => {
    const tree = renderer
      .create(<PullQuotes content={content} caption={caption} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it("Pull Quotes without a Caption", () => {
    const tree = renderer.create(<PullQuotes content={content} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it("Pull Quotes with a Caption and a Twitter", () => {
    const tree = renderer
      .create(
        <PullQuotes content={content} caption={caption} twitter={twitter} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it("Pull Quotes without a Caption and different colours", () => {
    const tree = renderer
      .create(
        <PullQuotes
          content={content}
          caption={caption}
          quoteColour="#850029"
          captionColour="#850029"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it("Pull Quotes with a twitter link", () => {
    const tree = renderer
      .create(
        <PullQuotes
          content={content}
          caption={caption}
          twitter="@JudgeSapnara"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
