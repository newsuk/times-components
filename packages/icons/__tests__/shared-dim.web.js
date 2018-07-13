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
import { replaceLongKeys } from "@times-components/test-utils";
import shared from "./shared-dim.base";

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
      replaceLongKeys(new Set(["d", "viewBox", "points"]))
    )
  );

  shared(mount);
};
