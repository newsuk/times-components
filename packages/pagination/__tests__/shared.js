import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared.base";

export default withPageState => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalWebTransform
    )
  );

  shared(withPageState, mount);
};
