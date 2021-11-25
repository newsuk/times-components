import TestRenderer from "react-test-renderer";
import "./shared-with-style.web";
import shared from "./shared-std-with-style.base";

export default () => shared(TestRenderer.create);
