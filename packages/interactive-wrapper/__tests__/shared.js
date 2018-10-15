import React from "react";
import TestRenderer from "react-test-renderer";
import InteractiveWrapper from "../src/interactive-wrapper";

export default () => {
  it("renders correctly", () => {
    const props = {
      attributes: {
        chaptercounter: "Chapter%20one",
        heading: "Xxxx%20xxxxxx%20xxxx%20xxxxx%20",
        standfirst:
          "Xxxx%20xxxxxx%20xxxx%20xxxxx%20xxxxxxxx%20xxxxxx%20xxxx%20xx%20xxxxxxxx"
      },
      element: "chapter-header",
      id: "a0534eee-682e-4955-8e1e-84b428ef1e79",
      source:
        "//components.timesdev.tools/lib2/times-chapter-header-1.0.0/chapter-header.html"
    };
    const testInstance = TestRenderer.create(<InteractiveWrapper {...props} />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
