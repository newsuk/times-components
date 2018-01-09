/* eslint-env jest */
import test from "../shared";
import Link, { TextLink } from "../../link";

describe("Link tests on Web", () => {
  test(Link, TextLink, "p");
});
