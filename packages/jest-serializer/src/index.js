import { createSerializer } from "enzyme-to-json";
import minimalise from "./minimalise";
import { transformProps as rnwTransform, printer as rnwPrinter } from "./rnw";
import flattenStyleTransform from "./flatten-style";
import traverse from "./traverse";

const print = (serialize, accum, element) => serialize(element);

const flattenStyle = traverse(flattenStyleTransform, print);

const isEmptyObject = obj =>
  obj && typeof obj === "object" && Object.keys(obj).length === 0;

const minimalWebTransform = minimalise(
  value =>
    value === undefined || typeof value === "function" || isEmptyObject(value)
);

const minimalWeb = traverse(minimalWebTransform, print);

const minimalNativeTransform = minimalise(
  (value, key) =>
    value === undefined ||
    typeof value === "function" ||
    key === "className" ||
    isEmptyObject(value)
);

const minimalNative = traverse(minimalNativeTransform, print);

const rnw = includeStyleProps =>
  traverse(rnwTransform(includeStyleProps), rnwPrinter);

const compose = (printer, ...transformers) =>
  traverse(
    (accum, node) =>
      transformers.reduce(
        ({ accum: a, props: p }, transformer) =>
          transformer(a, { ...node, props: p }),
        {
          accum,
          props: node.props
        }
      ),
    printer
  );

const minimalRnw = includeStyleProps =>
  compose(rnwPrinter, minimalWebTransform, rnwTransform(includeStyleProps));

const addSerializers = (expect, ...serializers) => {
  serializers.forEach(serializer => expect.addSnapshotSerializer(serializer));
};

const enzymeRenderedSerializer = () => createSerializer({ mode: "deep" });

const enzymeRootSerializer = () => createSerializer({ mode: "shallow" });

const enzymeTreeSerializer = () => createSerializer();

export {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  enzymeRootSerializer,
  enzymeTreeSerializer,
  flattenStyle,
  flattenStyleTransform,
  minimalNative,
  minimalNativeTransform,
  minimalRnw,
  minimalWeb,
  minimalWebTransform,
  print,
  rnw,
  rnwPrinter,
  rnwTransform
};
