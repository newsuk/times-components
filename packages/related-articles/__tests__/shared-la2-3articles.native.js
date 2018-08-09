import TestRenderer from "react-test-renderer";
import "./shared-no-style.native";
import { sharedThreeArticles } from "./shared-la2.base";

export default () => sharedThreeArticles(TestRenderer.create);
