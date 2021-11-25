import TestRenderer from "react-test-renderer";
import "./shared-no-style";
import { sharedTwoArticles } from "./shared-std.base";

export default () => sharedTwoArticles(TestRenderer.create);
