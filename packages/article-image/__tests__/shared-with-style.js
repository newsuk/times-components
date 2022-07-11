import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  justChildren,
  meltNative,
  minimaliseTransform,
  minimalWebTransform,
  print,
  propsNoChildren,
  replaceTransform
} from "@times-components/jest-serializer";
import { mount } from "enzyme";
import shared from "./shared-with-style.base";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      replaceTransform({
        ArticleImage: justChildren,
        ArticleImageWeb: justChildren,
        Caption: justChildren,
        InlineImage: justChildren,
        InsetCaptionWeb: justChildren,
        "responsive-styles__component": justChildren,
        TimesImage: propsNoChildren,
        ...meltNative
      }),
      minimalWebTransform,
      minimaliseTransform((value, key) => key === "style")
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  shared(component => mount(component));
};
