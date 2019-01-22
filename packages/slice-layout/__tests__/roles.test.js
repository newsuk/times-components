import { iterator } from "@times-components/test-utils";
import {
  leadOneAndTwoRoles,
  opinionOneAndTwoRoles,
  standardRoles
} from "../src/slice-layout";

const tests = [
  {
    name: "lead and two roles for tracking",
    test() {
      expect(leadOneAndTwoRoles).toMatchSnapshot();
    }
  },
  {
    name: "opinion and two roles for tracking",
    test() {
      expect(opinionOneAndTwoRoles).toMatchSnapshot();
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
