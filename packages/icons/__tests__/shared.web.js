import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared.base";
import replaceLongKeys from "./utils";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimaliseTransform((value, key) => key === "style"),
      replaceLongKeys
    )
  );

  shared(mount);
};
