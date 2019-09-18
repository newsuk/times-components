import TestRenderer from "react-test-renderer";
import "./serializers.native";
import shared from "./list.base";

export default () => shared(TestRenderer.create);
