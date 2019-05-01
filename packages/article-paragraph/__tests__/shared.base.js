// eslint-disable import/first
import TestRenderer from "react-test-renderer";
import paragraphData from "./fixtures/paragraph-showcase.json";
import emptyParagraphData from "./fixtures/empty-paragraph.json";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import dropCapShortTextData from "./fixtures/drop-cap-short-text-showcase.json";
import renderParagraph from "./renderer";

export default () => [
  {
    name: "paragraph",
    test: async () => {
      const testInstance = TestRenderer.create(renderParagraph(paragraphData));
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "empty paragraph",
    test: async () => {
      const testInstance = TestRenderer.create(
        renderParagraph(emptyParagraphData)
      );
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "paragraph with a drop cap",
    test: async () => {
      const testInstance = TestRenderer.create(renderParagraph(dropCapData));
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "paragraph with a short text and a drop cap",
    test: async () => {
      const testInstance = TestRenderer.create(
        renderParagraph(dropCapShortTextData)
      );
      expect(testInstance).toMatchSnapshot();
    }
  }
];
