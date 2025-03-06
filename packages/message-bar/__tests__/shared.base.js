import { iterator } from "@times-components/test-utils";
import MessageBarTests from "./message-bar.base";
import MessageManagerTests from "./message-manager.base";

export default () => {
  const tests = [...MessageBarTests(), ...MessageManagerTests()];

  iterator(tests);
};
