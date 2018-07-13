import { createHash } from "crypto";
import { replacePropTransform } from "@times-components/jest-serializer";

const hash = v =>
  createHash("md5")
    .update(v)
    .digest("hex");

const replaceLongKeys = longKeysSet =>
  replacePropTransform(
    (value, key) => (longKeysSet.has(key) ? hash(JSON.stringify(value)) : value)
  );

export default replaceLongKeys;
