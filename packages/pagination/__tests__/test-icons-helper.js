/* eslint-env jest */
import React from 'react';
import {Text} from 'react-native';
import { shallow } from "enzyme";

import tests from "./test-helper";
import {PreviousPageIcon, NextPageIcon} from "../pagination-icons";

export default () => {
  describe("Previous page icon", () => {
  it("renders out an svg and the passed in label", () => {
    const icon = shallow(<PreviousPageIcon label="a label" />);
    expect(icon).toMatchSnapshot();
  });
});

  describe("Next page icon", () => {
    it("renders out an svg and the passed in label", () => {
      const icon = shallow(<NextPageIcon label="a label" />);
      expect(icon).toMatchSnapshot();
    });
  });
}
