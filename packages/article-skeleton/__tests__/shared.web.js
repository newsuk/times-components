import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import "./mocks.web";
import shared from "./shared.base";

const omitProps = new Set([
  "article",
  "className",
  "data-testid",
  "responsiveLinkStyles",
  "style"
]);

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform((value, key) => omitProps.has(key))
    )
  );

  beforeEach(() => {
    const nuk = {
      user: {
        isLoggedIn: true
      }
    };
    global.nuk = nuk;
  });

  afterEach(() => {
    global.nuk = {};
  });

  shared(TestRenderer.create);
};
