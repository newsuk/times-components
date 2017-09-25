/* eslint-env jest */
import { Text, View } from "react-native";
import runTests from "./test-helper";
import { renderTree, renderTrees } from "../markup";

describe("Markup Native", runTests(renderTree, renderTrees, Text, View));
