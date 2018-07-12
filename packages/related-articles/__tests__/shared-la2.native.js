import TestRenderer from "react-test-renderer";
import "./shared-no-style.native";
import shared from "./shared-la2.base";

export default () => shared(TestRenderer.create);
