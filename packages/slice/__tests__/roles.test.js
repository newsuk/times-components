import { iterator } from "@times-components/test-utils";
import {
  leadAndTwoRoles,
  opinionAndTwoRoles,
  standardRoles
} from "../src/slice";

const tests = [
  {
    name: "lead and two roles for tracking",
    test() {
      expect(leadAndTwoRoles).toMatchSnapshot();
    }
  },
  {
    name: "opinion and two roles for tracking",
    test() {
      expect(opinionAndTwoRoles).toMatchSnapshot();
    }
  },
  {
    name: "standard roles for tracking",
    test() {
      expect(standardRoles).toMatchSnapshot();
    }
  }
];

iterator(tests);
