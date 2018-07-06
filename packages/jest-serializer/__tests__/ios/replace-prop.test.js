import { addSerializers, enzymeRootSerializer, replaceProp } from "../../src";
import shared from "../shared.replace-prop";

describe("the replace prop serializer should", () => {
  describe("for native", () => {
    addSerializers(
      expect,
      enzymeRootSerializer(),
      replaceProp((value, key) => (key === "test1" ? "somethingElse" : value))
    );

    shared();
  });
});
