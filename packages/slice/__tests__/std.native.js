import TestRenderer from "react-test-renderer";
import "./serializers.native";
import shared from "./std.base";

export default () => shared(TestRenderer.create);
