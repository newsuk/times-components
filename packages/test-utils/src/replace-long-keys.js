import { createHash } from "crypto";
import { replacePropTransform } from "@times-components/jest-serializer";

const hash = v =>
  createHash("md5")
    .update(v)
    .digest("hex");

// const longKeys = new Set(["d", "viewBox", "points"]);

const replaceLongKeys = longKeysSet => {
  if (longKeysSet instanceof Set) {
    return replacePropTransform(
      (value, key) =>
        longKeysSet.has(key) ? hash(JSON.stringify(value)) : value
    );
  }

  return null;
};

export default replaceLongKeys;
