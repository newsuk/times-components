const createTealiumReporter = utagSendScheduler => ({
  analytics: e => utagSendScheduler.enqueue(e)
});

export default createTealiumReporter;
export { default as TealiumSendScheduler } from "./tealium-send-scheduler";
