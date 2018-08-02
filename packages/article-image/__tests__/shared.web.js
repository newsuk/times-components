import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
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
    enzymeRenderedSerializer(),
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
      minimaliseTransform(
        (value, key) => key === "style" || key === "className"
      ),
      rnwTransform()
    )
  );

  shared(component => mount(component));
};
