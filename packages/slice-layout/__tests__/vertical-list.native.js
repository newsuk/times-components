import TestRenderer from "react-test-renderer";
import "./serializers.native";
import shared from "./vertical-list.base";

export default () => shared(TestRenderer.create);
