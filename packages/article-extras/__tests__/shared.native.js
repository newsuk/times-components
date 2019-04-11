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

  it("article extras", async done => {
    renderExtras({
      onReady: testInstance => {
        expect(testInstance).toMatchSnapshot();
        done();
      }
    });
  });

  it("article extras error state", async done => {
    renderExtras({
      error: () => "Error",
      onReady: testInstance => {
        expect(testInstance).toMatchSnapshot();
        done();
      }
    });
  });
};
