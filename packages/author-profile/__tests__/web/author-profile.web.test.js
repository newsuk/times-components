/* global context */
import React from "react";
import { shallow } from "enzyme";
import { AuthorProfileHead } from "../../src/author-profile-head";
import shared from "../shared";

describe("AuthorProfile tests on web", () => {
  shared();

  context("AuthorProfileHead web tests", () => {
    const headProps = {
      twitter: "testTwitter",
      isLoading: false
    };

    it("should not re-render when twitter is changed", () => {
      const wrapper = shallow(<AuthorProfileHead {...headProps} />);

      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({
        twitter: "newTestTwitter"
      });

      expect(wrapper).toMatchSnapshot();
    });

    it("should only re-render when isLoading is changed", () => {
      const wrapper = shallow(<AuthorProfileHead {...headProps} />);

      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({
        isLoading: true
      });

      expect(wrapper).toMatchSnapshot();
    });
  });
});
