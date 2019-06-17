import get from "lodash.get";

export default item =>
  get(item, "leadAsset.title", null) ||
  get(item, "leadAsset.caption", "") ||
  "";
