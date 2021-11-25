import TestRenderer from "react-test-renderer";
import "./shared-no-style.web";
import { sharedOneArticle } from "./shared-std.base";

export default () => sharedOneArticle(TestRenderer.create);
