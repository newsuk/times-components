import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import PullQuotes from "./src/pull-quote";

const content =
  "[The judgement was] taken because of the evidence available in the court today, that the grandmother is an appropriate carer for the child";
const caption = "Judge Sapnara";
const twitter = "@henrywinter";

storiesOf("Primitives/PullQuotes", module)
  .add("Pull Quotes with a Caption", () => (
    <PullQuotes caption={caption} content={content} />
  ))
  .add("Pull Quotes without a Caption", () => <PullQuotes content={content} />)
  .add("Pull Quotes with a caption and Twitter", () => (
    <PullQuotes caption={caption} content={content} twitter={twitter} />
  ))
  .add("Pull Quotes without a Caption and different colours", () => (
    <PullQuotes
      caption={caption}
      captionColour="#850029"
      content={content}
      quoteColour="#850029"
    />
  ));
