/* eslint-env jest */

import runTests from "./test-helper";
import Markup, { builder } from "../markup";

describe("Markup Native", runTests(Markup, builder));
