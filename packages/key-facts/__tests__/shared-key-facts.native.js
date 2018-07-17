import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalNativeTransform,
  print,
  propsNoChildren,
  replaceTransform
} from "@times-components/jest-serializer";
import renderKeyFacts from "./shared-render-key-facts";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key === "style"),
      replaceTransform({
        TextLink: propsNoChildren
      })
    )
  );

  renderKeyFacts(shallow);
};
