import TestRenderer from "react-test-renderer";
import "./shared-no-style.native";
import { sharedNoShortHeadline } from "./shared-la2.base";

export default () => sharedNoShortHeadline(TestRenderer.create);
