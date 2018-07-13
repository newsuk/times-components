import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import { replaceLongKeys } from "@times-components/test-utils";
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimaliseTransform((value, key) => key === "style"),
      replaceLongKeys(new Set(["d", "viewBox", "points"]))
    )
  );

  shared(mount);
};
