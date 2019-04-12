import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import "./mocks";
import renderExtras from "./renderer";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform(
        (value, key) =>
          key === "style" ||
          key === "testID" ||
          key === "topics" ||
          key === "slice"
      )
    )
  );

  it("article extras error", async done => {
    renderExtras({
      error: () => ({ error: "Error" }),
      onReady: testInstance => {
        expect(testInstance).toMatchSnapshot();
        done();
      }
    });
  });
};
