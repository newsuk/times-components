import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  justChildren,
  minimalWebTransform,
  minimaliseTransform,
  print,
  replaceTransform
} from "@times-components/jest-serializer";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform((value, key) => key === "style" || key === "className"),
    replaceTransform({
      ForwardRef: justChildren
    })
  )
);
