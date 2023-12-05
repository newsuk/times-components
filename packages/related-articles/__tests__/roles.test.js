import { iterator } from "@times-components/test-utils";
import standardRoles from "../src/roles";

const tests = [
  {
    name: "standard roles for tracking",
    test() {
      expect(standardRoles).toMatchSnapshot();
    }
  }
];

iterator(tests);
