import TestRenderer from "react-test-renderer";
import "./shared-no-style.native";
import { sharedNoArticles } from "./shared-oa2.base";

export default () => sharedNoArticles(TestRenderer.create);
