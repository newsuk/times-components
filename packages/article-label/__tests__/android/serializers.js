const { flattenStyle } = require("@times-components/jest-serializer");

expect.addSnapshotSerializer(flattenStyle);
