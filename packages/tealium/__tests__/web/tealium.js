import createTealiumReport from "../../src";

export default () => {
  describe("createTealiumReport", () => {
    const mockEnqueue = jest.fn();
    const mockScheduler = jest.fn(() => ({
      enqueue: mockEnqueue
    }));

    const callReporter = () => createTealiumReport(mockScheduler());

    it("should create a Tealium reporter and return an analytics function", () => {
      const reporter = callReporter();

      expect(typeof reporter.analytics).toBe("function");
    });

    it("should call scheduler enqueue method", () => {
      const reporter = callReporter();
      const testData = "Test data";
      reporter.analytics(testData);
      expect(mockEnqueue).toHaveBeenCalledWith(testData);
    });
  });
};
