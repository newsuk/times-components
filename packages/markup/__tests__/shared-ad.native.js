import {
  addSerializers,
  minimalNative
} from "@times-components/jest-serializer";
import TestRenderer from "react-test-renderer";
import shared from "./shared-ad.base";

jest.mock("@times-components/ad", () => "Ad");
jest.mock("@times-components/pull-quote", () => "PullQuote");

export default () => {
  addSerializers(expect, minimalNative);

  shared(TestRenderer.create);
};
