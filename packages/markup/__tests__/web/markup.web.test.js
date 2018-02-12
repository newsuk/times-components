import runTests from "../shared";
import { renderTree, renderTrees } from "../../markup.web";

describe("Markup Web", runTests(renderTree, renderTrees, "p", "div"));
