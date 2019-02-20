import TestRenderer from "react-test-renderer";
import "./serializers.native";
import shared from "./clac.base";

export default () => shared(TestRenderer.create);
