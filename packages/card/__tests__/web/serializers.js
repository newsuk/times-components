import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  justChildren,
  minimalWebTransform,
  propsNoChildren,
  replaceTransform,
  stylePrinter
} from "@times-components/jest-serializer";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      replaceTransform({
        CardComponent: justChildren,
        CardContent: justChildren,
        Gradient: propsNoChildren,
        Loading: justChildren,
        TimesImage: propsNoChildren
      }),
      flattenStyleTransform,
      hoistStyleTransform,
      minimalWebTransform
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");
};
