import React from "react";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import { PreviousPageIcon, NextPageIcon } from "../pagination-icons";

Enzyme.configure({ adapter: new React16Adapter() });

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
