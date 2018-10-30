import TestRenderer from "react-test-renderer";
import "./shared-no-style.native";
import { sharedThreeArticlesWithLeadAssetOverride } from "./shared-oa2.base";

export default () =>
  sharedThreeArticlesWithLeadAssetOverride(TestRenderer.create);
