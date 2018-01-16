import { Text, View } from "react-native";
import runTests from "./test-helper";
import { renderTree, renderTrees } from "../markup";

jest.mock("WebView", () => "WebView");
describe("Markup Native", runTests(renderTree, renderTrees, Text, View));
