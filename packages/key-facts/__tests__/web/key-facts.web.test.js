import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import renderKeyFacts from "../shared-render-key-facts";

addSerializers(expect, compose(print, minimalWebTransform, rnwTransform()));

// eslint-disable-next-line global-require
require("jest-styled-components");

renderKeyFacts(TestRenderer.create);
