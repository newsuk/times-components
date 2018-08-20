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
import "./mocks.web";
import shared from "./images.base";

jest.mock("../src/article-comments/article-comments", () => "ArticleComments");

const styles = [
  "alignItems",
  "flex",
  "flexBasis",
  "fontWeight",
  "justifyContent",
  "lineHeight",
  "marginBottom",
  "marginTop",
  "paddingBottom",
  "paddingTop"
];

export default () => {
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
      rnwTransform(styles)
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  shared();
};
