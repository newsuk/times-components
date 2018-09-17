import TestRenderer from "react-test-renderer";
import "./shared-no-style.native";
import { sharedHasVideo } from "./shared-std.base";

export default () => sharedHasVideo(TestRenderer.create);
