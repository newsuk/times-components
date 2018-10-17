// eslint-disable import/first
import TestRenderer from "react-test-renderer";
import paragraphData from "../fixtures/paragraph-showcase.json";
import dropCapData from "../fixtures/drop-cap-showcase.json";
import dropCapShortTextData from "../fixtures/drop-cap-short-text-showcase.json";
import renderParagraph from "./renderer";

export default () => {
  it("paragraph", () => {
    expect(
      TestRenderer.create(renderParagraph(paragraphData))
    ).toMatchSnapshot();
  });

  it("paragraph with a drop cap", () => {
    expect(TestRenderer.create(renderParagraph(dropCapData))).toMatchSnapshot();
  });

  it("paragraph with a short text and a drop cap", () => {
    expect(
      TestRenderer.create(renderParagraph(dropCapShortTextData))
    ).toMatchSnapshot();
  });
};
