import TestRenderer from "react-test-renderer";
import "./shared-no-style.web";
import { sharedOneArticle } from "./shared-oa2.base";

export default () => sharedOneArticle(TestRenderer.create);
