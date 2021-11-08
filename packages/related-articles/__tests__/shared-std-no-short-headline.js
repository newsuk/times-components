import TestRenderer from "react-test-renderer";
import "./shared-no-style";
import { sharedNoShortHeadline } from "./shared-std.base";

export default () => sharedNoShortHeadline(TestRenderer.create);
