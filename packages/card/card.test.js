/* eslint-env jest */

import "react-native";
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import Card from "./card";

const props = {
  label: "Camilla Long",
  headline: "OK, so Putin’s not a lady, but he does have the wildest man‑PMT",
  date: "Sunday June 11 2017",
  publication: "The Sunday Times",
  text:
    "When I was the official celebrity sex correspondent on Style magazine, every so often I would have to address the abject failure of male...  ",
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12&resize=320"
  }
};

it("renders a horizontal snapshot by default", () => {
  const tree = renderer.create(<Card {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders a horizontal snapshot when width below breakpoint", () => {
  const wrapper = shallow(<Card {...props} />);
  wrapper.instance().handleLayout({ nativeEvent: { layout: { width: 320 } } });

  expect(wrapper).toMatchSnapshot();
});

it("renders a vertical snapshot when width above breakpoint", () => {
  const wrapper = shallow(<Card {...props} />);
  wrapper.instance().handleLayout({ nativeEvent: { layout: { width: 640 } } });

  expect(wrapper).toMatchSnapshot();
});

it("renders component horizontal by default", () => {
  const comp = new Card(...props);

  expect(comp.state.isHorizontal).toBeTruthy();
});

it("renders component vertical when width below breakpoint", done => {
  const comp = new Card(...props);

  comp.setState = ({ isHorizontal }) => {
    expect(isHorizontal).toBeFalsy();

    return done();
  };

  comp.handleLayout({ nativeEvent: { layout: { width: 320 } } });
});
