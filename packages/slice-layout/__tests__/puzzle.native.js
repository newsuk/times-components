import TestRenderer from "react-test-renderer";
import "./serializers.native";
import shared from "./puzzle.base";

export default () => shared(TestRenderer.create);
