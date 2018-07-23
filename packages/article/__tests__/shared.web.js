import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  enzymeTreeSerializer,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import "./mocks.web";
import shared from "./shared.base";

const omitProps = new Set([
  "className",
  "data-testid",
  "responsiveLinkStyles",
  "style"
]);

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform((value, key) => omitProps.has(key))
    )
  );

  shared(TestRenderer.create);
};
