// eslint-disable import/first
import { Text, View } from "react-native";
import TestRenderer from "react-test-renderer";
import { delay } from "@times-components/test-utils";
import paragraphData from "./fixtures/paragraph-showcase.json";
import emptyParagraphData from "./fixtures/empty-paragraph.json";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import dropCapShortTextData from "./fixtures/drop-cap-short-text-showcase.json";
import renderParagraph from "./renderer";

export const callAllLayouts = async testInstance => {
  await delay(0);
  if (testInstance.root.findAllByType(View).length) {
    testInstance.root
      .findAllByType(View)[0]
      .findAllByType(Text)
      .forEach(word => {
        const { onLayout } = word.props;
        if (onLayout) {
          const width = word.props.children.length;
          onLayout({
            nativeEvent: {
              layout: {
                height: 18,
                width
              }
            }
          });
        }
      });

    testInstance.root.findAllByType(View)[2].props.onLayout({
      nativeEvent: {
        layout: {
          height: 100,
          width: 100
        }
      }
    });
  }
  await delay(0);
};

export default () => [
  {
    name: "paragraph",
    test: async () => {
      const testInstance = TestRenderer.create(renderParagraph(paragraphData));
      await delay(0);
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "empty paragraph",
    test: async () => {
      const testInstance = TestRenderer.create(
        renderParagraph(emptyParagraphData)
      );
      await delay(0);
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "paragraph with a drop cap",
    test: async () => {
      const testInstance = TestRenderer.create(renderParagraph(dropCapData));
      await callAllLayouts(testInstance);
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "paragraph with a short text and a drop cap",
    test: async () => {
      const testInstance = TestRenderer.create(
        renderParagraph(dropCapShortTextData)
      );
      await callAllLayouts(testInstance);
      expect(testInstance).toMatchSnapshot();
    }
  }
];
