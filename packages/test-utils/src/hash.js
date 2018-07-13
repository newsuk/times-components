import { createHash } from "crypto";

const hash = value =>
  createHash("md5")
    .update(value)
    .digest("hex");

export default hash;
