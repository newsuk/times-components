import TestRenderer from "react-test-renderer";
import { delay } from "@times-components/test-utils";
import renderParagraph from "./renderer";
import dropCapData from "./fixtures/drop-cap-showcase.json";

export default [
  {
    name: "paragraph with a drop cap in culture magazine",
    test: async () => {
      const testInstance = TestRenderer.create(
        renderParagraph(dropCapData, "culture")
      );
      await delay(0);
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "paragraph with a drop cap in style magazine",
    test: async () => {
      const testInstance = TestRenderer.create(
        renderParagraph(dropCapData, "style")
      );
      await delay(0);
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "paragraph with a drop cap in the sunday times magazine",
    test: async () => {
      const testInstance = TestRenderer.create(
        renderParagraph(dropCapData, "thesundaytimesmagazine")
      );
      await delay(0);
      expect(testInstance).toMatchSnapshot();
    }
  }
];
