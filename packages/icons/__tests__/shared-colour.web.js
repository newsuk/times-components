import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  justChildren,
  minimaliseTransform,
  print,
  replaceTransform
} from "@times-components/jest-serializer";
import { replaceLongKeys } from "@times-components/test-utils";
import shared from "./shared-colour.base";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      replaceTransform({
        svg: justChildren
      }),
      minimaliseTransform((value, key) => key !== "fill" && key !== "stroke"),
      replaceLongKeys(new Set(["d", "viewBox", "points"]))
    )
  );

  shared(mount);
};
