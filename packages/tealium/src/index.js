const createTealiumReporter = tealiumSendScheduler => ({
  analytics: e => tealiumSendScheduler.enqueue(e)
});

export default createTealiumReporter;
export { default as TealiumSendScheduler } from "./tealium-send-scheduler";
