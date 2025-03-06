import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import { mount } from "enzyme";
import shared from "./shared-accessible.base";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalWebTransform
    )
  );

  shared(mount);
};
