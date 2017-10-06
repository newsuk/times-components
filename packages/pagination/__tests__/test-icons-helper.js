/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import { PreviousPageIcon, NextPageIcon } from "../pagination-icons";

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
};
