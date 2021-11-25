import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimalWebTransform,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform((value, key) => key === "style" || key === "className")
  )
);
