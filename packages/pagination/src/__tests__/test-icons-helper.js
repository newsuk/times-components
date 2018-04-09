import React from "react";
import { shallow } from "enzyme";
import { PreviousPageIcon, NextPageIcon } from "../pagination-icons";

export default () => {
  describe("Previous page icon", () => {
    it("renders out an svg and label", () => {
      const icon = shallow(<PreviousPageIcon />);
      expect(icon).toMatchSnapshot();
    });
  });

  describe("Next page icon", () => {
    it("renders out an svg and label", () => {
      const icon = shallow(<NextPageIcon />);
      expect(icon).toMatchSnapshot();
    });
  });
};
