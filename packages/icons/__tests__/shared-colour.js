import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  justChildren,
  minimaliseTransform,
  print,
  replacePropTransform,
  replaceTransform
} from "@times-components/jest-serializer";
import { hash } from "@times-components/test-utils";
import shared from "./shared-colour.base";
import longKeysSet from "./shared-long-keys-set";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      replaceTransform({
        svg: justChildren
      }),
      minimaliseTransform((value, key) => key !== "fill" && key !== "stroke"),
      replacePropTransform(
        (value, key) =>
          longKeysSet.has(key) ? hash(JSON.stringify(value)) : value
      )
    )
  );

  shared(mount);
};
