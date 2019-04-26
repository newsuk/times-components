import { iterator } from "@times-components/test-utils";
import MessageBarTests from "./message-bar.base";
import MessageQueueTests from "./message-queue.base";

export default () => {
  const tests = [...MessageBarTests(), ...MessageQueueTests()];

  iterator(tests);
};
