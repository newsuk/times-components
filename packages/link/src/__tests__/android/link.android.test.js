import { Text } from "react-native";
import test from "../shared";
import Link, { TextLink } from "../../link";

describe("Link test on android", () => {
  test(Link, TextLink, Text);
});
