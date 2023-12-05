import {
  addSerializers,
  compose,
  flattenStyleTransform,
  hoistStyleTransform,
  minimaliseTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import "./mocks";
import shared from "./images.base";

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
      hoistStyleTransform
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

    const nuk = {
      user: {
        isLoggedIn: true
      }
    };
    global.nuk = nuk;
  });

  afterEach(() => {
    global.Intl = realIntl;
    global.nuk = {};
  });

  shared();
};
