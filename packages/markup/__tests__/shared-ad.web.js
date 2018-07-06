import React from "react";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  justChildren,
  meltNative,
  propsNoChildren,
  replaceTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { AdComposer } from "@times-components/ad";
import { mount } from "enzyme";
import shared from "./shared-ad.base";

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
        ...meltNative
      }),
      rnwTransform()
    )
  );

  shared(component => mount(<AdComposer>{component}</AdComposer>));
};
