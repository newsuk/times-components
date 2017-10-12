/* eslint-env jest */
import { Text, View } from "react-native";
import runTests from "./test-helper";

jest.mock("WebView", () => "WebView");
describe("Markup Native", runTests(Text, View));
