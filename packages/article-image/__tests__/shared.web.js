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
  replaceTransform,
  rnwTransform
} from "@times-components/jest-serializer";
import { mount } from "enzyme";
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      replaceTransform({
        ArticleImageWeb: justChildren,
        ArticleImage: justChildren,
        Caption: justChildren,
        TimesImage: propsNoChildren,
        ...meltNative
      }),
      minimalWebTransform,
      minimaliseTransform((value, key) => key === "style"),
      rnwTransform()
    )
  );

  shared(component => mount(component));
};
