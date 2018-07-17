import TestRenderer from "react-test-renderer";
import "./shared-with-style.web";
import shared from "./shared-la2-with-style.base";

export default () => shared(TestRenderer.create);
