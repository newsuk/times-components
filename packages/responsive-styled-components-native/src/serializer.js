import { Platform } from "react-native";

const { serializer } =
  process.env.NODE_ENV === "test"
    ? Platform.select({
        web: () => require("./serialise.web"),
        native: () => require("./serialise")
      })()
    : {};

if (serializer) {
  expect.addSnapshotSerializer(serializer);
}
