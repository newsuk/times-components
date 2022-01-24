const {
  addMatchImageSnapshotPlugin
} = require("cypress-image-snapshot/plugin");

const mockTpa = require("@times-components/mock-tpa-server");

const failed = require("cypress-failed-log/src/failed");

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'electron') {
      // fullPage screenshot size is 1000x2988
      launchOptions.preferences.width = 1000;
      launchOptions.preferences.height = 2988;
      launchOptions.preferences.frame = false;
      launchOptions.preferences.useContentSize = true;
    }
  });
  on("task", {
    startMockServerWith(mockData) {
      return mockTpa.startWithMockData(mockData);
    },
    stopMockServer() {
      return mockTpa.stop();
    },
    failed: failed()
  });

  return config;
};
