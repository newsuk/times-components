/* eslint-env jest */

import "react-native";
import React from "react";
import { shallow } from "enzyme";
import { AuthorHeadTracked } from "../author-head";

const data = require("../fixtures/profile.json");

const extra = { onTwitterLinkPress: () => {} };

it("tracks twitter link interactions", () => {
  const stream = jest.fn();
  const component = shallow(<AuthorHeadTracked {...data} {...extra} />, {
    context: { tracking: { analytics: stream } }
  });

  component
    .dive()
    .find("TwitterLink")
    .dive()
    .find("TextLink")
    .simulate("press");

  expect(stream).toHaveBeenCalledWith({
    action: "Pressed",
    component: "TwitterLink",
    attrs: {
      twitterHandle: "carolmidgley",
      url: "https://twitter.com/carolmidgley"
    }
  });
});
