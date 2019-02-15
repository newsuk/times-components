import TestRenderer from "react-test-renderer";
import "./serializers.native";
import shared from "./sd1and4.base";

export default () => shared(TestRenderer.create);
