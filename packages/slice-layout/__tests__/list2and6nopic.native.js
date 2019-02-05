import TestRenderer from "react-test-renderer";
import "./serializers.native";
import shared from "./list2and6nopic.base";

export default () => shared(TestRenderer.create);
