import TestRenderer from "react-test-renderer";
import "./shared-no-style.web";
import { sharedThreeArticles } from "./shared-oa2.base";

export default () => sharedThreeArticles(TestRenderer.create);
