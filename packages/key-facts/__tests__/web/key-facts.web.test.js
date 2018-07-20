import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimalWebTransform,
  print,
  minimaliseTransform
} from "@times-components/jest-serializer";
import renderKeyFacts from "../shared-render-key-facts";

addSerializers(
  expect,
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform((value, key) => key === "style" || key === "className")
  )
);

renderKeyFacts(TestRenderer.create);
