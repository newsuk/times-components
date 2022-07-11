import { mount } from "enzyme";
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
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key === "className"
      ),
      replaceTransform({
        CardComponent: justChildren,
        CardContent: justChildren,
        Gradient: propsNoChildren,
        Loading: justChildren,
        TimesImage: propsNoChildren,
        ...meltNative
      })
    )
  );

  shared(mount);
};
