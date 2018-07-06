import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import shared from "./shared.base";

export default withPageState => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(print, minimalWebTransform, rnwTransform())
  );

  shared(withPageState, mount);
};
