const { rnw } = require("@times-components/jest-serializer");

expect.addSnapshotSerializer(rnw());
