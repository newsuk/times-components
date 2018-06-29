import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { shallow } from "enzyme";
import shared from "./shared-accessible.base";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimaliseTransform(
        (value, key) => !key.startsWith("accessibility") || key === "style"
      ),
      minimalNativeTransform
    )
  );

  shared(shallow);
};
