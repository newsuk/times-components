import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import VideoLabel from "../../src/video-label";

const tests = [
  {
    name: "video label with a title",
    test: () => {
      const wrapper = mount(<VideoLabel color="#008347" title="swimming" />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "video label without a title shows VIDEO",
    test: () => {
      const wrapper = mount(<VideoLabel color="#008347" />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "video label with null title shows VIDEO",
    test: () => {
      const wrapper = mount(<VideoLabel color="#008347" title={null} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "video label with the black default colour",
    test: () => {
      const wrapper = mount(<VideoLabel />);

      expect(wrapper).toMatchSnapshot();
    }
  }
];

iterator(tests);
