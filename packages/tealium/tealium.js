import TealiumSendScheduler from "./tealium-send-scheduler";

function createTealiumReporter(options, w, d) {
  const utagSendScheduler = new TealiumSendScheduler(options, w, d);

  return {
    analytics(e) {
      utagSendScheduler.enqueue(e);
    }
  };
}

export default createTealiumReporter;
