/* eslint-env jest */

import runTests from "./test-helper";
import Markup, { builder } from "../markup.web";

describe("Markup Web", runTests(Markup, builder));
