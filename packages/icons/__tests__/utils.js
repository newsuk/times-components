import { createHash } from "crypto";
import { replacePropTransform } from "@times-components/jest-serializer";

const hash = v =>
  createHash("md5")
    .update(v)
    .digest("hex");

const longKeys = new Set(["d", "viewBox", "points"]);

export default replacePropTransform(
  (value, key) => (longKeys.has(key) ? hash(JSON.stringify(value)) : value)
);
