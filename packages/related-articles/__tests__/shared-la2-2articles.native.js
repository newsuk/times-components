import TestRenderer from "react-test-renderer";
import "./shared-no-style.native";
import { sharedTwoArticles } from "./shared-la2.base";

export default () => sharedTwoArticles(TestRenderer.create);
