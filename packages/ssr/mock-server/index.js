const mockTpa = require("@times-components/mock-tpa-server");

mockTpa.start();

process.on("SIGTERM", () => {
  mockTpa.stop();
});
