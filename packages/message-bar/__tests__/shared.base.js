import { iterator } from "@times-components/test-utils";
import MessageBarTests from "./message-bar.base";
import MessageQueueTests from "./message-queue.base";

export default animate => {
  const tests = [...MessageBarTests(animate), ...MessageQueueTests(animate)];

  iterator(tests);
};
