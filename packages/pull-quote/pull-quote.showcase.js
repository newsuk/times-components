import "react-native";
import React from "react";
import PullQuotes from "./src/pull-quote";

const content =
  "[The judgement was] taken because of the evidence available in the court today, that the grandmother is an appropriate carer for the child";
const caption = "Judge Sapnara";
const twitter = "@henrywinter";

export default {
  name: "Primitives/Pull Quotes",
  children: [
    {
      type: "story",
      name: "Pull Quotes with a Caption",
      component: () => <PullQuotes caption={caption} content={content} />
    },
    {
      type: "story",
      name: "Pull Quotes without a Caption",
      component: () => <PullQuotes content={content} />
    },
    {
      type: "story",
      name: "Pull Quotes with a caption and Twitter",
      component: () => (
        <PullQuotes caption={caption} content={content} twitter={twitter} />
      )
    },
    {
      type: "story",
      name: "Pull Quotes without a Caption and different colours",
      component: () => (
        <PullQuotes
          caption={caption}
          captionColour="#850029"
          content={content}
          quoteColour="#850029"
        />
      )
    }
  ]
};
