import TestRenderer from "react-test-renderer";
import "./shared-no-style.web";
import { sharedTwoArticles } from "./shared-la2.base";

export default () => sharedTwoArticles(TestRenderer.create);
