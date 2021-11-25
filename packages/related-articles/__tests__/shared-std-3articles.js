import TestRenderer from "react-test-renderer";
import "./shared-no-style";
import { sharedThreeArticles } from "./shared-std.base";

export default () => sharedThreeArticles(TestRenderer.create);
