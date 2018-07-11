import { isPaidOnly } from "../../src/video";

it("determine isPaidOnly status", () => {
  expect(isPaidOnly(true)).toBe(true);
  expect(isPaidOnly(false)).toBe(false);
  expect(isPaidOnly("true")).toBe(true);
  expect(isPaidOnly("false")).toBe(false);
  expect(isPaidOnly(1)).toBe(true);
  expect(isPaidOnly(0)).toBe(false);
  expect(isPaidOnly(undefined)).toBe(false);
  expect(isPaidOnly(null)).toBe(false);
});
