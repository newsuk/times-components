import { Text, View } from "react-native";
import runTests from "../shared";
import { renderTree, renderTrees } from "../../markup";

describe(
  "Markup Native tests on iOS",
  runTests(renderTree, renderTrees, Text, View)
);
