const { minimalRnw } = require("@times-components/jest-serializer");

expect.addSnapshotSerializer(minimalRnw());
