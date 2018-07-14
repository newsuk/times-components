import {
  leadAndTwoRoles,
  opinionAndTwoRoles,
  standardRoles
} from "../src/slice";

it("should return the lead and two roles for tracking", () => {
  expect(leadAndTwoRoles).toMatchSnapshot("1. Lead and two tracking roles");
});

it("should return the opinion and two roles for tracking", () => {
  expect(opinionAndTwoRoles).toMatchSnapshot(
    "2. Opinion and two tracking roles"
  );
});

it("should return the standard roles for tracking", () => {
  expect(standardRoles).toMatchSnapshot("3. Standard tracking roles");
});
