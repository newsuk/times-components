const { minimalNative } = require("@times-components/jest-serializer");

expect.addSnapshotSerializer(minimalNative);
