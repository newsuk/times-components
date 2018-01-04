/* eslint-env jest */
import test from "../shared";
import Link, { TextLink } from "../../link.web.js";

describe("Link tests on Web", () => {
  test(Link, TextLink, "p");
});
