// eslint-disable import/first
import TestRenderer from "react-test-renderer";
import { delay } from "@times-components/test-utils";
import paragraphData from "./fixtures/paragraph-showcase.json";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import dropCapShortTextData from "./fixtures/drop-cap-short-text-showcase.json";
import renderParagraph from "./renderer";

export default () => {
  it("paragraph", async () => {
    const testInstance = TestRenderer.create(renderParagraph(paragraphData));
    await delay(0);
    expect(testInstance).toMatchSnapshot();
  });

  it("paragraph with a drop cap", async () => {
    const testInstance = TestRenderer.create(renderParagraph(dropCapData));
    await delay(0);
    expect(testInstance).toMatchSnapshot();
  });

  it("paragraph with a short text and a drop cap", async () => {
    const testInstance = TestRenderer.create(
      renderParagraph(dropCapShortTextData)
    );
    await delay(0);
    expect(testInstance).toMatchSnapshot();
  });
};
