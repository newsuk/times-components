const mockTpa = require("@times-components/mock-tpa-server");

module.exports = on => {
  on("task", {
    startMockServerWith(mockData) {
      return mockTpa.startWithMockData(mockData);
    },
    stopMockServer() {
      return mockTpa.stop();
    }
  });
};
