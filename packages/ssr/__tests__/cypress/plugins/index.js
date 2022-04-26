const {
  addMatchImageSnapshotPlugin
} = require("cypress-image-snapshot/plugin");

const mockTpa = require("@times-components/mock-tpa-server");

const failed = require("cypress-failed-log/src/failed");

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
  on("task", {
    startMockServerWith(mockData) {
      return mockTpa.startWithMockData(mockData);
    },
    stopMockServer() {
      return mockTpa.stop();
    },
    failed: failed()
  });

  on("task", {
    log(message) {
      // eslint-disable-next-line no-console
      console.log(message);

      return null;
    },
    table(message) {
      // eslint-disable-next-line no-console
      console.table(message);

      return null;
    }
  });

  return config;
};
