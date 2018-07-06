import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  justChildren,
  meltNative,
  minimalWebTransform,
  propsNoChildren,
  replaceTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { mount } from "enzyme";
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      replaceTransform({
        Ad: propsNoChildren,
        AdComposer: justChildren,
        Broadcast: justChildren,
        PullQuotes: propsNoChildren,
        ...meltNative
      }),
      flattenStyleTransform,
      hoistStyleTransform,
      minimalWebTransform,
      rnwTransform()
    )
  );

  shared(mount);
};
