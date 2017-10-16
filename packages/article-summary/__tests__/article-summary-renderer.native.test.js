/* eslint-env jest */
import { Text, View } from "react-native";
import runTests from "./test-helper";
import { renderer } from "../article-summary-renderer";

jest.mock("WebView", () => "WebView");
describe("Article Summary Renderer Native", runTests(renderer));
