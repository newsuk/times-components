import TestRenderer from "react-test-renderer";
import "./shared-no-style.web";
import { sharedNoShortHeadline } from "./shared-std.base";

export default () => sharedNoShortHeadline(TestRenderer.create);
