import TestRenderer from "react-test-renderer";
import "./shared-no-style.web";
import shared from "./shared-std.base";

export default () => shared(TestRenderer.create);
