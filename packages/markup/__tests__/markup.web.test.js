/* eslint-env jest */

import { AdComposer } from "@times-components/ad";
import runTests from "./test-helper";
import { renderTree, renderTrees } from "../markup.web";

describe(
  "Markup Web",
  runTests(renderTree, renderTrees, "p", "div", AdComposer)
);
