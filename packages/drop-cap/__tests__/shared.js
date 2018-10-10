import React from "react";
import TestRenderer from "react-test-renderer";
import "./mock-text-measure-module";
import DropCap from "../src/drop-cap";

export default () => {
  it("paragraph with single drop cap", () => {
    const testInstance = TestRenderer.create(
      <DropCap
        dropCap="I"
        text="n 1924 Harold Macmillan became MP for Stockton-on-Tees. Witnessing brutal poverty there between the wars, he said later that he had learnt “lessons which I have never forgotten. If, in some respects, they may have left too deep an impression on my mind, the gain was greater than the loss.” The gain was a lifelong conviction that the central aim of domestic policy must be to avoid the horror of mass unemployment. Forget ideological posturing; the job of a responsible Conservative government was to keep people in work."
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
