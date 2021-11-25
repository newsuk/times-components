import TestRenderer from "react-test-renderer";
import "./shared-no-style.web";
import { sharedNoArticles } from "./shared-std.base";

export default () => sharedNoArticles(TestRenderer.create);
