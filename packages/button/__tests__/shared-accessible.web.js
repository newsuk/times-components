import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import { mount } from "enzyme";
import shared from "./shared-accessible.base";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(print, rnwTransform(), minimalWebTransform)
  );

  shared(mount);
};
