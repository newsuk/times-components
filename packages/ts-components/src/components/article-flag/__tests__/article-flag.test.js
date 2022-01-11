import { AppRegistry } from "react-native-web";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  hoistStyleTransform,
  minimaliseTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import shared from "./shared-with-style.base";

jest.mock("@times-components/ts-components", () => ({
  __esModule: true,
  ...jest.requireActual("@times-components/ts-components"),
  LiveArticleFlag: "LiveArticleFlag"
}));

const styles = [
  "alignItems",
  "flexDirection",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "letterSpacing",
  "marginBottom",
  "marginRight"
];

const tests = [
  {
    name: "red article flag",
    test: () => {
      const testInstance = TestRenderer.create(
        <ArticleFlag color="red" title="Coloured Red" />
      );

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "multiple article flags",
    test: () => {
      const testInstance = TestRenderer.create(
        <ArticleFlags
          flags={[
            { expiryTime: "2030-03-13T12:00:00.000Z", type: "UPDATED" },
            { expiryTime: "2030-03-14T12:00:00.000Z", type: "EXCLUSIVE" },
            { expiryTime: "2030-03-14T12:00:00.000Z", type: "NEW" },
            { expiryTime: "2030-03-14T12:00:00.000Z", type: "SPONSORED" }
          ]}
          longRead
        />
      );

      expect(testInstance).toMatchSnapshot();
    }
  }
];

iterator(tests);

addSerializers(
  expect,
  compose(
    stylePrinter,
    minimalWebTransform,
    minimaliseTransform(
      (value, key) => key !== "style" && key !== "className"
    ),
      flattenStyleTransform,
      hoistStyleTransform,
      rnwTransform(AppRegistry, styles)
    )
  );

  shared();

