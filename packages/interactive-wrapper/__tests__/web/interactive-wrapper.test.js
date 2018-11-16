/* eslint-env browser */
import React from "react";
import {
  addSerializers,
  enzymeTreeSerializer
} from "@times-components/jest-serializer";
import { mount } from "enzyme";
import InteractiveWrapper from "../../src/interactive-wrapper";

addSerializers(expect, enzymeTreeSerializer());

it("renders correctly", () => {
  const props = {
    attributes: {
      chaptercounter: "Chapter%20one",
      heading: "A heading",
      standfirst: "A standfirst"
    },
    element: "chapter-header",
    id: "a0534eee-682e-4955-8e1e-84b428ef1e79",
    source:
      "//components.timesdev.tools/lib2/times-chapter-header-1.0.0/chapter-header.html"
  };
  const container = document.createElement("div");

  mount(<InteractiveWrapper {...props} />, { attachTo: container });
  expect(container).toMatchSnapshot();
});
