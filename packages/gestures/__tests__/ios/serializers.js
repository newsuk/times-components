const { createSerializer } = require("enzyme-to-json");

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
