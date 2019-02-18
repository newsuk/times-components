import TestRenderer from "react-test-renderer";
import "./serializers-with-style.native";
import shared from "./clac.base";

export default () => shared(TestRenderer.create);
