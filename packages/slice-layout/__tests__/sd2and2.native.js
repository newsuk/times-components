import TestRenderer from "react-test-renderer";
import "./serializers.native";
import shared from "./sd2and2.base";

export default () => shared(TestRenderer.create);
