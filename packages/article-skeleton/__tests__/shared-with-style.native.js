import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import "./mocks.native";
import { mockSetIsTablet as setIsTablet } from "@times-components/responsive";
import articleFixture from "../fixtures/full-article";
import shared, { renderArticle, fixtureArgs } from "./shared.base";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key !== "style"),
      flattenStyleTransform
    )
  );

  const tests = [
    {
      name: "an Article Skeleton with responsive items",
      test() {
        setIsTablet(true);

        const article = articleFixture({ ...fixtureArgs });
        const testInstance = TestRenderer.create(renderArticle(article));

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  shared(TestRenderer.create, tests);
};
