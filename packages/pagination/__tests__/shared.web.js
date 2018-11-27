import { AppRegistry } from "react-native-web";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  justChildren,
  minimalWebTransform,
  print,
  replaceTransform,
  rnwTransform
} from "@times-components/jest-serializer";
import shared from "./shared.base";

export default withPageState => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalWebTransform,
      replaceTransform({
        ForwardRef: justChildren
      }),
      rnwTransform(AppRegistry)
    )
  );

  shared(withPageState, mount);
};
