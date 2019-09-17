import TestRenderer from "react-test-renderer";
import "./serializers.native";
import shared from "./vertical.base";

export default () => shared(TestRenderer.create);
