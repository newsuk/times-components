import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  print,
  propsNoChildren,
  replaceTransform
} from "@times-components/jest-serializer";
import shared from "./shared-dim.base";
import replaceLongKeys from "./utils";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      replaceTransform({
        svg: propsNoChildren
      }),
      minimaliseTransform((value, key) => key === "style" || key === "viewBox"),
      replaceLongKeys
    )
  );

  shared(mount);
};
