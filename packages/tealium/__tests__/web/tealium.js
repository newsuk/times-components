import createTealiumReport from "../../src";
import TealiumSendScheduler from "../../src/tealium-send-scheduler";

jest.mock("../../src/tealium-send-scheduler");

export default () => {
  describe("createTealiumReport", () => {
    const trackingOptions = {
      enabled: true,
      profile: "times.2017",
      env: "dev",
      account: "newsuk"
    };

    const callReporter = () =>
      createTealiumReport(
        trackingOptions,
        global.window,
        global.window.document
      );

    beforeEach(() => {
      TealiumSendScheduler.mockClear();
    });

    it("should create a Tealium reporter and return an analytics function", () => {
      const reporter = callReporter();

      expect(TealiumSendScheduler).toHaveBeenCalledTimes(1);
      expect(typeof reporter.analytics).toBe("function");
    });

    it("should call scheduler enqueue method", () => {
      const reporter = callReporter();
      const testData = "Test data";
      reporter.analytics(testData);

      const mockTealiumSendScheduler = TealiumSendScheduler.mock.instances[0];
      const mockTealiumSendSchedulerEnqueue = mockTealiumSendScheduler.enqueue;
      expect(mockTealiumSendSchedulerEnqueue).toHaveBeenCalledWith(testData);
    });
  });
};
