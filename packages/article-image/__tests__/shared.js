import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  justChildren,
  minimaliseTransform,
  minimalWebTransform,
  print,
  propsNoChildren,
  replaceTransform
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
        ArticleImage: justChildren,
        ArticleImageWeb: justChildren,
        Caption: justChildren,
        TimesImage: propsNoChildren
      }),
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key === "className"
      )
    )
  );

  shared(component => mount(component));
};
