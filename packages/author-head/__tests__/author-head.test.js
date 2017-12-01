/* eslint-env jest */

import "react-native";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import AuthorHead from "../author-head";

const data = require("../fixtures/profile.json");

Enzyme.configure({ adapter: new React16Adapter() });

const extra = { onTwitterLinkPress: () => {} };

export default () => {
  it("renders", () => {
    const tree = renderer.create(<AuthorHead {...extra} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with data", () => {
    const tree = renderer.create(<AuthorHead {...data} {...extra} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders without profile picture", () => {
    const tree = renderer
      .create(<AuthorHead {...data} {...extra} uri="" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("tracks twitter link interactions", () => {
    const stream = jest.fn();
    const component = shallow(<AuthorHead {...data} {...extra} />, {
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
}
