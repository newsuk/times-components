import {
  addSerializers,
  compose,
  print,
  minimaliseTransform
} from "@times-components/jest-serializer";
import "./mocks.native";
import shared from "./comments.base";

export default () => {
  addSerializers(
    expect,
    compose(print, minimaliseTransform((value, key) => key !== "style"))
  );

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
