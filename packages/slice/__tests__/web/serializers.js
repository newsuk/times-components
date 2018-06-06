const { rnw } = require("@times-components/jest-serializer");
const { createSerializer } = require("enzyme-to-json");

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
expect.addSnapshotSerializer(rnw());
