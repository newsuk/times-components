import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { shallow } from "enzyme";
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimaliseTransform((value, key) => key.startsWith("accessibility")),
      minimalNativeTransform,
      flattenStyleTransform
    )
  );

  shared(shallow);
};
