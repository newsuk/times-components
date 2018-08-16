/* eslint-disable react/prop-types */
import React from "react";
import PullQuotes from "./src/pull-quote";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const content =
  "[The judgement was] taken because of the evidence available in the court today, that the grandmother is an appropriate carer for the child";
const caption = "Judge Sapnara";
const twitter = "@henrywinter";

export default {
  name: "Primitives/Pull Quotes",
  children: [
    {
      type: "story",
      name: "Default",
      component: ({ color, text }, { decorateAction }) => (
        <PullQuotes
          caption={text("Caption: ", caption)}
          captionColour={color("Caption Colour: ", "#850029")}
          content={text("Content: ", content)}
          onTwitterLinkPress={preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          )}
          quoteColour={color("Quote Colour: ", "#850029")}
          twitter={text("Twitter Link: ", twitter)}
        />
      )
    }
  ]
};
