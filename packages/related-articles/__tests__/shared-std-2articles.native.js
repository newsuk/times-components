import TestRenderer from "react-test-renderer";
import "./shared-no-style.native";
import { sharedTwoArticles } from "./shared-std.base";

export default () => sharedTwoArticles(TestRenderer.create);
