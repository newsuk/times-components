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
import shared from "./shared-colour.base";
import replaceLongKeys from "./utils";

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
      replaceLongKeys
    )
  );

  shared(mount);
};
