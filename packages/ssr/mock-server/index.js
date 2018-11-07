const mockTpa = require("../../mock-tpa-server/dist/index");

mockTpa.start();

process.on("SIGTERM", () => {
  mockTpa.stop();
});