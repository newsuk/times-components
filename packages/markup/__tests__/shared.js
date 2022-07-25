import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { mount } from "enzyme";
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      stylePrinter,
      flattenStyleTransform,
      hoistStyleTransform,
      minimalWebTransform
    )
  );

  shared(mount);
};
