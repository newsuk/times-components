import {
  addSerializers,
  enzymeTreeSerializer,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import "./mocks.web";
import shared from "./images.base";

jest.mock("@times-components/save-and-share-bar", () => "SaveAndShareBar");

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
    enzymeTreeSerializer(),
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

  shared();
};
